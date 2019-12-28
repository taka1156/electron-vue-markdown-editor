<template>
  <div class="MarkdownSlide">
    <h2>Slide</h2>
    <div id="expandSlide" 
      @keydown.exact.esc="isExpandSlide = false" 
      @keydown.shift.78="nextPage()" 
      @keydown.shift.80="prevPage()"
    >
      <markdown-it-vue
        class="md-markdown slide-area border"
        :class="{'expand-slide':isExpandSlide}"
        :content="slide"
        :options="options"
      />
      <div class="d-flex flex-row border">
          <button 
            class="slide-navi-btn"
            @click="prevPage()"
          >&lt;</button>
          <button 
            class="slide-navi-btn"
            @click="nextPage()"
          >&gt;</button>
          <button 
            class="slide-navi-btn" 
            @click="expandSlide()"
          >「」</button>
          {{ maxPage-(maxPage-page-1) }}/{{ maxPage }}
          <input type="range" v-model="page" class="custom-range slide-navi-range" min="0" :max="maxPage-1" step="1" />
      </div>
    </div>
  </div>
</template>

<script>
import markdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

function ElementRequestFullscreen (element) {
  if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen()
    return true
  }
  return false
}

function DocumentExitFullscreen (document) {
  if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
    return true
  }
  return false
}

export default {
  name: 'MarkdownSlide',
  components: {
    markdownItVue
  },
  props: {
    markdownText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      page: 0,
      slideData: null,
      isExpandSlide: false,
      options: {
        markdownIt: {
          injected: true,
          breaks: true,
          html: true,
          linkify: true
        }
      }
    }
  },
  watch: {
    markdownText () {
      this.makeSilde()
    }
  },
  computed: {
    maxPage () {
      if (this.slideData === null) return 0
      return this.slideData.length
    },
    slide () {
      if (this.slideData === null) return ''
      return this.slideData[this.page]
    }
  },
  methods: {
    prevPage () {
      this.page = Math.max(this.page - 1, 0)
    },
    nextPage () {
      this.page = Math.min(this.page + 1, this.maxPage - 1)
    },
    makeSilde () {
      let buff = '' + this.markdownText
      this.slideData = buff.split('---')
    },
    expandSlide () {
      this.isExpandSlide = !this.isExpandSlide
      if (this.isExpandSlide) {
        ElementRequestFullscreen(document.getElementById('expandSlide'))
      } else {
        DocumentExitFullscreen(document)
      }
    }
  }
}
</script>

<style scoped>
.slide-area {
  height: 66vh;
  background-color:white; 
  overflow-y: scroll;
}

.slide-navi-btn{
  appearance: none;
  font-size: 10px;
  border-radius: 10px; 
  background-color: cornflowerblue
}

input[type=range]::-webkit-slider-thumb {
  background-color: cornflowerblue
}

.expand-slide{
  height: 90vh;
  width: 100vw;
}
</style>
