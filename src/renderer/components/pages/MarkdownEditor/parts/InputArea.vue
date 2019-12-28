<template>
    <div class="InputArea">
        <h2>Input</h2>
        <textarea id="input" class="input-area form-control" @keydown.shift.72="setCheetSheet()" v-model="inputData">
        </textarea>
    </div>
</template>

<script>
import SampleMD from '@/components/SmapleMarkdown/SampleMD.js'
import CheetSheet from '@/components/SmapleMarkdown/CheetSheet.js'

export default {
  name: 'InputArea',
  data () {
    return {
      inputData: ''
    }
  },
  mounted () {
    this.inputData = SampleMD
    let input = document.getElementById('input')
    input.onscroll = (e) => {
      let posi = input.scrollTop
      this.handleScroll(posi)
    }
    input.onkeydown = (e) => {
      let posi = input.scrollTop
      this.handleScroll(posi)
    }
  },
  watch: {
    inputData () {
      this.$emit('updateText', this.inputData)
    }
  },
  methods: {
    handleScroll (posi) {
      this.$emit('scrollSync', posi)
    },
    setCheetSheet () {
      this.inputData = CheetSheet
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
