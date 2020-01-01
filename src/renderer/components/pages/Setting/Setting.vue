<template>
    <div class="Setting">
      <h1>Setting</h1>
      <hr />
      <form>
        <fieldset class="ml-4 col-11 border">
          <legend>エディタ設定</legend>
          <div class="custom-control custom-switch">
            <input type="checkbox" v-model="isAutoSave" class="custom-control-input" id="autoSave">
            <label class="custom-control-label" for="autoSave">オートセーブ</label>
          </div>
        </fieldset>
        <fieldset class="ml-4 col-11 border">
          <legend>スライド設定</legend>
          <div class="custom-control custom-switch">
            <input type="checkbox" v-model="isSetName" class="custom-control-input" id="setName">
            <label class="custom-control-label" for="setName">ユーザーネーム</label>
          </div>
          <div class="custom-control custom-switch">
            <input type="checkbox" v-model="isSetCover" class="custom-control-input" id="setCover">
            <label class="custom-control-label" for="setCover">表紙設定</label>
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
      isAutoSave: false,
      isSetName: false,
      isSetCover: false,
      userSetting: {
        autoSave: null,
        setName: null,
        setCover: null
      }
    }
  },
  mounted () {
    // 現在の設定を反映
    let userSetting = localStorage.getItem('userSetting');
    if (userSetting) {
      const setting = JSON.parse(userSetting)
      this.userSetting.autoSave = setting.autoSave
      this.userSetting.setName = setting.setName
      this.userSetting.setCover = setting.setCover
    }
  },
  methods: {
    saveSetting () {
      this.userSetting.AutoSave = this.isAutoSave
      this.userSetting.SetName = this.isSetName
      this.userSetting.setCover = this.isSetCover
      // localStorage.setItem('userSetting', JSON.stringify(this.userSetting))
    },
    resetSetting () {
      this.isAutoSave = false
      this.isSetName = false
      this.isSetCover = false
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