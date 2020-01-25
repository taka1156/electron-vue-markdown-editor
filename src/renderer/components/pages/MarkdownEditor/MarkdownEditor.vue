<template>
  <div id="wrapper">
    <main>
      <h1>MarkDown Editor</h1>
      <hr />
      <div class="d-flex flex-row-reverse">
        <button class=" btn btn-light" @click="isChangeDisplay = !isChangeDisplay">
          {{ changeBtn }}に切り替え
        </button>
        <div v-if="status">
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
      <div class="mt-2 h-75" @keydown.ctrl.83="shortcutSave()">
        <InputArea
         class="float-left col-6"
         id="inputArea"
         :isInit="isInit"
         :fileText="fileText"
         @initText="initText"
         @updateText="updateText"
         @scrollSync="scrollSync"
        />
        <div v-show="!isChangeDisplay">
          <PreviewArea class="float-right col-6" :markdownText="fileText" :scrTop="scrTop" />
        </div>
        <div v-show="isChangeDisplay">
          <MarkdownSlide class="float-right col-6" :markdownText="fileText" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import InputArea from './parts/InputArea'
import PreviewArea from './parts/PreviewArea'
import MarkdownSlide from './parts/MarkdownSlide'

let timer

export default {
  name: 'editor',
  components: {
    InputArea,
    PreviewArea,
    MarkdownSlide
  },
  data () {
    return {
      scrTop: 0,
      isChangeDisplay: false,
      isInit: false
    }
  },
  mounted () {
    this.$store.dispatch('readSetting')
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
    // vuexからテキスト情報を取得
    fileText () {
      return this.$store.getters.mdText
    },
    // 保存前のテキスト
    preText () {
      return this.$store.getters.preText
    },
    // vuexにfileがあるか状態確認
    status () {
      return this.$store.getters.status
    },
    userSetting () {
      return this.$store.getters.userSetting
    }
  },
  methods: {
    // スクロールバーの高さ
    scrollSync (scrTop) {
      this.scrTop = scrTop
    },
    // 初期化
    initText () {
      this.$store.dispatch('initFile')
    },
    // 入力欄からのvuexにデータを渡す
    updateText (updateText) {
      this.$store.commit('setmdText', updateText)
      if (this.userSetting.isAutoSave) {
        document.getElementById('inputArea').addEventListener('mousedown', this.autoSave())
        document.getElementById('inputArea').addEventListener('keypress', this.autoSave())
      }
    },
    shortcutSave () {
      if (this.status) {
        this.overwriteText()
      } else {
        this.saveText()
      }
    },
    // オートセーブ
    autoSave () {
      clearTimeout(timer)
      if (this.status && this.fileText !== this.preText) {
        this.restartTimer()
      }
    },
    restartTimer () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.overwriteText()
      }, this.userSetting.saveInterval)
    },
    // 新規保存
    saveText () {
      if (this.fileText === '') {
        alert('テキストが空欄の状態での保存はできません')
        return
      }
      this.$store.dispatch('saveFile')
    },
    // 上書き保存
    overwriteText () {
      if (this.fileText === '') {
        alert('テキストが空欄の状態での保存はできません')
        return
      }
      this.$store.dispatch('overwriteFile')
    }
  }
}
</script>
