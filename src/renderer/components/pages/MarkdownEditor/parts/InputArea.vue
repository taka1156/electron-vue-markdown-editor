<template>
    <div class="InputArea">
        <h2>Input</h2>
        <textarea 
          id="input"
          class="input-area form-control"
          v-model="inputData"
        ></textarea>
    </div>
</template>

<script>
export default {
  name: 'InputArea',
  props: {
    isInit: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: false
    },
    fileText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      inputData: ''
    }
  },
  mounted () {
    // ページを切り替えてもvuexにファイルがあれば保持
    if (this.status) this.inputData = this.fileText
    // 入力欄とプレビューのスクロールバーの同期
    let input = document.getElementById('input')
    // スクロールのイベント
    input.onscroll = (e) => {
      let posi = input.scrollTop
      this.handleScroll(posi)
    }
    // キー入力のイベント
    input.onkeydown = (e) => {
      let posi = input.scrollTop
      this.handleScroll(posi)
    }
  },
  watch: {
    // フォルダの変更監視
    fileText () {
      this.inputData = this.fileText
    },
    // 入力が変化したらプレビューに反映
    inputData () {
      this.$emit('updateText', this.inputData)
    },
    // 新規の書き込み(初期化)
    isInit () {
      this.inputData = ''
      this.$emit('initText', false)
    }
  },
  methods: {
    // 親コンポーネントに現在のスクロールバーの高さを通知
    handleScroll (posi) {
      this.$emit('scrollSync', posi)
    }
  }
}
</script>

<style scoped>
.input-area {
  resize: none;
  height: 70vh;
}
</style>
