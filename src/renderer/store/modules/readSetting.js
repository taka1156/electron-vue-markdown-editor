const state = {
  userSetting: null
}

const getters = {
  userSetting (state) {
    return state.userSetting
  }
}

const mutations = {
  setUserSetting (state, setting) {
    state.userSetting = setting
  }
}

const actions = {
  readSetting (context) {
    const SETTING_JSON = localStorage.getItem('userSetting')
    if (SETTING_JSON) {
      context.commit('setUserSetting', JSON.parse(SETTING_JSON))
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
