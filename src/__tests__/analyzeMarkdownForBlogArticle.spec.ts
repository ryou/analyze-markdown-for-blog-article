/*
 * TODO: Jestのグローバルでエラー出さないためのコメント
 *  ちゃんと補完が効く形にするか、~.spec.tsのみglobalを設定するかとかで対応したい
 */
/* global describe, test, expect */

import {
    analyzeMarkdownForBlogArticle,
    calcPreviewFromBodyMarkdown,
    extractFrontmatters,
    removeHeadBlankLine,
    splitStringArrayAtFirstItem,
} from '../analyzeMarkdownForBlogArticle'

describe('removeHeadBlankLine', () => {
    test('頭の空行が除去されることを確認', () => {
        const result = removeHeadBlankLine(['', '', '# title', ''])
        expect(result).toEqual(['# title', ''])
    })

    test('頭に空行が無い場合は何も除去されないことを確認', () => {
        const result = removeHeadBlankLine(['# title', ''])
        expect(result).toEqual(['# title', ''])
    })
})

describe('splitStringArrayAtFirstItem', () => {
    test('最初のneedleで分割されることを確認', () => {
        const result = splitStringArrayAtFirstItem(
            [
                'created_at: 2019-08-14',
                'author: ryou',
                '---',
                '',
                '# title',
                '---',
                '',
            ],
            '---'
        )
        expect(result).toEqual([
            ['created_at: 2019-08-14', 'author: ryou'],
            ['', '# title', '---', ''],
        ])
    })
})

describe('extractFrontmatters', () => {
    test('frontmatterの抽出が正常にできている', () => {
        const result = extractFrontmatters([
            '---',
            'created_at: 2019-08-14',
            'author: ryou',
            '---',
            '# title',
            '',
        ])
        expect(result).toEqual({
            frontmatters: {
                created_at: '2019-08-14',
                author: 'ryou',
            },
            contentMarkdownArray: ['# title', ''],
        })
    })

    test('frontmatterが無い場合も正常動作する', () => {
        const result = extractFrontmatters(['# title', ''])
        expect(result).toEqual({
            frontmatters: {},
            contentMarkdownArray: ['# title', ''],
        })
    })
})

describe('calcPreviewFromBodyMarkdown', () => {
    test('previewの算出が正常にできている', () => {
        const result = calcPreviewFromBodyMarkdown('## hoge\nfugafuga', 10)
        expect(result).toBe('hogefugafu')
    })
})

describe('analyzeMarkdownForBlogArticle', () => {
    describe('frontmatterありパターン', () => {
        test('一般的なパターン', () => {
            const result = analyzeMarkdownForBlogArticle(
                '---\ncreated_at: 2019-08-14\n---\n\n# title\n## hoge\nfugafuga\n',
                { previewLength: 10 }
            )
            expect(result).toEqual({
                frontmatters: {
                    created_at: '2019-08-14',
                },
                title: 'title',
                bodyHtml: '<h2>hoge</h2>\n<p>fugafuga</p>\n',
                preview: 'hogefugafu',
            })
        })
    })

    describe('frontmatterなしパターン', () => {
        test('タイトルを正常に取得できている', () => {
            const result = analyzeMarkdownForBlogArticle('# title\n## hoge\n')
            expect(result).toEqual({
                frontmatters: {},
                title: 'title',
                bodyHtml: '<h2>hoge</h2>\n',
                preview: null,
            })
        })

        test('タイトルしかないパターン', () => {
            const result = analyzeMarkdownForBlogArticle('# title', {
                previewLength: 10,
            })
            expect(result).toEqual({
                frontmatters: {},
                title: 'title',
                bodyHtml: '',
                preview: '',
            })
        })

        test('previewを正常に算出できている', () => {
            const result = analyzeMarkdownForBlogArticle(
                '# title\n## hoge\nfugafuga\n',
                { previewLength: 10 }
            )
            expect(result).toEqual({
                frontmatters: {},
                title: 'title',
                bodyHtml: '<h2>hoge</h2>\n<p>fugafuga</p>\n',
                preview: 'hogefugafu',
            })
        })
    })
})
