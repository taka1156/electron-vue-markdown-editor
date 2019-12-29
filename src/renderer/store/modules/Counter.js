const { app, dialog } = require('electron').remote
const fs = require('fs')

const state = {
  fileList: [],
  status: false, // ファイルが存在するかどうか
  mdText: '',
  filePath: '',
  docPath: ''
}

const getters = {
  fileList (state) {
    return state.fileList
  },
  mdText (state) {
    return state.mdText
  },
  filePath (state) {
    return state.filePath
  },
  status (state) {
    return state.status
  }
}

const mutations = {
  setDocPath (state, docPath) {
    state.docPath = docPath
  },
  // ファイル一覧を取得
  setFileList (state, fileList) {
    state.fileList = fileList
  },
  // ファイルのテキスト情報を取得
  setmdText (state, mdText) {
    state.mdText = mdText
  },
  // ファイルのパス情報を取得
  setFilePath (state, filePath) {
    state.filePath = filePath
  },
  changeStatus (state, status) {
    state.status = status
  }
}

const actions = {
  readFileList (context, folderPath) {
    // ファイルパスの設定
    const DOC = `${app.getPath('documents')}\\${folderPath}`

    fs.access(DOC, function (err) {
      if (err) {
        if (err.code === 'ENOENT') {
          // フォルダがなければ作成
          fs.mkdir(DOC, function (err) {
            if (err) alert(err)
            else {
              alert(`${DOC}に初期フォルダを作成しました。`)
            }
          })
        }
      }
    })
    context.commit('setDocPath', DOC)
    // ファイル一覧の取得
    fs.readdir(DOC, function (err, files) {
      if (err) alert(err)
      let fileList = files.filter(function (file) {
        return /.*\.md$/.test(file)
      })
      context.commit('setFileList', fileList)
    })
  },
  readFile (context, index) {
    const FILE_PATH = `${context.state.docPath}\\${context.state.fileList[index]}`
    if (context.state.filePath === FILE_PATH) {
      alert('すでに開いています。')
      return
    }
    // ファイルの読み込み
    fs.readFile(FILE_PATH, 'utf8', (error, text) => {
      if (error) {
        alert(error)
      } else {
        context.commit('setmdText', text)
        context.commit('setFilePath', FILE_PATH)
        context.commit('changeStatus', true)
      }
    })
  },
  initFile (context) {
    // ファイル情報初期化
    context.commit('setmdText', '')
    context.commit('setFilePath', '')
    context.commit('changeStatus', false)
  },
  saveFile (context, textData) {
    // 新規保存
    const DEFAULT = `${app.getPath('documents')}\\md`
    const FILE_PATH = dialog.showSaveDialog({
      title: 'Save as',
      defaultPath: DEFAULT,
      filters: [
        {
          name: 'markdown',
          extensions: ['md']
        }
      ]
    })
    if (FILE_PATH) {
      fs.writeFileSync(FILE_PATH, textData)
      context.commit('setmdText', textData)
      context.commit('setFilePath', FILE_PATH)
      context.commit('changeStatus', true)
      alert('保存しました。')
    }
  },
  overwriteFile (context, textData) {
    // 上書き保存
    if (context.state.filePath === '') return
    const FILE_PATH = context.state.filePath
    if (FILE_PATH) {
      fs.writeFileSync(FILE_PATH, textData)
      alert('保存しました。')
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
