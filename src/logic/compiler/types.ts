export type SupportedLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'c'
  | 'cpp'
  | 'rust'
  | 'sql'
  | 'html';

export interface CodeTemplate {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  code: string;
  stdin?: string;
}

export interface LanguageConfig {
  id: SupportedLanguage;
  name: string;
  fileExtension: string;
  defaultFilename: string;
  version: string;
  paradigm: string;
  icon: string;
  monacoLang: string;
  description: string;
  templates: CodeTemplate[];
}

export interface CompilerLog {
  type: 'stdout' | 'stderr' | 'info' | 'warn' | 'success';
  message: string;
  timestamp: number;
}

export interface CompilerDiagnostic {
  line: number;
  column?: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
}

export interface CompilationResult {
  success: boolean;
  output: string;
  logs: CompilerLog[];
  diagnostics: CompilerDiagnostic[];
  assemblyCode?: string;
  executionTimeMs: number;
  exitCode: number;
  sqlResult?: {
    columns: string[];
    rows: (string | number | boolean | null)[][];
    rowCount: number;
    plan?: string[];
  };
  transpiledCode?: string;
  astView?: string;
  memoryKb?: number;
}
