/**
 * Universal Client-Side File Conversion & Formatting Engine.
 * 100% in-browser processing with zero server uploads, complete privacy,
 * and support across Images, Data/Tables, Documents/Text, Code, and Audio.
 */

export type FileCategory = 'image' | 'data' | 'document' | 'audio' | 'code';

export interface FormatDefinition {
  id: string;
  name: string;
  extension: string;
  category: FileCategory;
  mimeType: string;
  isText: boolean;
  isBinary: boolean;
  description: string;
}

export const SUPPORTED_FORMATS: FormatDefinition[] = [
  // Images
  { id: 'png', name: 'PNG Image', extension: '.png', category: 'image', mimeType: 'image/png', isText: false, isBinary: true, description: 'Lossless raster image with transparency' },
  { id: 'jpeg', name: 'JPEG / JPG Image', extension: '.jpg', category: 'image', mimeType: 'image/jpeg', isText: false, isBinary: true, description: 'Compressed raster image with configurable quality' },
  { id: 'webp', name: 'WebP Image', extension: '.webp', category: 'image', mimeType: 'image/webp', isText: false, isBinary: true, description: 'Modern high-compression web image format' },
  { id: 'svg', name: 'SVG Vector', extension: '.svg', category: 'image', mimeType: 'image/svg+xml', isText: true, isBinary: false, description: 'Scalable vector graphics XML format' },
  { id: 'bmp', name: 'BMP Bitmap', extension: '.bmp', category: 'image', mimeType: 'image/bmp', isText: false, isBinary: true, description: 'Uncompressed raster bitmap format' },
  { id: 'ico', name: 'ICO Favicon', extension: '.ico', category: 'image', mimeType: 'image/x-icon', isText: false, isBinary: true, description: 'Standard multi-resolution website icon' },
  { id: 'image-base64', name: 'Base64 Data URI', extension: '.txt', category: 'image', mimeType: 'text/plain', isText: true, isBinary: false, description: 'Inline base64 image data URI string' },

  // Data & Spreadsheets
  { id: 'csv', name: 'CSV (Comma Separated)', extension: '.csv', category: 'data', mimeType: 'text/csv', isText: true, isBinary: false, description: 'Standard tabular data with comma delimiters' },
  { id: 'tsv', name: 'TSV (Tab Separated)', extension: '.tsv', category: 'data', mimeType: 'text/tab-separated-values', isText: true, isBinary: false, description: 'Tab-delimited spreadsheet format' },
  { id: 'json', name: 'JSON Data', extension: '.json', category: 'data', mimeType: 'application/json', isText: true, isBinary: false, description: 'JavaScript Object Notation data structure' },
  { id: 'yaml', name: 'YAML Document', extension: '.yaml', category: 'data', mimeType: 'text/yaml', isText: true, isBinary: false, description: 'Human-readable data serialization format' },
  { id: 'xml', name: 'XML Document', extension: '.xml', category: 'data', mimeType: 'application/xml', isText: true, isBinary: false, description: 'Extensible Markup Language document' },
  { id: 'sql', name: 'SQL Insert Statements', extension: '.sql', category: 'data', mimeType: 'text/x-sql', isText: true, isBinary: false, description: 'Database table creation and INSERT commands' },
  { id: 'markdown-table', name: 'Markdown Table', extension: '.md', category: 'data', mimeType: 'text/markdown', isText: true, isBinary: false, description: 'GitHub-flavored markdown ASCII table' },
  { id: 'html-table', name: 'HTML Table', extension: '.html', category: 'data', mimeType: 'text/html', isText: true, isBinary: false, description: 'Semantic <table> with <thead> and <tbody>' },

  // Documents & Text
  { id: 'txt', name: 'Plain Text (TXT)', extension: '.txt', category: 'document', mimeType: 'text/plain', isText: true, isBinary: false, description: 'Raw UTF-8 unformatted text file' },
  { id: 'markdown', name: 'Markdown (MD)', extension: '.md', category: 'document', mimeType: 'text/markdown', isText: true, isBinary: false, description: 'Lightweight markup language with formatting' },
  { id: 'html', name: 'HTML Web Page', extension: '.html', category: 'document', mimeType: 'text/html', isText: true, isBinary: false, description: 'HyperText Markup Language web document' },
  { id: 'latex', name: 'LaTeX Document', extension: '.tex', category: 'document', mimeType: 'text/x-tex', isText: true, isBinary: false, description: 'Scientific typesetting document format' },

  // Code & Types
  { id: 'typescript-types', name: 'TypeScript Interfaces', extension: '.d.ts', category: 'code', mimeType: 'text/plain', isText: true, isBinary: false, description: 'Generated TypeScript type definitions' },
  { id: 'base64-text', name: 'Base64 Encoded Text', extension: '.txt', category: 'code', mimeType: 'text/plain', isText: true, isBinary: false, description: 'Base64 encoded string format' },
  { id: 'hex-text', name: 'Hexadecimal Dump', extension: '.hex', category: 'code', mimeType: 'text/plain', isText: true, isBinary: false, description: 'Hex-encoded character dump' },

  // Audio & Media
  { id: 'wav', name: 'WAV Audio (PCM)', extension: '.wav', category: 'audio', mimeType: 'audio/wav', isText: false, isBinary: true, description: 'Uncompressed pulse-code modulated audio' },
  { id: 'mp3', name: 'MP3 Audio', extension: '.mp3', category: 'audio', mimeType: 'audio/mp3', isText: false, isBinary: true, description: 'MPEG Layer-3 compressed audio' },
  { id: 'audio-base64', name: 'Audio Base64 URI', extension: '.txt', category: 'audio', mimeType: 'text/plain', isText: true, isBinary: false, description: 'Base64 data URI string for audio' },
];

/**
 * Detects format ID from a File object by extension and MIME type.
 */
export function detectFormatFromFile(file: File): string {
  const name = file.name.toLowerCase();
  const ext = name.includes('.') ? name.split('.').pop() || '' : '';

  if (ext === 'png') return 'png';
  if (ext === 'jpg' || ext === 'jpeg') return 'jpeg';
  if (ext === 'webp') return 'webp';
  if (ext === 'svg') return 'svg';
  if (ext === 'bmp') return 'bmp';
  if (ext === 'ico') return 'ico';
  if (ext === 'csv') return 'csv';
  if (ext === 'tsv') return 'tsv';
  if (ext === 'json') return 'json';
  if (ext === 'yaml' || ext === 'yml') return 'yaml';
  if (ext === 'xml') return 'xml';
  if (ext === 'sql') return 'sql';
  if (ext === 'md' || ext === 'markdown') return 'markdown';
  if (ext === 'html' || ext === 'htm') return 'html';
  if (ext === 'tex' || ext === 'latex') return 'latex';
  if (ext === 'wav') return 'wav';
  if (ext === 'mp3') return 'mp3';
  if (ext === 'mp4' || ext === 'webm' || ext === 'ogg' || ext === 'm4a') return 'audio';

  // Fallback on MIME type
  if (file.type.startsWith('image/')) {
    if (file.type.includes('png')) return 'png';
    if (file.type.includes('webp')) return 'webp';
    if (file.type.includes('svg')) return 'svg';
    return 'jpeg';
  }
  if (file.type.includes('json')) return 'json';
  if (file.type.includes('csv')) return 'csv';
  if (file.type.includes('html')) return 'html';
  if (file.type.startsWith('audio/') || file.type.startsWith('video/')) return 'wav';

  return 'txt';
}

/**
 * Returns list of compatible target format IDs for a given source format ID.
 */
export function getCompatibleTargets(sourceFormatId: string): FormatDefinition[] {
  const source = SUPPORTED_FORMATS.find((f) => f.id === sourceFormatId) || SUPPORTED_FORMATS[0];

  switch (source.category) {
    case 'image':
      return SUPPORTED_FORMATS.filter(
        (f) => f.category === 'image' && f.id !== sourceFormatId
      );

    case 'data':
      // Data can convert to all data formats, markdown, HTML, code types, and plain text
      return SUPPORTED_FORMATS.filter(
        (f) => (f.category === 'data' || f.category === 'code' || f.id === 'txt' || f.id === 'html' || f.id === 'markdown') && f.id !== sourceFormatId
      );

    case 'document':
      // Document can convert to HTML, Markdown, Plain Text, LaTeX, Base64
      return SUPPORTED_FORMATS.filter(
        (f) => (f.category === 'document' || f.id === 'base64-text' || f.id === 'html-table' || f.id === 'json') && f.id !== sourceFormatId
      );

    case 'code':
      return SUPPORTED_FORMATS.filter(
        (f) => (f.category === 'code' || f.category === 'data' || f.id === 'txt') && f.id !== sourceFormatId
      );

    case 'audio':
      return SUPPORTED_FORMATS.filter(
        (f) => f.category === 'audio' && f.id !== sourceFormatId
      );

    default:
      return SUPPORTED_FORMATS.filter((f) => f.id !== sourceFormatId);
  }
}

// ==========================================
// 1. DATA CONVERSION ENGINES (CSV / JSON / YAML / XML / SQL)
// ==========================================

/**
 * Robust CSV parser handling quotes, escaped quotes, newlines, and custom delimiters.
 */
export function parseCSV(csvText: string, delimiter = ','): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === delimiter && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n
      }
      currentRow.push(currentField.trim());
      if (currentRow.some((f) => f.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Converts CSV text to structured JSON array of objects.
 */
export function csvToJson(csvText: string, delimiter = ','): string {
  const rows = parseCSV(csvText, delimiter);
  if (rows.length === 0) return '[]';

  const headers = rows[0].map((h, i) => h || `field_${i + 1}`);
  const data = rows.slice(1).map((row) => {
    const obj: Record<string, any> = {};
    headers.forEach((header, idx) => {
      const val = row[idx] !== undefined ? row[idx] : '';
      // Parse numeric or boolean values automatically if applicable
      if (val === 'true') obj[header] = true;
      else if (val === 'false') obj[header] = false;
      else if (val !== '' && !isNaN(Number(val))) obj[header] = Number(val);
      else obj[header] = val;
    });
    return obj;
  });

  return JSON.stringify(data, null, 2);
}

/**
 * Converts JSON array of objects into standard CSV text.
 */
export function jsonToCsv(jsonText: string, delimiter = ','): string {
  let parsed: any;
  try {
    parsed = JSON.parse(jsonText);
  } catch (err: any) {
    throw new Error(`Invalid JSON: ${err.message}`);
  }

  if (!Array.isArray(parsed)) {
    if (typeof parsed === 'object' && parsed !== null) {
      parsed = [parsed];
    } else {
      throw new Error('JSON root must be an array of objects or an object to convert to CSV.');
    }
  }

  if (parsed.length === 0) return '';

  // Extract all unique keys across all objects
  const headersSet = new Set<string>();
  parsed.forEach((item: any) => {
    if (typeof item === 'object' && item !== null) {
      Object.keys(item).forEach((k) => headersSet.add(k));
    }
  });

  const headers = Array.from(headersSet);
  const escapeField = (val: any) => {
    if (val === null || val === undefined) return '';
    const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
    if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const headerRow = headers.map(escapeField).join(delimiter);
  const dataRows = parsed.map((item: any) => {
    if (typeof item !== 'object' || item === null) return escapeField(item);
    return headers.map((h) => escapeField(item[h])).join(delimiter);
  });

  return [headerRow, ...dataRows].join('\n');
}

/**
 * Converts JSON to YAML format.
 */
export function jsonToYaml(jsonText: string): string {
  let parsed: any;
  try {
    parsed = JSON.parse(jsonText);
  } catch (err: any) {
    throw new Error(`Invalid JSON: ${err.message}`);
  }

  function serialize(obj: any, indent = 0): string {
    const pad = '  '.repeat(indent);
    if (obj === null) return 'null';
    if (typeof obj === 'undefined') return '';
    if (typeof obj === 'boolean' || typeof obj === 'number') return String(obj);
    if (typeof obj === 'string') {
      if (obj.includes('\n') || obj.includes(': ') || obj.includes('#') || obj.includes(',') || obj.trim() === '') {
        return JSON.stringify(obj);
      }
      return obj;
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      return obj
        .map((item) => {
          if (typeof item === 'object' && item !== null) {
            const nested = serialize(item, indent + 1);
            return `${pad}- ${nested.trimStart()}`;
          }
          return `${pad}- ${serialize(item, indent + 1)}`;
        })
        .join('\n');
    }

    if (typeof obj === 'object') {
      const keys = Object.keys(obj);
      if (keys.length === 0) return '{}';
      return keys
        .map((k) => {
          const val = obj[k];
          if (typeof val === 'object' && val !== null && Object.keys(val).length > 0) {
            return `${pad}${k}:\n${serialize(val, indent + 1)}`;
          }
          return `${pad}${k}: ${serialize(val, 0)}`;
        })
        .join('\n');
    }

    return String(obj);
  }

  return serialize(parsed);
}

function parseYamlPrimitive(raw: string): any {
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  if (raw === 'null' || raw === '~' || raw === '') return null;
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1);
  }
  if (!isNaN(Number(raw))) return Number(raw);
  return raw;
}

/**
 * Lightweight YAML to JSON parser for common structures (objects and lists).
 */
export function yamlToJson(yamlText: string): string {
  const lines = yamlText.split(/\r?\n/).filter((l) => l.trim() && !l.trim().startsWith('#'));
  if (lines.length === 0) return '{}';

  const isArray = lines[0].trim().startsWith('-');
  if (isArray) {
    const items: any[] = [];
    let currentItem: Record<string, any> | null = null;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (line.startsWith('-')) {
        if (currentItem && Object.keys(currentItem).length > 0) {
          items.push(currentItem);
        }
        currentItem = {};
        const content = line.replace(/^-\s*/, '').trim();
        if (content.includes(':')) {
          const colonIdx = content.indexOf(':');
          const k = content.slice(0, colonIdx).trim();
          const v = parseYamlPrimitive(content.slice(colonIdx + 1).trim());
          currentItem[k] = v;
        } else if (content) {
          items.push(parseYamlPrimitive(content));
          currentItem = null;
        }
      } else if (currentItem && line.includes(':')) {
        const colonIdx = line.indexOf(':');
        const k = line.slice(0, colonIdx).trim();
        const v = parseYamlPrimitive(line.slice(colonIdx + 1).trim());
        currentItem[k] = v;
      }
    }
    if (currentItem && Object.keys(currentItem).length > 0) {
      items.push(currentItem);
    }
    return JSON.stringify(items, null, 2);
  }

  const root: Record<string, any> = {};
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      const rawVal = line.slice(colonIdx + 1).trim();
      root[key] = parseYamlPrimitive(rawVal);
    }
  }

  return JSON.stringify(root, null, 2);
}

/**
 * Converts JSON to XML representation.
 */
export function jsonToXml(jsonText: string, rootTag = 'root'): string {
  let parsed: any;
  try {
    parsed = JSON.parse(jsonText);
  } catch (err: any) {
    throw new Error(`Invalid JSON: ${err.message}`);
  }

  function toXml(val: any, tag: string, indent = 1): string {
    const pad = '  '.repeat(indent);
    if (val === null || val === undefined) {
      return `${pad}<${tag} />`;
    }
    if (Array.isArray(val)) {
      return val.map((item) => toXml(item, tag, indent)).join('\n');
    }
    if (typeof val === 'object') {
      const inner = Object.keys(val)
        .map((k) => {
          const cleanTag = k.replace(/[^a-zA-Z0-9_-]/g, '_');
          return toXml(val[k], cleanTag, indent + 1);
        })
        .join('\n');
      return `${pad}<${tag}>\n${inner}\n${pad}</${tag}>`;
    }

    const escaped = String(val)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `${pad}<${tag}>${escaped}</${tag}>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootTag}>\n${toXml(parsed, 'item', 1)}\n</${rootTag}>`;
}

/**
 * Converts XML to JSON representation using browser DOMParser.
 */
export function xmlToJson(xmlText: string): string {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const parseError = xmlDoc.querySelector('parsererror');
  if (parseError) {
    throw new Error(`XML Parse Error: ${parseError.textContent}`);
  }

  function nodeToObject(node: Node): any {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue?.trim() || '';
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const obj: Record<string, any> = {};

      // Add attributes with '@' prefix
      if (el.attributes && el.attributes.length > 0) {
        for (let i = 0; i < el.attributes.length; i++) {
          const attr = el.attributes[i];
          obj[`@${attr.name}`] = attr.value;
        }
      }

      // Process children
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        const textVal = el.childNodes[0].nodeValue?.trim() || '';
        if (Object.keys(obj).length === 0) return textVal;
        obj['#text'] = textVal;
        return obj;
      }

      for (let i = 0; i < el.childNodes.length; i++) {
        const child = el.childNodes[i];
        if (child.nodeType === Node.ELEMENT_NODE) {
          const childName = (child as Element).tagName;
          const childVal = nodeToObject(child);

          if (obj[childName] !== undefined) {
            if (!Array.isArray(obj[childName])) {
              obj[childName] = [obj[childName]];
            }
            obj[childName].push(childVal);
          } else {
            obj[childName] = childVal;
          }
        }
      }

      return obj;
    }

    return null;
  }

  const result: Record<string, any> = {};
  if (xmlDoc.documentElement) {
    result[xmlDoc.documentElement.tagName] = nodeToObject(xmlDoc.documentElement);
  }

  return JSON.stringify(result, null, 2);
}

/**
 * Converts CSV to SQL Table schema and INSERT statements.
 */
export function csvToSql(csvText: string, tableName = 'my_table', delimiter = ','): string {
  const rows = parseCSV(csvText, delimiter);
  if (rows.length === 0) return '-- No data provided';

  const cleanTableName = tableName.replace(/[^a-zA-Z0-9_]/g, '_');
  const headers = rows[0].map((h, i) => (h || `col_${i + 1}`).replace(/[^a-zA-Z0-9_]/g, '_'));

  const createTable = `CREATE TABLE IF NOT EXISTS ${cleanTableName} (\n  ${headers.map((h) => `${h} VARCHAR(255)`).join(',\n  ')}\n);\n`;

  const inserts = rows.slice(1).map((row) => {
    const escapedVals = headers.map((_, idx) => {
      const val = row[idx] !== undefined ? row[idx] : '';
      return `'${val.replace(/'/g, "''")}'`;
    });
    return `INSERT INTO ${cleanTableName} (${headers.join(', ')}) VALUES (${escapedVals.join(', ')});`;
  });

  return `${createTable}\n${inserts.join('\n')}`;
}

/**
 * Converts CSV to a clean Markdown table.
 */
export function csvToMarkdownTable(csvText: string, delimiter = ','): string {
  const rows = parseCSV(csvText, delimiter);
  if (rows.length === 0) return '';

  const headers = rows[0];
  const divider = headers.map(() => '---');
  const allRows = [headers, divider, ...rows.slice(1)];

  return allRows.map((r) => `| ${r.map((c) => c.replace(/\|/g, '\\|')).join(' | ')} |`).join('\n');
}

/**
 * Converts Markdown Table into CSV text.
 */
export function markdownTableToCsv(mdTableText: string): string {
  const lines = mdTableText.split(/\r?\n/).filter((l) => l.includes('|'));
  const rows = lines
    .filter((l) => l.replace(/[\s|:-]/g, '').length > 0) // exclude divider row e.g. |---|---|
    .map((l) =>
      l
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim())
    );

  const escapeCell = (c: string) => {
    if (c.includes(',') || c.includes('"') || c.includes('\n')) {
      return `"${c.replace(/"/g, '""')}"`;
    }
    return c;
  };

  return rows.map((r) => r.map(escapeCell).join(',')).join('\n');
}

/**
 * Converts Markdown text into semantic HTML.
 */
export function markdownToHtml(mdText: string): string {
  let html = mdText
    // Escape HTML entities first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headings
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold & Italic
    .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Code blocks & inline code
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    // Blockquotes
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    // Unordered Lists
    .replace(/^\s*[-*]\s+(.*$)/gim, '<li>$1</li>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Wrap lists
  html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
  // Line breaks to paragraphs
  const paragraphs = html
    .split(/\n\s*\n/)
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      if (/^<(h[1-6]|ul|ol|pre|blockquote|table)/i.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n\n');

  return paragraphs;
}

/**
 * Converts HTML into plain Markdown text.
 */
export function htmlToMarkdown(htmlText: string): string {
  let md = htmlText
    .replace(/<h1>(.*?)<\/h1>/gim, '# $1\n\n')
    .replace(/<h2>(.*?)<\/h2>/gim, '## $1\n\n')
    .replace(/<h3>(.*?)<\/h3>/gim, '### $1\n\n')
    .replace(/<strong>(.*?)<\/strong>/gim, '**$1**')
    .replace(/<b>(.*?)<\/b>/gim, '**$1**')
    .replace(/<em>(.*?)<\/em>/gim, '*$1*')
    .replace(/<i>(.*?)<\/i>/gim, '*$1*')
    .replace(/<code>(.*?)<\/code>/gim, '`$1`')
    .replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gim, '```\n$1\n```\n\n')
    .replace(/<li>(.*?)<\/li>/gim, '- $1\n')
    .replace(/<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gim, '[$2]($1)')
    .replace(/<p>(.*?)<\/p>/gim, '$1\n\n')
    .replace(/<br\s*\/?>/gim, '\n')
    .replace(/<[^>]+>/gim, ''); // strip any remaining tags

  // Unescape entities
  md = md
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');

  return md.trim();
}

/**
 * Generates TypeScript interface definitions from a JSON string, extracting nested sub-interfaces.
 */
export function jsonToTypeScript(jsonText: string, interfaceName = 'RootObject'): string {
  let parsed: any;
  try {
    parsed = JSON.parse(jsonText);
  } catch (err: any) {
    throw new Error(`Invalid JSON: ${err.message}`);
  }

  const extraInterfaces: string[] = [];

  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function generateInterface(obj: Record<string, any>, name: string): string {
    const lines: string[] = [`export interface ${name} {`];
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      const typeStr = resolveType(val, `${name}${capitalize(key)}`);
      lines.push(`  ${key}: ${typeStr};`);
    });
    lines.push('}');
    return lines.join('\n');
  }

  function resolveType(val: any, suggestedSubName: string): string {
    if (val === null) return 'null | any';
    if (Array.isArray(val)) {
      if (val.length === 0) return 'any[]';
      return `${resolveType(val[0], suggestedSubName)}[]`;
    }
    if (typeof val === 'object') {
      const sub = generateInterface(val, suggestedSubName);
      extraInterfaces.push(sub);
      return suggestedSubName;
    }
    return typeof val;
  }

  const sample = Array.isArray(parsed) ? parsed[0] || {} : parsed;
  const root = generateInterface(sample, interfaceName);

  return [root, ...extraInterfaces].join('\n\n');
}

// ==========================================
// 2. IMAGE CONVERSION ENGINE (Canvas API)
// ==========================================

export interface ImageConversionOptions {
  targetFormat: 'png' | 'jpeg' | 'webp' | 'bmp' | 'ico' | 'svg' | 'image-base64';
  quality?: number; // 0.1 to 1.0
  maxWidth?: number;
  maxHeight?: number;
  maintainAspectRatio?: boolean;
  grayscale?: boolean;
  backgroundColor?: string;
}

/**
 * Converts image files (PNG, JPG, WEBP, SVG, BMP) using HTML Canvas API in browser.
 */
export async function convertImage(
  fileOrBlob: Blob,
  options: ImageConversionOptions
): Promise<{ blob: Blob; dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(fileOrBlob);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let targetWidth = img.naturalWidth || img.width;
      let targetHeight = img.naturalHeight || img.height;

      // Handle custom resizing if requested
      if (options.maxWidth && targetWidth > options.maxWidth) {
        if (options.maintainAspectRatio !== false) {
          targetHeight = Math.round((targetHeight * options.maxWidth) / targetWidth);
        }
        targetWidth = options.maxWidth;
      }
      if (options.maxHeight && targetHeight > options.maxHeight) {
        if (options.maintainAspectRatio !== false) {
          targetWidth = Math.round((targetWidth * options.maxHeight) / targetHeight);
        }
        targetHeight = options.maxHeight;
      }

      // Favicon ICO mode presets (standard 32x32 or 64x64)
      if (options.targetFormat === 'ico') {
        targetWidth = Math.min(targetWidth, 64);
        targetHeight = Math.min(targetHeight, 64);
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject(new Error('Canvas 2D context is unavailable'));
      }

      // Background filling for non-transparent target formats (JPEG, BMP)
      if (options.targetFormat === 'jpeg' || options.targetFormat === 'bmp') {
        ctx.fillStyle = options.backgroundColor || '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      // Grayscale filter
      if (options.grayscale) {
        ctx.filter = 'grayscale(100%)';
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Determine export mime type
      let mimeType = 'image/png';
      if (options.targetFormat === 'jpeg') mimeType = 'image/jpeg';
      else if (options.targetFormat === 'webp') mimeType = 'image/webp';
      else if (options.targetFormat === 'ico') mimeType = 'image/x-icon';

      const quality = options.quality !== undefined ? options.quality : 0.92;
      const dataUrl = canvas.toDataURL(mimeType, quality);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return reject(new Error('Failed to encode image to target format'));
          }
          resolve({ blob, dataUrl, width: targetWidth, height: targetHeight });
        },
        mimeType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image. Ensure the file is a valid image format.'));
    };

    img.src = objectUrl;
  });
}

// ==========================================
// 3. AUDIO CONVERSION & EXTRACTION ENGINE
// ==========================================

/**
 * Encodes Float32Array PCM audio buffer into standard 16-bit PCM WAV Blob.
 */
export function encodeWAV(audioBuffer: AudioBuffer): Blob {
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;

  // Interleave channels
  let interleaved: Float32Array;
  if (numChannels === 2) {
    const left = audioBuffer.getChannelData(0);
    const right = audioBuffer.getChannelData(1);
    interleaved = new Float32Array(left.length + right.length);
    for (let i = 0; i < left.length; i++) {
      interleaved[i * 2] = left[i];
      interleaved[i * 2 + 1] = right[i];
    }
  } else {
    interleaved = audioBuffer.getChannelData(0);
  }

  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const dataByteLength = interleaved.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataByteLength);
  const view = new DataView(buffer);

  // Helper to write ASCII strings into DataView
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  // RIFF identifier
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataByteLength, true);
  writeString(8, 'WAVE');
  // format chunk identifier
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // format chunk length
  view.setUint16(20, format, true); // sample format
  view.setUint16(22, numChannels, true); // channel count
  view.setUint32(24, sampleRate, true); // sample rate
  view.setUint32(28, sampleRate * blockAlign, true); // byte rate
  view.setUint16(32, blockAlign, true); // block align
  view.setUint16(34, bitDepth, true); // bits per sample
  // data chunk identifier
  writeString(36, 'data');
  view.setUint32(40, dataByteLength, true);

  // Write 16-bit PCM samples
  let offset = 44;
  for (let i = 0; i < interleaved.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, interleaved[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

/**
 * Extracts or converts audio from media file to WAV format client-side.
 */
export async function convertMediaToWav(mediaBlob: Blob): Promise<Blob> {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) {
    throw new Error('Web Audio API is not supported in this browser.');
  }

  const audioCtx = new AudioContextClass();
  try {
    const arrayBuffer = await mediaBlob.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    return encodeWAV(audioBuffer);
  } finally {
    audioCtx.close();
  }
}
