/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
/**参照(https://github.com/SimulatedGREG/electron-vue/issues/733#issuecomment-434850036)
  `createSharedMutations()`
  createSharedMutations
*/
import { createPersistedState } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
    //createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
