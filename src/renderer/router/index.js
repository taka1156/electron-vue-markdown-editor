import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'markdown-editor',
      component: require('@/components/MarkdownEditer').default
    },
    {
      path: '/file',
      name: 'file-list',
      component: require('@/components/FileList').default
    },
    {
      path: '/setting',
      name: 'setting-page',
      component: require('@/components/Setting').default
    }
  ]
})
