/**
 * Offline PDF Memory & Document Store
 * Uses browser IndexedDB to persist binary PDF Blobs, parsing metadata,
 * and extracted bilingual questions across browser sessions.
 */

import { ParsedPdfExamResult } from './pdf-question-parser';
import { QuestionBankItem } from './types';
import { deduplicateQuestionsWithinChapter } from './question-bank';

export interface StoredPdfRecord {
  id: string;                      // Unique ID, e.g. "pdf_1742081234_abc"
  fileName: string;                // Original filename, e.g. "9th_math_ch1.pdf"
  fileSize: number;                // Size in bytes
  fileSizeFormatted: string;       // e.g. "348 KB" or "1.2 MB"
  fileType: string;                // MIME type, typically "application/pdf"
  uploadedAt: string;              // ISO timestamp
  lastAccessedAt: string;          // ISO timestamp
  pageCount: number;               // Number of PDF pages
  pdfBlob: Blob;                   // Binary PDF data for offline preview and download

  // Extracted Curriculum & Metadata
  directory: string;               // e.g. "9th Class"
  grade: string;                   // "9th", "10th", "11th", "12th"
  subject: string;                 // "Mathematics", "Physics", etc.
  unit: string;                    // "Unit 1: Matrices & Determinants"
  status: 'completed' | 'partial' | 'failed';

  // Parsed Items
  mcqs: ParsedPdfExamResult['mcqs'];
  shortQuestions: ParsedPdfExamResult['shortQuestions'];
  longQuestions: ParsedPdfExamResult['longQuestions'];
  allExtractedQuestions: QuestionBankItem[];
}

export interface StorageUsageSummary {
  count: number;
  totalBytes: number;
  formattedSize: string;
  totalQuestions: number;
}

const DB_NAME = 'ExamGenPdfMemoryDB';
const DB_VERSION = 1;
const STORE_NAME = 'pdf_documents';

/**
 * Format bytes to human-readable size
 */
export function formatByteSize(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i] || 'MB'}`;
}

/**
 * Open or upgrade the IndexedDB database
 */
export function openPdfMemoryDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('fileName', 'fileName', { unique: false });
        store.createIndex('directory', 'directory', { unique: false });
        store.createIndex('grade', 'grade', { unique: false });
        store.createIndex('uploadedAt', 'uploadedAt', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save an uploaded PDF and its parsed questions into IndexedDB with specified class directory
 */
export async function savePdfToMemory(
  file: File | Blob,
  fileName: string,
  parsed: ParsedPdfExamResult,
  targetDirectory?: { grade?: string; subject?: string }
): Promise<StoredPdfRecord> {
  const db = await openPdfMemoryDB();

  // Generate deterministic ID or fallback
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const recordId = `pdf_${sanitizedName}_${file.size}`;
  const now = new Date().toISOString();

  // Convert File to pure Blob if necessary
  const pdfBlob = file instanceof Blob ? file : new Blob([file], { type: 'application/pdf' });

  // Resolve directory / class & subject
  const grade = targetDirectory?.grade || parsed.grade || '9th';
  const subject = targetDirectory?.subject || parsed.subject || 'Mathematics';
  const directory = `${grade}/${subject}`;

  // Tag questions with provenance and directory info
  const rawQuestions: QuestionBankItem[] = (parsed.allExtractedQuestions || []).map((q, idx) => ({
    ...q,
    id: q.id || `mem_${sanitizedName}_${idx + 1}`,
    classTag: grade,
    grade: grade,
    subject: subject,
    sourcePdf: fileName,
    boardTag: `${grade} ${subject} · ${fileName}`
  }));

  // Filter out repeated questions strictly within the same chapter
  const taggedQuestions = deduplicateQuestionsWithinChapter(rawQuestions);

  const record: StoredPdfRecord = {
    id: recordId,
    fileName,
    fileSize: file.size,
    fileSizeFormatted: formatByteSize(file.size),
    fileType: file.type || 'application/pdf',
    uploadedAt: now,
    lastAccessedAt: now,
    pageCount: parsed.pageCount || 1,
    pdfBlob,
    directory,
    grade,
    subject,
    unit: parsed.unit || 'General Paper',
    status: 'completed',
    mcqs: parsed.mcqs || [],
    shortQuestions: parsed.shortQuestions || [],
    longQuestions: parsed.longQuestions || [],
    allExtractedQuestions: taggedQuestions
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const putReq = store.put(record);

    putReq.onsuccess = () => resolve(record);
    putReq.onerror = () => reject(putReq.error);
  });
}

/**
 * Move or re-assign a stored PDF to another class directory and/or subject sub-directory
 */
export async function moveStoredPdfToDirectory(
  id: string,
  newGrade: string,
  newSubject?: string
): Promise<StoredPdfRecord | undefined> {
  const db = await openPdfMemoryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(id);

    getReq.onsuccess = () => {
      const record = getReq.result as StoredPdfRecord | undefined;
      if (!record) {
        resolve(undefined);
        return;
      }

      record.grade = newGrade;
      if (newSubject) {
        record.subject = newSubject;
      }
      record.directory = `${newGrade}/${record.subject}`;
      record.allExtractedQuestions = (record.allExtractedQuestions || []).map((q) => ({
        ...q,
        classTag: newGrade,
        grade: newGrade,
        subject: record.subject,
        boardTag: `${newGrade} ${record.subject} · ${record.fileName}`
      }));

      const putReq = store.put(record);
      putReq.onsuccess = () => resolve(record);
      putReq.onerror = () => reject(putReq.error);
    };

    getReq.onerror = () => reject(getReq.error);
  });
}

/**
 * Retrieve all stored PDFs from IndexedDB
 */
export async function getAllStoredPdfs(): Promise<StoredPdfRecord[]> {
  try {
    const db = await openPdfMemoryDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const records = (req.result || []) as StoredPdfRecord[];
        // Sort newest first
        records.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        resolve(records);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not read from IndexedDB, returning empty memory list:', err);
    return [];
  }
}

/**
 * Retrieve a single stored PDF by ID
 */
export async function getStoredPdf(id: string): Promise<StoredPdfRecord | undefined> {
  const db = await openPdfMemoryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(id);

    req.onsuccess = () => resolve(req.result as StoredPdfRecord | undefined);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Delete a specific stored PDF from IndexedDB
 */
export async function deleteStoredPdf(id: string): Promise<void> {
  const db = await openPdfMemoryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Clear all stored PDFs from IndexedDB
 */
export async function clearAllStoredPdfs(): Promise<void> {
  const db = await openPdfMemoryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.clear();

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Calculate total memory usage summary
 */
export async function getStorageUsageSummary(): Promise<StorageUsageSummary> {
  const list = await getAllStoredPdfs();
  const totalBytes = list.reduce((sum, item) => sum + (item.fileSize || 0), 0);
  const totalQuestions = list.reduce((sum, item) => sum + (item.allExtractedQuestions?.length || 0), 0);

  return {
    count: list.length,
    totalBytes,
    formattedSize: formatByteSize(totalBytes),
    totalQuestions
  };
}
