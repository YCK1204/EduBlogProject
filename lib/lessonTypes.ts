export type CodeLang = "c" | "cpp" | "csharp" | "python" | "java" | "javascript";

export type TextBlock    = { type: "text";     content: string };
export type HeaderBlock  = { type: "header";   level: 1 | 2 | 3; content: string };
export type BoldBlock    = { type: "bold";     content: string };
export type ItalicBlock  = { type: "italic";   content: string };
export type UnderbarBlock = { type: "underbar"; content: string };
export type StrikeBlock  = { type: "strike";   content: string };
export type ColorBlock   = { type: "color";    content: string; color: string };
export type PointsBlock  = { type: "points";   items: string[] };
export type OlBlock      = { type: "ol";       items: string[] };
export type ImageBlock   = { 
  type: "image"; 
  src: string; 
  alt: string; 
  width?: number;
  srcEn?: string;  // Optional English-specific image source
  altEn?: string;  // Optional English-specific alt text
};
export type CodeBlock    = { type: "code" } & Partial<Record<CodeLang, string>>;
export type BoxBlock     = { type: "box";      blocks: Block[] };

export type Block =
  | TextBlock | HeaderBlock | BoldBlock | ItalicBlock | UnderbarBlock
  | StrikeBlock | ColorBlock | PointsBlock | OlBlock | ImageBlock | CodeBlock | BoxBlock;

export interface Step {
  number: number;
  title: string;
  blocks: Block[];
}

export interface Lesson {
  slug: string;
  title: string;
  level: "초급" | "중급" | "고급";
  tag: string;
  estimatedTime: string;
  summary: string;
  relatedSlugs: string[];
  steps: Step[];
}

export const LEVEL_TO_FOLDER: Record<"초급" | "중급" | "고급", string> = {
  "초급": "beginner",
  "중급": "intermediate",
  "고급": "advanced",
};

export const FOLDER_TO_LEVEL: Record<string, "초급" | "중급" | "고급"> = {
  beginner: "초급",
  intermediate: "중급",
  advanced: "고급",
};
