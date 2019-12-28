<template>
  <div class="PreviewArea">
    <h2>Preview</h2>
    <markdown-it-vue 
      id="preview"
      class="md-markdown preview-area border"
      :content="markdownText"
      :options="options"
    />
  </div>
</template>

<script>
import markdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

export default {
  components: {
    markdownItVue
  },
  props: {
    markdownText: {
      type: String,
      default: ''
    },
    scrTop: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
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
    scrTop () {
      let preview = document.getElementById('preview')
      preview.scrollTop = this.scrTop
    }
  }
}
</script>

<style scoped>
.preview-area {
  height: 70vh;
  overflow-y: scroll;
}
</style>
