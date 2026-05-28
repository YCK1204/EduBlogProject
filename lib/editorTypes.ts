export type CodeLang = "python" | "javascript" | "java" | "cpp" | "c" | "csharp";

export interface TextBlock { type: "text"; content: string }
export interface HeaderBlock { type: "header"; level: 1 | 2 | 3; content: string }
export interface BoldBlock { type: "bold"; content: string }
export interface ItalicBlock { type: "italic"; content: string }
export interface UnderbarBlock { type: "underbar"; content: string }
export interface StrikeBlock { type: "strike"; content: string }
export interface ColorBlock { type: "color"; content: string; color: string }
export interface UlBlock { type: "ul"; items: string[] }
export interface OlBlock { type: "ol"; items: string[] }
export interface BoxBlock { type: "box"; blocks: EditorBlock[] }
export interface CodeBlock { type: "code"; langs: { lang: CodeLang; code: string }[] }
export interface ImageBlock { type: "image"; src: string; alt: string; width?: number }

export type EditorBlock =
  | TextBlock | HeaderBlock | BoldBlock | ItalicBlock | UnderbarBlock
  | StrikeBlock | ColorBlock | UlBlock | OlBlock | BoxBlock | CodeBlock | ImageBlock;

export interface EditorStep {
  id: string;
  title: string;
  blocks: EditorBlock[];
}

export interface EditorLesson {
  slug: string;
  title: string;
  summary: string;
  tag: string;
  level: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  relatedSlugs: string[];
  steps: EditorStep[];
}

export const LEVEL_LABELS: Record<EditorLesson["level"], string> = {
  beginner: "초급",
  intermediate: "중급",
  advanced: "고급",
};

export const ALL_LANGS: CodeLang[] = ["python", "javascript", "java", "cpp", "c", "csharp"];
export const LANG_LABELS: Record<CodeLang, string> = {
  python: "Python", javascript: "JavaScript", java: "Java",
  cpp: "C++", c: "C", csharp: "C#",
};

export function newLesson(category: string, level: string): EditorLesson {
  return {
    slug: "",
    title: "",
    summary: "",
    tag: "",
    level: (level as EditorLesson["level"]) ?? "beginner",
    estimatedTime: "20분",
    relatedSlugs: [],
    steps: [{ id: crypto.randomUUID(), title: "개요", blocks: [] }],
  };
}
