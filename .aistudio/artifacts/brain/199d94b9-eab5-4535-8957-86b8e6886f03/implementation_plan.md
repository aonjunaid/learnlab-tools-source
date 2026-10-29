# Implementation Plan: Offline PDF Memory & Document Library

A comprehensive plan to implement persistent, offline-first **PDF Memory** using browser **IndexedDB**, allowing users to upload, store, preview, re-parse, and manage test papers and their extracted bilingual questions permanently across sessions.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product decisions were confirmed during Phase 1 interactive clarification:
> - **Storage Scope**: Store the full binary PDF documents (`Blob`), parsing metadata/status, and all extracted questions (MCQs, Short, and Long questions with bilingual text).
> - **Storage Engine**: Browser **IndexedDB** for zero-latency, private, offline client-side persistence without external server dependencies or data privacy concerns.
> - **UI Placement**: A dedicated **"Uploaded Library"** tab inside the PDF Extractor view (`ChapterPdfExtractorView`), featuring storage metrics, document cards, PDF preview, and one-click question re-synchronization.

---

## 1. Overview & Core Concept

### What It Does
When teachers or students upload chapter test PDFs (e.g. ZahidNotes or custom academy tests), the application currently parses them in memory, but loses them upon page refresh. The **PDF Memory Feature** establishes a persistent local document store in the browser using IndexedDB:
1. **Preserves Original Files**: Retains the actual PDF file binary data as an IndexedDB Blob so it can be previewed or downloaded anytime.
2. **Preserves Extracted Question Bank State**: Saves all parsed MCQs, Short Questions, Long Questions, and chapter tags.
3. **Auto-Restoration**: Automatically re-hydrates the uploaded documents and question bank on app load.
4. **Dedicated Library Management**: Provides a high-efficiency dashboard to inspect stored documents, re-extract questions, preview files in an embedded viewer, and manage local storage.

### Target Audience & Persona
- **Educators & School Administrators**: Teachers building annual examination series who upload multiple chapter tests once and want them persistently available across weeks without repeatedly dragging and dropping files.
- **Students & Tutors**: Learners practicing past papers who need their uploaded tests cataloged and ready for 1-click mock exam generation.

### Key Value
- **Zero Data Loss**: Refreshes, tab switches, and browser restarts preserve all uploaded test documents and extracted questions.
- **Complete Privacy**: All PDF files and questions remain 100% on the user's device (offline-first).
- **Instant Access**: No re-parsing delay; previously extracted questions are loaded in milliseconds.

---

## 2. User Experience & Visual Design

Following the **Education & Interactive Sandbox Guidelines** (`references/6_education_simulations.md`) and the **Anti-Slop Design Constitution**:

### Visual Identity & Theme
- **60% Dominant Canvas**: Soft neutral background (`bg-neutral-50 dark:bg-neutral-950`) providing clean focus.
- **30% Structural Panels**: Card containers with `1px` subtle hairline borders (`border-neutral-200 dark:border-neutral-800`), nested radius discipline ($r_{\text{inner}} = r_{\text{outer}} - \text{padding}$), and single-elevation depth.
- **10% Accent Budget**: Emerald (`#059669`) and Teal (`#0D9488`) for active tabs, memory status indicators, and primary generation actions.
- **Zero-Pill Discipline**: Metadata displayed as quiet, unboxed text separated by typographic middots (`·`), reserving styled buttons strictly for active interactive controls.

### Key User Flows

#### Flow 1: Upload & Automatic Memory Persistence
```
[User Drops / Selects PDF]
       │
       ▼
[pdfjs-dist Page-by-Page Parser] ──► [Extracts MCQs, Short, Long Qs]
       │
       ▼
[IndexedDB `pdf_documents` Store] ──► [Saves PDF Blob + Parsed Questions + Timestamps]
       │
       ▼
[UI Updates Instantly] ──► [Toast: "Saved to PDF Memory (14 Qs ready)"] + [Question Bank Updated]
```

#### Flow 2: Library Exploration & Re-Use
- User opens the **PDF Extractor** view and clicks the **"Uploaded Library"** tab.
- Sees the **Memory Storage Strip**:
  - `3 Saved Documents · 42 Questions Retained · 3.4 MB Local Storage · [Clear All]`
- Each saved PDF card displays:
  - File name, upload timestamp (`e.g. 28 Oct 2026`), file size, page count.
  - Grade, Subject, and Chapter badges.
  - Question distribution: `10 MCQs · 10 Short · 2 Long`.
  - Actions:
    - **Preview PDF**: Opens native modal PDF viewer rendering the stored Blob.
    - **Review Qs**: Opens itemized modal to review extracted questions and answers.
    - **Load Exam**: Instantly creates a 40-mark bilingual exam paper.
    - **Re-Sync**: Refreshes questions in the Question Bank if they were previously filtered or cleared.
    - **Delete**: Safely removes the document from IndexedDB with prompt.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Storage Layer (IndexedDB vs. LocalStorage vs. Backend)
- **Chosen Approach**: Browser **IndexedDB** with native `Blob` storage.
- **Why**: `localStorage` has a strict ~5MB quota and cannot handle binary PDF files without base64 bloat. IndexedDB easily handles 50MB–500MB+ of binary PDFs with asynchronous, non-blocking I/O.
- **Alternatives Considered**:
  - *LocalStorage with Text-Only*: Would forfeit the original PDF file, preventing users from previewing or downloading their saved tests.
  - *Cloud/Backend Database*: Breaches local-first privacy, requires server hosting/auth, and increases latency.

### Decision 2: Deduplication & Re-Sync Strategy
- **Chosen Approach**: Use composite keys / hash IDs based on filename and size (`${fileName}_${fileSize}`). When a file is uploaded, existing records are updated rather than duplicated. Question IDs are prefixed with `user_pdf_${hash}` so re-syncing into the Question Bank replaces existing items cleanly without duplicate clutter.

### Decision 3: PDF Binary Lifetime & Blob URLs
- **Chosen Approach**: Store the file as a raw `Blob` in IndexedDB. When previewing, create a dynamic object URL via `URL.createObjectURL(blob)` and revoke it when the preview modal closes to prevent memory leaks.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                      PDF Test Archive & Extractor                      │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
┌─────────────────────────────────┐         ┌─────────────────────────────────┐
│     ZahidNotes Board Archives   │         │       Uploaded PDF Library      │
│  • 26+ Standard Chapter Tests   │         │  • Persistent Stored Documents  │
│  • 9th–12th Syllabi             │         │  • Storage Metrics & Health     │
└─────────────────────────────────┘         └────────────────┬────────────────┘
                                                             │
                                                             ▼
                                            ┌─────────────────────────────────┐
                                            │      pdf-memory-store.ts        │
                                            │   (IndexedDB Wrapper Module)    │
                                            └────────────────┬────────────────┘
                                                             │
                  ┌──────────────────────────────────────────┴──────────────────────────────────────────┐
                  ▼                                                                                     ▼
   ┌─────────────────────────────┐                                                       ┌─────────────────────────────┐
   │     Binary PDF Storage      │                                                       │   Question Bank Metadata    │
   │  • Raw PDF Blob             │                                                       │  • Parsed MCQs (bilingual)  │
   │  • Instant Blob Preview     │                                                       │  • Short Questions (Roman)  │
   │  • Offline Export           │                                                       │  • Long Questions & Keys    │
   └─────────────────────────────┘                                                       └─────────────────────────────┘
```

### Data Model & Schema (`src/logic/exam-generator/pdf-memory-store.ts`)

```typescript
export interface StoredPdfRecord {
  id: string;                      // e.g. "pdf_1742081234_math9th"
  fileName: string;                // "9th_math_ch1.pdf"
  fileSize: number;                // 348210 bytes
  fileSizeFormatted: string;       // "340 KB"
  fileType: string;                // "application/pdf"
  uploadedAt: string;              // ISO timestamp
  lastAccessedAt: string;          // ISO timestamp
  pageCount: number;               // Extracted page count
  pdfBlob: Blob;                   // Complete original binary PDF
  
  // Extracted Curriculum & Questions
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
```

### Implementation Modules & Planned Edits

1. **`src/logic/exam-generator/pdf-memory-store.ts`** (New File):
   - Initializes database `ExamGenPdfMemoryDB` (version 1) with object store `stored_pdfs`.
   - Functions:
     - `initPdfMemoryDB(): Promise<IDBDatabase>`
     - `savePdfToMemory(file: File, parsed: ParsedPdfExamResult): Promise<StoredPdfRecord>`
     - `getAllStoredPdfs(): Promise<StoredPdfRecord[]>`
     - `deleteStoredPdf(id: string): Promise<void>`
     - `clearPdfMemory(): Promise<void>`
     - `getStorageUsage(): Promise<{ count: number, totalBytes: number, formattedSize: string }>`

2. **`src/components/exam-generator/ChapterPdfExtractorView.tsx`**:
   - Add segmented view mode toggle: **"Board Archives"** vs. **"My PDF Library (N)"**.
   - Auto-load stored records from IndexedDB on initial component mount and synchronize questions into `onAddQuestionsToBank`.
   - Update file upload handler (`processLocalPdfFile`) to automatically invoke `savePdfToMemory`.
   - Build **Uploaded Library Panel**:
     - Storage summary metrics (Documents, Questions, Storage footprint).
     - Responsive grid of stored document cards with preview, review, load exam, and delete actions.
     - PDF Preview modal rendering dynamic Blob URL for offline-stored PDFs.
     - Empty state with drag-and-drop prompt when no files are saved yet.

3. **`tests/run-tests.ts`**:
   - Add unit tests verifying `pdf-memory-store` data transformations, sizing formatters, and question item integrity.

---

## 5. Verification & Quality Gates

- **Unit Tests**: Run `npm test` to verify all 786+ existing tests pass, plus new tests for memory store logic.
- **Lint & Types**: Run `lint_applet` (`tsc --noEmit`) to verify zero type mismatches or missing imports.
- **Compilation**: Run `compile_applet` to confirm successful Vite bundling.
- **Interactive Verification**:
  - Upload a local PDF $\rightarrow$ verify it is persisted in IndexedDB.
  - Refresh the browser $\rightarrow$ verify the PDF and its questions remain accessible in "My PDF Library" and in the Question Bank.
  - Click "Preview PDF" $\rightarrow$ verify the stored Blob loads seamlessly in the modal viewer.
  - Click "Delete" $\rightarrow$ verify document and its questions are cleaned up from storage.
