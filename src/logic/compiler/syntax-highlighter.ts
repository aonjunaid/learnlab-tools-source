import { SupportedLanguage } from './types';

// Fast token rules for syntax highlighting
const KEYWORDS: Record<SupportedLanguage, Set<string>> = {
  javascript: new Set([
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
    'switch', 'case', 'default', 'break', 'continue', 'class', 'extends', 'new',
    'this', 'super', 'import', 'export', 'from', 'as', 'default', 'async', 'await',
    'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'in', 'of', 'void', 'delete'
  ]),
  typescript: new Set([
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
    'switch', 'case', 'default', 'break', 'continue', 'class', 'extends', 'new',
    'this', 'super', 'import', 'export', 'from', 'as', 'async', 'await', 'try', 'catch',
    'interface', 'type', 'enum', 'implements', 'declare', 'namespace', 'abstract',
    'readonly', 'private', 'public', 'protected', 'override', 'keyof', 'typeof', 'is'
  ]),
  python: new Set([
    'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue', 'pass',
    'class', 'import', 'from', 'as', 'try', 'except', 'finally', 'raise', 'with', 'in',
    'is', 'not', 'and', 'or', 'lambda', 'global', 'nonlocal', 'yield', 'assert', 'async', 'await'
  ]),
  c: new Set([
    'int', 'float', 'double', 'char', 'void', 'short', 'long', 'signed', 'unsigned',
    'struct', 'union', 'enum', 'typedef', 'sizeof', 'const', 'static', 'extern', 'volatile',
    'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue',
    'return', 'goto'
  ]),
  cpp: new Set([
    'int', 'float', 'double', 'char', 'void', 'bool', 'auto', 'struct', 'class', 'public',
    'private', 'protected', 'virtual', 'override', 'const', 'static', 'constexpr',
    'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue',
    'return', 'namespace', 'using', 'template', 'typename', 'new', 'delete', 'this',
    'std', 'cout', 'cin', 'endl'
  ]),
  rust: new Set([
    'fn', 'let', 'mut', 'const', 'static', 'struct', 'enum', 'impl', 'trait', 'type',
    'pub', 'mod', 'use', 'as', 'if', 'else', 'match', 'for', 'while', 'loop', 'in',
    'return', 'break', 'continue', 'where', 'ref', 'move', 'unsafe', 'async', 'await'
  ]),
  sql: new Set([
    'select', 'from', 'where', 'insert', 'into', 'values', 'update', 'set', 'delete',
    'create', 'table', 'drop', 'alter', 'join', 'inner', 'left', 'right', 'outer', 'on',
    'group', 'by', 'order', 'asc', 'desc', 'having', 'limit', 'as', 'distinct', 'count',
    'sum', 'avg', 'min', 'max', 'and', 'or', 'not', 'null', 'is', 'like', 'in', 'between',
    'primary', 'key', 'foreign', 'references', 'int', 'varchar', 'decimal'
  ]),
  html: new Set([
    'html', 'head', 'body', 'title', 'meta', 'link', 'style', 'script', 'div', 'span',
    'h1', 'h2', 'h3', 'p', 'a', 'button', 'input', 'form', 'table', 'tr', 'td', 'th',
    'ul', 'ol', 'li', 'header', 'footer', 'main', 'section', 'article', 'canvas'
  ])
};

const TYPES: Record<SupportedLanguage, Set<string>> = {
  typescript: new Set(['string', 'number', 'boolean', 'any', 'void', 'never', 'unknown', 'object', 'symbol', 'Array', 'Record', 'Promise']),
  javascript: new Set(['String', 'Number', 'Boolean', 'Object', 'Array', 'Promise', 'Math', 'Date', 'RegExp', 'JSON', 'Map', 'Set']),
  python: new Set(['int', 'float', 'str', 'bool', 'list', 'dict', 'set', 'tuple', 'True', 'False', 'None']),
  c: new Set(['NULL', 'size_t', 'FILE', 'bool', 'true', 'false']),
  cpp: new Set(['string', 'vector', 'map', 'set', 'pair', 'true', 'false', 'nullptr']),
  rust: new Set(['u8', 'u16', 'u32', 'u64', 'u128', 'usize', 'i8', 'i16', 'i32', 'i64', 'isize', 'f32', 'f64', 'bool', 'char', 'String', 'Option', 'Result', 'Some', 'None', 'Ok', 'Err', 'true', 'false']),
  sql: new Set(['true', 'false', 'null']),
  html: new Set([])
};

export interface TokenSpan {
  text: string;
  type: 'keyword' | 'type' | 'string' | 'number' | 'comment' | 'preprocessor' | 'function' | 'operator' | 'punctuation' | 'plain';
}

/**
 * Fast, lightweight syntax highlighter that produces token spans for rendering.
 */
export function tokenizeCode(code: string, lang: SupportedLanguage): TokenSpan[][] {
  const lines = code.split('\n');
  const result: TokenSpan[][] = [];
  const keywordSet = KEYWORDS[lang] || KEYWORDS.javascript;
  const typeSet = TYPES[lang] || TYPES.javascript;

  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];
    const lineSpans: TokenSpan[] = [];
    let i = 0;

    while (i < line.length) {
      const char = line[i];

      // 1. Comments
      // Python & SQL single line comments
      if (lang === 'python' && char === '#') {
        lineSpans.push({ text: line.slice(i), type: 'comment' });
        break;
      }
      if (lang === 'sql' && char === '-' && line[i + 1] === '-') {
        lineSpans.push({ text: line.slice(i), type: 'comment' });
        break;
      }
      // C / JS / Rust single line comments
      if (char === '/' && line[i + 1] === '/') {
        lineSpans.push({ text: line.slice(i), type: 'comment' });
        break;
      }

      // Preprocessor directives in C/C++
      if ((lang === 'c' || lang === 'cpp') && char === '#' && i === 0) {
        lineSpans.push({ text: line, type: 'preprocessor' });
        break;
      }

      // 2. String literals ('...', "...", `...`)
      if (char === '"' || char === "'" || char === '`') {
        const quote = char;
        let str = quote;
        i++;
        while (i < line.length) {
          if (line[i] === '\\' && i + 1 < line.length) {
            str += line[i] + line[i + 1];
            i += 2;
            continue;
          }
          if (line[i] === quote) {
            str += quote;
            i++;
            break;
          }
          str += line[i];
          i++;
        }
        lineSpans.push({ text: str, type: 'string' });
        continue;
      }

      // 3. Numbers
      if (/\d/.test(char) || (char === '.' && /\d/.test(line[i + 1] || ''))) {
        let num = '';
        while (i < line.length && /[\d.eExXbBa-fA-F_]/.test(line[i])) {
          num += line[i];
          i++;
        }
        lineSpans.push({ text: num, type: 'number' });
        continue;
      }

      // 4. Identifiers & Keywords
      if (/[a-zA-Z_$]/.test(char)) {
        let ident = '';
        while (i < line.length && /[a-zA-Z0-9_$]/.test(line[i])) {
          ident += line[i];
          i++;
        }

        const lowerIdent = lang === 'sql' ? ident.toLowerCase() : ident;

        if (keywordSet.has(lowerIdent)) {
          lineSpans.push({ text: ident, type: 'keyword' });
        } else if (typeSet.has(ident) || typeSet.has(lowerIdent)) {
          lineSpans.push({ text: ident, type: 'type' });
        } else if (i < line.length && line[i] === '(') {
          lineSpans.push({ text: ident, type: 'function' });
        } else {
          lineSpans.push({ text: ident, type: 'plain' });
        }
        continue;
      }

      // 5. Operators & Punctuation
      if (/[=+\-*/%&|^!<>~?:]/.test(char)) {
        lineSpans.push({ text: char, type: 'operator' });
        i++;
        continue;
      }

      if (/[{}()[\];,.]/.test(char)) {
        lineSpans.push({ text: char, type: 'punctuation' });
        i++;
        continue;
      }

      // Whitespace and other plain characters
      let ws = '';
      while (i < line.length && !/[a-zA-Z0-9_$'"#`/{}[\]();,.=+\-*/%&|^!<>~?:]/.test(line[i])) {
        ws += line[i];
        i++;
      }
      lineSpans.push({ text: ws, type: 'plain' });
    }

    result.push(lineSpans.length > 0 ? lineSpans : [{ text: '', type: 'plain' }]);
  }

  return result;
}

// Token color styles for the code editor
export function getTokenClass(type: TokenSpan['type']): string {
  switch (type) {
    case 'keyword':
      return 'text-purple-600 dark:text-purple-400 font-semibold';
    case 'type':
      return 'text-emerald-600 dark:text-emerald-400 font-medium';
    case 'string':
      return 'text-amber-600 dark:text-amber-300';
    case 'number':
      return 'text-sky-600 dark:text-sky-300';
    case 'comment':
      return 'text-neutral-400 dark:text-neutral-500 italic';
    case 'preprocessor':
      return 'text-indigo-600 dark:text-indigo-400 font-semibold';
    case 'function':
      return 'text-blue-600 dark:text-blue-400';
    case 'operator':
      return 'text-rose-600 dark:text-rose-400';
    case 'punctuation':
      return 'text-neutral-600 dark:text-neutral-400';
    case 'plain':
    default:
      return 'text-neutral-800 dark:text-neutral-200';
  }
}
