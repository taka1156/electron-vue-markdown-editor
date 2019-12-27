<template>
  <div class="PreviewArea">
    <h2>Preview</h2>
    <markdown-it-vue class="md-body preview-area border" :content="markdownText" :options="options" />
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
      default: null
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
  height:80vh;
  overflow-y: scroll;
}
</style>
