import CheetSheet from '@/components/SmapleMarkdown/CheetSheet.js'
const { app, dialog } = require('electron').remote
const fs = require('fs')

const state = {
  fileList: [],
  status: false, // ファイルが存在するかどうか
  mdText: '',
  filePath: '',
  folderPath: `${app.getPath('documents')}\\md`
}

const getters = {
  folderPath (state) {
    return state.folderPath
  },
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
    const FOLDER_PATH = `${app.getPath('documents')}\\md`
    const FILE_PATH = `${FOLDER_PATH}\\CheetSheet.md`
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
      context.commit('setFolderPath', FOLDER_PATH[0])
      context.dispatch('readFileList')
    }
  },
  readFileList (context) {
    // ファイルパスの設定
    const PATH = context.state.folderPath
    // フォルダの存在を確認してなければ選択画面を呼ぶ
    fs.access(PATH, function (err) {
      if (err) {
        if (err.code === 'ENOENT') {
          alert('フォルダが存在しません。')
        }
      }
    })
    // ファイル一覧の取得
    fs.readdir(PATH, function (err, files) {
      if (err) alert(err)
      let fileList = files.filter(function (file) {
        return /.*\.md$/.test(file)
      })
      context.commit('setFileList', fileList)
    })
  },
  readFile (context, index) {
    const FILE_PATH = `${context.state.folderPath}\\${context.state.fileList[index]}`
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
    if (context.state.filePath === '') {
      // ファイルパスが存在しなければ新規保存
      context.dispatch('saveFile', textData)
    }
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
