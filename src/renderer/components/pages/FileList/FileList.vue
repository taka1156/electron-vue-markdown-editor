<template>
    <div class="FileList">
      <h1>File</h1>
      <hr />
      <h2>FileList:[{{ folderPath }}]</h2>
      <div class="d-flex flex-row-reverse">
        <button class=" btn btn-light" @click="selectFolder()">
          フォルダ参照
        </button>
      </div>
      <div v-if="isDisplay">
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
      <div v-else>
        拡張子がmdのファイルがありません。
      </div>
    </div>
</template>

<script>
export default {
  name: 'FileList',
  mounted () {
    this.$store.dispatch('readFileList')
  },
  computed: {
    // vuexからフォルダパスを取得
    folderPath () {
      return this.$store.getters.folderPath
    },
    // vuexからファイルリストを取得
    fileList () {
      return this.$store.getters.fileList
    },
    isDisplay () {
      // ファイル数が0ならファイルを表示しない
      if (this.fileList.length === 0) return false
      return true
    }
  },
  methods: {
    // ファイル選択時の処理
    selectFile (index) {
      this.$store.dispatch('readFile', index)
      this.$router.push('/editor')
    },
    selectFolder () {
      this.$store.dispatch('selectFolder')
    }
  }
}
</script>