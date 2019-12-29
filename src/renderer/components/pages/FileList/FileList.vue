<template>
    <div class="FileList">
      <h1>File</h1>
      <hr />
      <div v-if="isDisplay">
        <h2>FileList:[Documents/{{ folderPath }}]</h2>
        <div class="list-group" v-for="(file, index) in fileList" :key="index">
          <section 
          @click="selectFile(index)" 
          class="mt-2 list-group-item list-group-item-action flex-column"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ file }}</h5>
            </div>
          </section>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Setting',
  data () {
    return {
      folderPath: 'md'
    }
  },
  mounted () {
    // フォルダパスをvuexに設定
    this.$store.dispatch('readFileList', this.folderPath)
  },
  computed: {
    // vuexからファイルリストを取得
    fileList () {
      return this.$store.getters.fileList
    },
    isDisplay () {
      // データ数が0ならファイルを表示しない
      if (this.fileList.length === 0) return false
      return true
    }
  },
  methods: {
    // ファイル選択時の処理
    selectFile (index) {
      this.$store.dispatch('readFile', index)
      this.$router.push('/editor')
    }
  }
}
</script>