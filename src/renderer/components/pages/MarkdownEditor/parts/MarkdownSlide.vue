<template>
  <div class="MarkdownSlide">
    <h2>Slide</h2>
    <markdown-it-vue
      class="slide-area border"
      :content="slideDisplay"
      :options="options"
    />
    <div class="d-flex justify-content-around">
        <button @click="prevPage()">&lt;</button>
        {{ page + 1 }}/{{ maxPage }}
        <button @click="nextPage()">&gt;</button>
    </div>
  </div>
</template>

<script>
import markdownItVue from 'markdown-it-vue'

export default {
  name: 'MarkdownSlide',
  components: {
    markdownItVue
  },
  props: {
    markdownText: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      page: 0,
      slide: null,
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
      return this.slide.length
    },
    slideDisplay () {
      if (this.slide === null) return null
      return this.slide[this.page]
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
      if (this.markdownText === null) return null
      let buff = '' + this.markdownText
      this.slide = buff.split('---')
      console.log('value=>' + this.slide + 'len=>' + this.slide.length)
    }
  }
}
</script>

<style scoped>
.slide-area {
  height:50vh;
  overflow-y: scroll;
}
</style>
