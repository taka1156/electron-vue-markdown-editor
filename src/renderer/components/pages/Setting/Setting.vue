<template>
    <div class="Setting">
      <h1>Setting</h1>
      <hr />
      <form>
        <fieldset class="ml-4 col-11 border">
          <legend>エディタ設定</legend>
          <div class="custom-control custom-switch">
            <input type="checkbox" v-model="userSetting.isAutoSave" class="custom-control-input" id="autoSave">
            <label class="custom-control-label" for="autoSave">オートセーブ</label>
          </div>
        </fieldset>
        <div class="mx-auto mt-3 col-8 d-flex justify-content-between">
            <button type="button" class="btn col-5" @click="resetSetting()">Reset</button>
            <button type="button" class="btn col-5" @click="saveSetting()">OK</button>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  name: 'Setting',
  data () {
    return {
      userSetting: {
        isAutoSave: false
      }
    }
  },
  mounted () {
    // 現在の設定を反映
    const SETTING = localStorage.getItem('userSetting')
    if (SETTING) {
      const SETTING_JSON = JSON.parse(SETTING)
      this.userSetting.isAutoSave = SETTING_JSON.isAutoSave
    }
  },
  methods: {
    saveSetting () {
      alert(this.userSetting.isAutoSave)
      // localStorage.setItem('userSetting', JSON.stringify(this.userSetting))
    },
    resetSetting () {
      this.userSetting.isAutoSave = false
      this.saveSetting()
    }
  }
}
</script>

<style scoped>
  .btn{
    background-color: cornflowerblue 
  }
</style>