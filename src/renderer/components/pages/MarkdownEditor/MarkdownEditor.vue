<template>
  <div id="wrapper">
    <main>
      <h1>MarkDown Editor</h1>
      <hr />
      <button class="btn btn-light" @click="isChangeDisplay = !isChangeDisplay">
        {{ changeBtn }}に切り替え
      </button>
      <InputArea class="float-left col-6" @updateText="updateText" />
      <div v-show="!isChangeDisplay">
        <PreviewArea class="float-right col-6" :markdownText="textData" />
      </div>
      <div v-show="isChangeDisplay">
        <MarkdownSlide class="float-right col-6" :markdownText="textData" />
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
      textData: null,
      isChangeDisplay: false
    }
  },
  computed: {
    changeBtn () {
      if (this.isChangeDisplay) {
        return 'プレビュー'
      } else {
        console.log(this.isChangeDisplay)
        return 'スライド'
      }
    }
  },
  methods: {
    updateText (updateText) {
      this.textData = updateText
    }
  }
}
</script>
