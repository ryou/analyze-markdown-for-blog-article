"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var markdown_it_1 = __importDefault(require("markdown-it"));
var remove_markdown_1 = __importDefault(require("remove-markdown"));
/**
 * 文字列を改行コードで分割し配列として返却
 *
 * @param input
 */
exports.stringToArrayByLine = function (input) {
    return input.split('\n');
};
/**
 * 文字列配列を改行コードを区切り文字として結合
 *
 * @param input
 */
exports.joinStringArrayWithNewLine = function (input) {
    return input.join('\n');
};
/**
 * 文字列をlength文字毎に分割し配列として返却
 * TODO: サロゲートペア等が正常に処理されない問題の対処
 *
 * @param input
 * @param length
 */
exports.splitStringByLength = function (input, length) {
    var regexPattern = new RegExp(".{1," + length + "}", 'g');
    var splitArray = input.match(regexPattern);
    if (splitArray === null) {
        throw new Error('hoge');
    }
    return splitArray;
};
/**
 * マークダウン文字列をHTMLに変換
 *
 * @param markdown
 */
exports.markdownToHtml = function (markdown) {
    var parser = new markdown_it_1.default();
    return parser.render(markdown);
};
/**
 * マークダウン文字列から文字列情報のみ抽出し返却
 *
 * @param markdown
 */
exports.removeMarkdown = function (markdown) {
    return remove_markdown_1.default(markdown);
};
