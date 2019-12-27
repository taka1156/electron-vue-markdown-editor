<template>
    <div class="InputArea">
        <h2>Input</h2>
        <textarea class="input-area form-control" v-model="inputData">
        </textarea>
    </div>
</template>

<script>
import MarkDownSample from '@/components/SmapleMarkdown/SampleMD.js'

export default {
  data () {
    return {
      inputData: null
    }
  },
  mounted () {
    this.inputData = MarkDownSample
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
  height:80vh;
}
</style>
