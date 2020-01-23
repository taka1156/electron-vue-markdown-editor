const DEFAULT_STYLE =
`<style>
  /* フルスクリーンを使用する場合は、\n単位に\`rem\`、\`em\`や、\`%\`を使用してください */
  /* 全体のレイアウト */
  .slide-cover {
    text-align: center;
  }
  /* テーマのレイアウト */
  .slide-theme{
    padding-top: 25%;
    font-size: 2rem;
  }
  /* 下線のレイアウト */
  .slide-border{
    width: 80%;
    margin: 0 auto;
    border: solid 1px whitesmoke;
  }
  /* 作成者の名前のレイアウト */
  .edit-user{
    font-size: 17px;
  }
</style>
`

export default {
  generateSlide (text, userStyle = DEFAULT_STYLE) {
    const SLIDE_TITLE = /title:{(.*?)}/.exec(text)[1] || '名無しのタイトル'
    const EDITOR_NAME = /name:{(.*?)}/.exec(text)[1] || '名無しさん'
    const DEFAULT_THEME = `<div class="slide-theme">${SLIDE_TITLE}<div class="slide-border" ></div></div>`
    const DEFAULT_USER = `<small class="edit-user">${EDITOR_NAME}</small>`
    const DEFAULT_HTML = `<div class="slide-cover">${DEFAULT_THEME}${DEFAULT_USER}</div>`
    return DEFAULT_HTML + userStyle + '\n---\n'.concat(text.replace(/(title:{(.*?)}|name:{(.*?)})/g, ''))
  },
  DEFAULT_STYLE
}
