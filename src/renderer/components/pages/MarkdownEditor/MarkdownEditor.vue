<template>
  <div id="wrapper">
    <main>
      <h1>MarkDown Editor</h1>
      <hr>
      <InputArea class="float-left col-6" @updateText="updateText" />
      <PreviewArea class="float-right col-6" v-bind:markdownText="textData" />
    </main>
  </div>
</template>

<script>
  import InputArea from './parts/InputArea'
  import PreviewArea from './parts/PreviewArea'
  
  export default {
    name: 'editer',
    components: {
      InputArea,
      PreviewArea
    },
    data () {
      return {
        textData: null
      }
    },
    methods: {
      updateText (updateText) {
        this.textData = updateText
      }
    }
  }
</script>
