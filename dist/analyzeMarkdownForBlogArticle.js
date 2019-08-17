"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var stringUtils_1 = require("./utils/stringUtils");
var takeWhile_1 = __importDefault(require("lodash/takeWhile"));
var dropWhile_1 = __importDefault(require("lodash/dropWhile"));
/**
 * 文字列配列の頭の空行を除去し返却
 *
 * @param stringArray
 */
exports.removeHeadBlankLine = function (stringArray) {
    return dropWhile_1.default(stringArray, function (item) { return item === ''; });
};
/**
 * 引数として渡された文字列配列を、最初にneedleが出てきた点で分割し返却
 *
 * @param stringArray
 * @param needle
 */
exports.splitStringArrayAtFirstItem = function (stringArray, needle) {
    var hasNeedle = stringArray.some(function (item) { return item === needle; });
    if (!hasNeedle) {
        return [stringArray, []];
    }
    var leftItem = takeWhile_1.default(stringArray, function (item) { return item !== needle; });
    // rightNeedleはrightItemを取得するためだけに必要なのでno-unused-varsで警告出させない
    // eslint-disable-next-line no-unused-vars
    var _a = dropWhile_1.default(stringArray, function (item) { return item !== needle; }), rightNeedle = _a[0], rightItem = _a.slice(1);
    return [leftItem, rightItem];
};
/**
 * 行ごとに分割し配列化されたマークダウン文字列から、Frontmatterと本文を分けて返却する
 *
 * @param markdownArray
 */
exports.extractFrontmatters = function (markdownArray) {
    var FRONTMATTER_KEYWORD = '---';
    var firstLine = markdownArray[0], restLines = markdownArray.slice(1);
    if (firstLine !== FRONTMATTER_KEYWORD) {
        return {
            frontmatters: {},
            contentMarkdownArray: markdownArray,
        };
    }
    var _a = exports.splitStringArrayAtFirstItem(restLines, FRONTMATTER_KEYWORD), frontmatterStringArray = _a[0], contentMarkdownArray = _a[1];
    var frontmatters = {};
    frontmatterStringArray.forEach(function (item) {
        // TODO: Frontmatterの形式に則っていなかった場合の対応が必要
        var _a = item.split(': '), key = _a[0], value = _a[1];
        frontmatters[key] = value;
    });
    return {
        frontmatters: frontmatters,
        contentMarkdownArray: contentMarkdownArray,
    };
};
// TODO: テストのためだけにexportする必要があるのなんとかならんか？
/**
 * previewを算出し返却
 *
 * @param bodyMarkdown
 * @param previewLength
 */
exports.calcPreviewFromBodyMarkdown = function (bodyMarkdown, previewLength) {
    var bodyText = stringUtils_1.removeMarkdown(bodyMarkdown.replace(/\n/g, ''));
    if (bodyText.length <= 0) {
        return '';
    }
    return stringUtils_1.splitStringByLength(bodyText, previewLength)[0];
};
/**
 * マークダウン文字列をブログ記事として扱いやすい形に分解する
 *
 * @param markdown
 * @param option
 */
exports.analyzeMarkdownForBlogArticle = function (markdown, option) {
    if (option === void 0) { option = { previewLength: null }; }
    var markdownArray = stringUtils_1.stringToArrayByLine(markdown);
    var _a = exports.extractFrontmatters(markdownArray), frontmatters = _a.frontmatters, contentMarkdownArray = _a.contentMarkdownArray;
    var _b = exports.removeHeadBlankLine(contentMarkdownArray), titleMarkdown = _b[0], bodyMarkdownArray = _b.slice(1);
    var title = stringUtils_1.removeMarkdown(titleMarkdown);
    var bodyMarkdown = stringUtils_1.joinStringArrayWithNewLine(bodyMarkdownArray);
    var bodyHtml = stringUtils_1.markdownToHtml(bodyMarkdown);
    var preview = option.previewLength !== null
        ? exports.calcPreviewFromBodyMarkdown(bodyMarkdown, option.previewLength)
        : null;
    return {
        frontmatters: frontmatters,
        title: title,
        bodyHtml: bodyHtml,
        preview: preview,
    };
};
