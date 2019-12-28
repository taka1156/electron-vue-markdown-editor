<template>
  <div id="wrapper">
    <main>
      <h1>MarkDown Editor</h1>
      <hr />
      <div class="d-flex flex-row-reverse">
        <button class=" btn btn-light" @click="isChangeDisplay = !isChangeDisplay">
          {{ changeBtn }}に切り替え
        </button>
      </div>
      <div class="mt-2 h-75">
        <div v-show="!isExpandSlide">
          <InputArea class="float-left col-6" @updateText="updateText" @scrollSync="scrollSync" />
        </div>
        <div v-show="!isChangeDisplay">
          <PreviewArea class="float-right col-6" :markdownText="textData" :scrTop="scrTop" />
        </div>
        <div v-show="isChangeDisplay">
          <MarkdownSlide 
            :class="{'float-right col-6':!isExpandSlide}" 
            :markdownText="textData"
          />
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
      isExpandSlide: false
    }
  },
  computed: {
    changeBtn () {
      if (this.isChangeDisplay) {
        return 'プレビュー'
      } else {
        return 'スライド'
      }
    }
  },
  methods: {
    updateText (updateText) {
      this.textData = updateText
    },
    expandSlide (isExpandSlide) {
      this.isExpandSlide = isExpandSlide
    },
    scrollSync (scrTop) {
      this.scrTop = scrTop
    }
  }
}
</script>
