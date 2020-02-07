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
    const INPUT_SCROLL = document.getElementById('input')
    // スクロールのイベント
    INPUT_SCROLL.onscroll = (e) => {
      const HEIGHT = INPUT_SCROLL.scrollTop
      this.handleScroll(HEIGHT)
    }
    // キー入力のイベント
    INPUT_SCROLL.onkeydown = (e) => {
      const HEIGHT = INPUT_SCROLL.scrollTop
      this.handleScroll(HEIGHT)
    }
  },
  watch: {
    // vuexのテキスト変更の監視(親コンポーネントから受け取る)
    fileText () {
      this.inputData = this.fileText
    },
    // 入力が変化したらプレビューに反映
    inputData () {
      this.$emit('update-text', this.inputData)
    }
  },
  methods: {
    // 親コンポーネントに現在のスクロールバーの高さを通知
    handleScroll (position) {
      this.$emit('scroll-sync', position)
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
