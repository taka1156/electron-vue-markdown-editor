# vue-md-editer-electron

## vueとelectronを利用したmarkdownエディターを作る。

## 使用したもの
- electron
- vue
- BootStrap(css)

## 実装予定
- [ ] 文字数のカウント
- [ ] 入力補助
- [ ] ファイル一覧
- [ ] Qiita APIと連携して記事投稿

など

## 注意など
- タイトルやプロジェクト名を間違えた場合は、`index.ejs`のtitleタグと`package.json`のproductNameを変える<br>また、すでにインストール済みの場合にはアンインストールすると新規にショートカットが作成される。

## 変更
モジュール名：multispinner<br>
詳細: multispinnerはメンテされてない？(https://github.com/codekirei/node-multispinner/pull/5)<br>
対応: listrを使用(https://github.com/SamVerschueren/listr)<br>
