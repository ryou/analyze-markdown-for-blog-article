import {
    joinStringArrayWithNewLine,
    markdownToHtml,
    removeMarkdown,
    splitStringByLength,
    stringToArrayByLine,
} from './utils/stringUtils'
import takeWhile from 'lodash/takeWhile'
import dropWhile from 'lodash/dropWhile'

interface Frontmatter {
    key: string
    value: string
}

interface AnalyzeOption {
    previewLength: Number | null
}

interface AnalyzedData {
    frontmatters: Frontmatter[]
    title: string
    bodyHtml: string
    preview: string | null
}

/**
 * 文字列配列の頭の空行を除去し返却
 *
 * @param stringArray
 */
export const removeHeadBlankLine = (stringArray: string[]): string[] => {
    return dropWhile(stringArray, item => item === '')
}

/**
 * 引数として渡された文字列配列を、最初にneedleが出てきた点で分割し返却
 *
 * @param stringArray
 * @param needle
 */
export const splitStringArrayAtFirstItem = (
    stringArray: string[],
    needle: string
) => {
    const hasNeedle = stringArray.some(item => item === needle)
    if (!hasNeedle) {
        return [stringArray, []]
    }

    const leftItem = takeWhile<string>(stringArray, item => item !== needle)
    // rightNeedleはrightItemを取得するためだけに必要なのでno-unused-varsで警告出させない
    // eslint-disable-next-line no-unused-vars
    const [rightNeedle, ...rightItem] = dropWhile<string>(
        stringArray,
        item => item !== needle
    )

    return [leftItem, rightItem]
}

/**
 * 行ごとに分割し配列化されたマークダウン文字列から、Frontmatterと本文を分けて返却する
 *
 * @param markdownArray
 */
export const extractFrontmatters = (
    markdownArray: string[]
): { frontmatters: Frontmatter[]; contentMarkdownArray: string[] } => {
    const FRONTMATTER_KEYWORD = '---'
    const [firstLine, ...restLines] = markdownArray
    if (firstLine !== FRONTMATTER_KEYWORD) {
        return {
            frontmatters: [],
            contentMarkdownArray: markdownArray,
        }
    }

    const [
        frontmatterStringArray,
        contentMarkdownArray,
    ] = splitStringArrayAtFirstItem(restLines, FRONTMATTER_KEYWORD)
    const frontmatters: Frontmatter[] = []
    frontmatterStringArray.forEach(item => {
        // TODO: Frontmatterの形式に則っていなかった場合の対応が必要
        const [key, value] = item.split(': ')
        frontmatters.push({ key, value })
    })

    return {
        frontmatters,
        contentMarkdownArray,
    }
}

// TODO: テストのためだけにexportする必要があるのなんとかならんか？
/**
 * previewを算出し返却
 *
 * @param bodyMarkdown
 * @param previewLength
 */
export const calcPreviewFromBodyMarkdown = (
    bodyMarkdown: string,
    previewLength: Number
) => {
    const bodyText = removeMarkdown(bodyMarkdown.replace('\n', ''))
    if (bodyText.length <= 0) {
        return ''
    }

    return splitStringByLength(bodyText, previewLength)[0]
}

/**
 * マークダウン文字列をブログ記事として扱いやすい形に分解する
 *
 * @param markdown
 * @param option
 */
export const analyzeMarkdownForBlogArticle = (
    markdown: string,
    option: AnalyzeOption = { previewLength: null }
): AnalyzedData => {
    const markdownArray = stringToArrayByLine(markdown)
    const { frontmatters, contentMarkdownArray } = extractFrontmatters(
        markdownArray
    )
    const [titleMarkdown, ...bodyMarkdownArray] = removeHeadBlankLine(
        contentMarkdownArray
    )
    const title = removeMarkdown(titleMarkdown)
    const bodyMarkdown = joinStringArrayWithNewLine(bodyMarkdownArray)
    const bodyHtml = markdownToHtml(bodyMarkdown)
    const preview =
        option.previewLength !== null
            ? calcPreviewFromBodyMarkdown(bodyMarkdown, option.previewLength)
            : null

    return {
        frontmatters,
        title,
        bodyHtml,
        preview,
    }
}
