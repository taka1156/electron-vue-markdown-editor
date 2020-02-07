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
    // ページを切り替えてもvuexにテキストがあれば保持
    this.inputData = this.fileText
    // 入力欄とプレビューのスクロールバーの同期
    let inputScroll = document.getElementById('input')
    // スクロールのイベント
    inputScroll.onscroll = (e) => {
      const HEIGHT = inputScroll.scrollTop
      this.handleScroll(HEIGHT)
    }
    // キー入力のイベント
    inputScroll.onkeydown = (e) => {
      const HEIGHT = inputScroll.scrollTop
      this.handleScroll(HEIGHT)
    }
  },
  watch: {
    // フォルダの変更監視(初期化など)
    fileText () {
      this.inputData = this.fileText
    },
    // 入力が変化したらプレビューに反映
    inputData () {
      this.$emit('updateText', this.inputData)
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
