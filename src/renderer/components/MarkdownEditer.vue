<template>
  <div id="wrapper">
    <main>
      <h1>MarkDown Editor</h1>
     <InputArea class="float-left col-6" @updateText="updateText" />
     <PreviewArea class="float-right col-6" v-bind:markdownText="textData" />
    </main>
  </div>
</template>

<script>
  import InputArea from '@/components/LandingPage/InputArea'
  import PreviewArea from '@/components/LandingPage/PreviewArea'

  export default {
    name: 'landing-page',
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

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }
</style>
