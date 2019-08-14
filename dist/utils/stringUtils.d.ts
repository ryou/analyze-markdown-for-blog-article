/**
 * 文字列を改行コードで分割し配列として返却
 *
 * @param input
 */
export declare const stringToArrayByLine: (input: string) => string[];
/**
 * 文字列配列を改行コードを区切り文字として結合
 *
 * @param input
 */
export declare const joinStringArrayWithNewLine: (input: string[]) => string;
/**
 * 文字列をlength文字毎に分割し配列として返却
 * TODO: サロゲートペア等が正常に処理されない問題の対処
 *
 * @param input
 * @param length
 */
export declare const splitStringByLength: (input: string, length: Number) => string[];
/**
 * マークダウン文字列をHTMLに変換
 *
 * @param markdown
 */
export declare const markdownToHtml: (markdown: string) => string;
/**
 * マークダウン文字列から文字列情報のみ抽出し返却
 *
 * @param markdown
 */
export declare const removeMarkdown: (markdown: string) => string;
