<template>
    <div class="InputArea">
        <h2>Input</h2>
        <textarea class="input-area form-control" v-model="inputData">
        </textarea>
    </div>
</template>

<script>
export default {
  data () {
    return {
      inputData: null
    }
  },
  mounted () {
    this.inputData = '# こんにちは\nvueとelectronを利用して作成したmarkdownエディターです。\n## 主な機能\n- 保存、読み込み\n- プレビュー\n- Qiita連携\nを検討しています。\n\nもし何かわからないことがあれば[コチラ](https://twitter.com/taka_Program)まで'
  },
  watch: {
    inputData () {
      this.$emit('updateText', this.inputData)
    }
  }
}
</script>

<style scoped>
.input-area {
  height:90vh;
}
</style>
