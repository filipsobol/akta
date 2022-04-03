import type { Pluggable } from "unified";

export interface MarkdownPluginOptions {
  remarkPlugins?: Pluggable[];
  rehypePlugins?: Pluggable[];
  onOutputGenerated?: (output: string) => string;
}