declare type Frontmatters = {
    [key: string]: string;
};
interface AnalyzeOption {
    previewLength: Number | null;
}
interface AnalyzedData {
    frontmatters: Frontmatters;
    title: string;
    bodyHtml: string;
    preview: string | null;
}
/**
 * 文字列配列の頭の空行を除去し返却
 *
 * @param stringArray
 */
export declare const removeHeadBlankLine: (stringArray: string[]) => string[];
/**
 * 引数として渡された文字列配列を、最初にneedleが出てきた点で分割し返却
 *
 * @param stringArray
 * @param needle
 */
export declare const splitStringArrayAtFirstItem: (stringArray: string[], needle: string) => string[][];
/**
 * 行ごとに分割し配列化されたマークダウン文字列から、Frontmatterと本文を分けて返却する
 *
 * @param markdownArray
 */
export declare const extractFrontmatters: (markdownArray: string[]) => {
    frontmatters: Frontmatters;
    contentMarkdownArray: string[];
};
/**
 * previewを算出し返却
 *
 * @param bodyMarkdown
 * @param previewLength
 */
export declare const calcPreviewFromBodyMarkdown: (bodyMarkdown: string, previewLength: Number) => string;
/**
 * マークダウン文字列をブログ記事として扱いやすい形に分解する
 *
 * @param markdown
 * @param option
 */
export declare const analyzeMarkdownForBlogArticle: (markdown: string, option?: AnalyzeOption) => AnalyzedData;
export {};
