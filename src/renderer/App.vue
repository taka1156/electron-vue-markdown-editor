<template>
  <div id="app">
    <div class="d-flex justify-content-between">
      <NaviBar />
      <router-view class="col-11" />
    </div>
  </div>
</template>

<script>
  import NaviBar from '@/components/Navi/NaviBar'

  export default {
    name: 'vue-md-editer-electron',
    components: {
      NaviBar
    }
  }
</script>

<style>
  /* CSS */
</style>
