<template>
  <div id="wrapper">
    <main>
      <h1>MarkDown Editor</h1>
      <hr />
      <div class="d-flex flex-row-reverse">
        <button class=" btn btn-light" @click="isChangeDisplay = !isChangeDisplay">
          {{ changeBtn }}に切り替え
        </button>
        <div v-if="fileText">
          <button class=" btn btn-light" @click="overwriteText()">
            上書き保存
          </button>
        </div>
        <button class=" btn btn-light" @click="saveText()">
          保存
        </button>
        <button class=" btn btn-light" @click="initText(true)">
          新規
        </button>
      </div>
      <div class="mt-2 h-75" @keydown.ctrl.83="overwriteText()">
        <InputArea
         class="float-left col-6"
         :isInit="isInit"
         :status="status"
         :fileText="fileText"
         @initText="initText"
         @updateText="updateText"
         @scrollSync="scrollSync"
        />
        <div v-show="!isChangeDisplay">
          <PreviewArea class="float-right col-6" :markdownText="textData" :scrTop="scrTop" />
        </div>
        <div v-show="isChangeDisplay">
          <MarkdownSlide class="float-right col-6" :markdownText="textData" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import InputArea from './parts/InputArea'
import PreviewArea from './parts/PreviewArea'
import MarkdownSlide from './parts/MarkdownSlide'

export default {
  name: 'editor',
  components: {
    InputArea,
    PreviewArea,
    MarkdownSlide
  },
  data () {
    return {
      textData: '',
      scrTop: 0,
      isChangeDisplay: false,
      isInit: false
    }
  },
  computed: {
    // ボタンのテキストを状態に合わせて変更
    changeBtn () {
      if (this.isChangeDisplay) {
        return 'プレビュー'
      } else {
        return 'スライド'
      }
    },
    // vuexにfileがないか確認(あればfile画面からの遷移)
    fileText () {
      return this.$store.getters.mdText
    },
    status () {
      return this.$store.getters.status
    }
  },
  methods: {
    // スクロールバーの高さ
    scrollSync (scrTop) {
      this.scrTop = scrTop
    },
    // 初期化
    initText (status) {
      this.isInit = status
      if (status) this.$store.dispatch('initFile')
    },
    // 入力欄からのデータ通知
    // 入力内容
    updateText (updateText) {
      this.textData = updateText
    },
    // 新規保存
    saveText () {
      if (this.textData === '') {
        alert('テキストが空欄の状態での保存はできません')
        return
      }
      this.$store.dispatch('saveFile', this.textData)
    },
    // 上書き保存
    overwriteText () {
      if (this.textData === '') {
        alert('テキストが空欄の状態での保存はできません')
        return
      }
      this.$store.dispatch('overwriteFile', this.textData)
    }
  }
}
</script>
