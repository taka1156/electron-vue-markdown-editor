import CheetSheet from '@/components/js/CheetSheet.js'
const { app, dialog } = require('electron').remote
const fs = require('fs')

const state = {
  folderPath: `${app.getPath('documents')}/md`,
  fileList: [],
  status: false, // ファイルが存在するかどうか
  mdText: '',
  filePath: ''
}

const getters = {
  // フォルダ情報
  folderPath (state) {
    return state.folderPath
  },
  fileList (state) {
    return state.fileList
  },
  // ファイルの情報
  status (state) {
    return state.status
  },
  mdText (state) {
    return state.mdText
  },
  filePath (state) {
    return state.filePath
  }
}

const mutations = {
  // ファイル一覧を取得
  setFileList (state, fileList) {
    state.fileList = fileList
  },
  // ファイルのテキスト情報を取得
  setmdText (state, mdText) {
    state.mdText = mdText
  },
  // フォルダのパスを取得
  setFolderPath (state, folderPath) {
    state.folderPath = folderPath
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
  initFolder () {
    const FOLDER_PATH = `${app.getPath('documents')}/md`
    const FILE_PATH = `${FOLDER_PATH}/CheetSheet.md`
    // 初期ファイルの生成
    fs.access(FOLDER_PATH, function (err) {
      if (err) {
        if (err.code === 'ENOENT') {
          fs.mkdirSync(FOLDER_PATH)
          fs.writeFile(FILE_PATH, CheetSheet, function (err) {
            if (err) {
              throw err
            } else {
              alert(`${FILE_PATH}に初期フォルダ、及びCheetSheet.mdを作成しました。`)
            }
          })
        }
      }
    })
  },
  selectFolder (context) {
    // フォルダパスの設定
    const FOLDER_PATH = dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (FOLDER_PATH) {
      if (FOLDER_PATH[0] !== context.getters.folderPath) {
        context.commit('setFolderPath', FOLDER_PATH[0])
        context.dispatch('initFile')
        context.dispatch('readFileList')
      } else {
        alert('同じフォルダです')
      }
    }
  },
  readFileList (context) {
    // ファイルパスの設定
    const PATH = context.getters.folderPath
    // フォルダ存在しなければ初期化
    fs.access(PATH, function (err) {
      if (err) {
        if (err.code === 'ENOENT') {
          context.commit('setFileList', [])
          context.commit('setFolderPath', '')
          context.dispatch('initFile')
          alert('フォルダが存在しません')
        }
      }
    })

    // ファイル一覧の取得
    fs.readdir(PATH, function (err, files) {
      if (err) {
        alert('フォルダを選んでください')
        context.dispatch('selectFolder')
        return
      }
      let fileList = files.filter(function (file) {
        return /.*\.md$/.test(file)
      })
      context.commit('setFileList', fileList)
    })
  },
  readFile (context, index) {
    const FILE_PATH = `${context.getters.folderPath}/${context.getters.fileList[index]}`
    if (context.getters.filePath === FILE_PATH) {
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
    const DEFAULT = `${app.getPath('documents')}/md`
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
      fs.writeFileSync(FILE_PATH, context.getters.mdText)
      context.commit('setFilePath', FILE_PATH)
      context.commit('changeStatus', true)
      alert('保存しました。')
    }
  },
  overwriteFile (context) {
    const FILE_PATH = context.getters.filePath
    if (FILE_PATH) {
      fs.writeFileSync(FILE_PATH, context.getters.mdText)
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
