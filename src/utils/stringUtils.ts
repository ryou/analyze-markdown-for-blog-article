import MarkdownIt from 'markdown-it'
import remove from 'remove-markdown'

// TODO: \nだけでなく、別の改行コードにも対応
/**
 * 文字列を改行コードで分割し配列として返却
 *
 * @param input
 */
export const stringToArrayByLine = (input: string): string[] => {
    return input.split('\n')
}

/**
 * 文字列配列を改行コードを区切り文字として結合
 *
 * @param input
 */
export const joinStringArrayWithNewLine = (input: string[]): string => {
    return input.join('\n')
}

/**
 * 文字列をlength文字毎に分割し配列として返却
 * TODO: サロゲートペア等が正常に処理されない問題の対処
 *
 * @param input
 * @param length
 */
export const splitStringByLength = (
    input: string,
    length: Number
): string[] => {
    const regexPattern = new RegExp(`.{1,${length}}`, 'g')
    const splitArray = input.match(regexPattern)
    if (splitArray === null) {
        // TODO: hogeはちょっと
        throw new Error('hoge')
    }

    return splitArray
}

/**
 * マークダウン文字列をHTMLに変換
 *
 * @param markdown
 */
export const markdownToHtml = (markdown: string): string => {
    const parser = new MarkdownIt()
    return parser.render(markdown)
}

/**
 * マークダウン文字列から文字列情報のみ抽出し返却
 *
 * @param markdown
 */
export const removeMarkdown = (markdown: string): string => {
    return remove(markdown)
}
