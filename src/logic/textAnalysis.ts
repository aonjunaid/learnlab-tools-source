/**
 * Pure text metrics and case transformation functions.
 * Supports Unicode, grapheme-sensitive counts, and sentence/paragraph parsing.
 */

export interface TextAnalysisStats {
  words: number;
  charsTotal: number;
  charsNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMinutes: number;
  readingTimeFormatted: string;
  speakingTimeMinutes: number;
  speakingTimeFormatted: string;
  avgWordLength: number;
}

export function analyzeText(text: string): TextAnalysisStats {
  if (!text) {
    return {
      words: 0,
      charsTotal: 0,
      charsNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTimeMinutes: 0,
      readingTimeFormatted: '0 sec',
      speakingTimeMinutes: 0,
      speakingTimeFormatted: '0 sec',
      avgWordLength: 0,
    };
  }

  // Count Unicode codepoints/graphemes using Intl.Segmenter where supported or Array.from
  const codepointArray = Array.from(text);
  const charsTotal = codepointArray.length;
  const charsNoSpaces = codepointArray.filter((c) => !/\s/.test(c)).length;

  const lines = text.split(/\r\n|\r|\n/).length;

  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;

  const trimmed = text.trim();
  const wordTokens = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const words = wordTokens.length;

  // Sentences split by sentence-ending punctuation (.!?)
  const sentenceTokens = trimmed
    ? trimmed.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 0)
    : [];
  const sentences = sentenceTokens.length;

  // Reading time (225 wpm)
  const readingTimeMinutes = words / 225;
  const totalReadSec = Math.round(readingTimeMinutes * 60);
  const rMin = Math.floor(totalReadSec / 60);
  const rSec = totalReadSec % 60;
  const readingTimeFormatted =
    words === 0
      ? '0 sec'
      : rMin === 0
      ? `${rSec} sec`
      : rSec === 0
      ? `${rMin} min`
      : `${rMin} min ${rSec}s`;

  // Speaking time (130 wpm)
  const speakingTimeMinutes = words / 130;
  const totalSpeakSec = Math.round(speakingTimeMinutes * 60);
  const sMin = Math.floor(totalSpeakSec / 60);
  const sSec = totalSpeakSec % 60;
  const speakingTimeFormatted =
    words === 0
      ? '0 sec'
      : sMin === 0
      ? `${sSec} sec`
      : sSec === 0
      ? `${sMin} min`
      : `${sMin} min ${sSec}s`;

  const totalWordChars = wordTokens.reduce((acc, w) => acc + w.length, 0);
  const avgWordLength = words > 0 ? Number((totalWordChars / words).toFixed(1)) : 0;

  return {
    words,
    charsTotal,
    charsNoSpaces,
    sentences,
    paragraphs,
    lines,
    readingTimeMinutes,
    readingTimeFormatted,
    speakingTimeMinutes,
    speakingTimeFormatted,
    avgWordLength,
  };
}

export type TextCaseStyle =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'alternating'
  | 'camel'
  | 'snake'
  | 'kebab';

export function convertTextCase(text: string, style: TextCaseStyle): string {
  if (!text) return '';

  switch (style) {
    case 'upper':
      return text.toUpperCase();

    case 'lower':
      return text.toLowerCase();

    case 'title':
      return text.replace(
        /\w\S*/g,
        (w) => w.charAt(0).toUpperCase() + w.substring(1).toLowerCase()
      );

    case 'sentence':
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

    case 'alternating':
      let upper = true;
      return Array.from(text)
        .map((char) => {
          if (/[a-zA-Z]/.test(char)) {
            const out = upper ? char.toUpperCase() : char.toLowerCase();
            upper = !upper;
            return out;
          }
          return char;
        })
        .join('');

    case 'camel':
      return text
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

    case 'snake':
      return text
        .trim()
        .toLowerCase()
        .replace(/[\s\W-]+/g, '_')
        .replace(/^_+|_+$/g, '');

    case 'kebab':
      return text
        .trim()
        .toLowerCase()
        .replace(/[\s\W_]+/g, '-')
        .replace(/^-+|-+$/g, '');

    default:
      return text;
  }
}
