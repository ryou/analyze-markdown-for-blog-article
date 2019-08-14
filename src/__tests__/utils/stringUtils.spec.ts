/*
 * TODO: Jestのグローバルでエラー出さないためのコメント
 *  ちゃんと補完が効く形にするか、~.spec.tsのみglobalを設定するかとかで対応したい
 */
/* global describe, test, expect */
import {
    joinStringArrayWithNewLine,
    markdownToHtml,
    removeMarkdown,
    splitStringByLength,
    stringToArrayByLine,
} from '../../utils/stringUtils'

describe('stringToArrayByLine', () => {
    test('複数行の文字列が改行毎に配列化されている', () => {
        const result = stringToArrayByLine('sample\n\nstring\n')
        expect(result).toEqual(['sample', '', 'string', ''])
    })

    test('空文字が渡された際に空文字だけ入っている配列が返却される', () => {
        const result = stringToArrayByLine('')
        expect(result).toEqual([''])
    })
})

describe('joinStringArrayWithNewLine', () => {
    test('文字列配列が改行コードで結合されている', () => {
        const result = joinStringArrayWithNewLine(['sample', '', 'string', ''])
        expect(result).toEqual('sample\n\nstring\n')
    })
})

describe('splitStringByLength', () => {
    test('ASCII文字が正常に分割されていることを確認', () => {
        const result = splitStringByLength('1234abcd+-*/=~', 4)
        expect(result).toEqual(['1234', 'abcd', '+-*/', '=~'])
    })

    test('日本語文字が正常に分割されていることを確認', () => {
        const result = splitStringByLength('あいうえカキクケｻｼｽｾ月火', 4)
        expect(result).toEqual(['あいうえ', 'カキクケ', 'ｻｼｽｾ', '月火'])
    })
})

describe('markdownToHtml', () => {
    test('とりあえず変換されているか確認', () => {
        const result = markdownToHtml('# hoge')
        expect(result).toBe('<h1>hoge</h1>\n')
    })
})

describe('removeMarkdown', () => {
    test('大見出しが取り除かれている', () => {
        const result = removeMarkdown('# hoge')
        expect(result).toBe('hoge')
    })

    test('リンクから文字のみ抽出される', () => {
        const result = removeMarkdown('[リンク文字列](http://example.com)')
        expect(result).toBe('リンク文字列')
    })
})
