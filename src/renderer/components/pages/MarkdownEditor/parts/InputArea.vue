<template>
    <div class="InputArea">
        <h2>Input</h2>
        <textarea class="input-area form-control" v-model="inputData">
        </textarea>
    </div>
</template>

<script>
import SampleMD from '@/components/SmapleMarkdown/SampleMD.js'

export default {
  data () {
    return {
      inputData: ''
    }
  },
  mounted () {
    this.inputData = SampleMD
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
  height: 70vh;
}
</style>
