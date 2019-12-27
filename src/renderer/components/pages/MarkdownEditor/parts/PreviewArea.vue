<template>
  <div class="PreviewArea">
    <h2>Preview</h2>
    <markdown-it-vue class="md-markdown preview-area border" :content="markdownText" :options="options" />
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
  }
}
</script>

<style scoped>
.preview-area {
  height: 70vh;
  overflow-y: scroll;
}
</style>
