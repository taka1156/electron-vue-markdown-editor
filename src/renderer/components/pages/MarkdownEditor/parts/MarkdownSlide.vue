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
import genSlide from '@/components/js/GenSlide.js'
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
  mounted () {
    this.slideData = this.makeSilde()
  },
  watch: {
    markdownText () {
      this.slideData = this.makeSilde()
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
    // ページネーション
    prevPage () {
      if (this.slideData === null) return
      this.page = Math.max(this.page - 1, 0)
    },
    nextPage () {
      if (this.slideData === null) return
      this.page = Math.min(this.page + 1, this.maxPage - 1)
    },
    // スライドの生成
    makeSilde () {
      if (this.markdownText === '') return null
      const SLIDE_DATA = genSlide.generateSlide(this.markdownText)
      return SLIDE_DATA.split(/^---|\*\*\*$/gm)
    },
    // スライドのフルスクリーン化
    expandSlide () {
      this.isExpandSlide = !this.isExpandSlide
      if (this.isExpandSlide) {
        document.getElementById('expandSlide').webkitRequestFullScreen()
      } else {
        document.webkitExitFullscreen()
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