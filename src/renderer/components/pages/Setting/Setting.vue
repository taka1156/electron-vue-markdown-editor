<template>
    <div class="Setting">
      <h1>Setting</h1>
      <hr />
      <form>
        <fieldset class="ml-4 col-11">
          <legend>エディタ設定</legend>
          <div class="custom-control custom-switch">
            <input type="checkbox" v-model="userSetting.isAutoSave" class="custom-control-input" id="autoSave">
            <label class="custom-control-label" for="autoSave">オートセーブ</label>
          </div>
          <div class="mt-2 d-flex flex-row">
            <select class="col-2" v-model="userSetting.saveInterval" id="saveInterval">
                <option v-for="second in [10000, 15000, 20000, 25000, 30000]" :key="second" :value="second">
                  {{ second/1000 }}秒
                </option>
            </select>
            <label class="ml-2" for="saveInterval">オートセーブのインターバル(S)</label>
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
        isAutoSave: false,
        saveInterval: 0
      }
    }
  },
  mounted () {
    this.$store.dispatch('readSetting')
    if (this.initSetting) {
      this.userSetting.isAutoSave = this.initSetting.isAutoSave
      this.userSetting.saveInterval = this.initSetting.saveInterval
    }
  },
  computed: {
    initSetting () {
      return this.$store.getters.userSetting
    }
  },
  methods: {
    saveSetting () {
      localStorage.setItem('userSetting', JSON.stringify(this.userSetting))
      alert(`設定を保存しました。`)
    },
    resetSetting () {
      this.userSetting.isAutoSave = false
      this.userSetting.saveInterval = 0
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