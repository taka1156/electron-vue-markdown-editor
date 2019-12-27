import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'markdown-editor',
      component: require('@/components/pages/MarkdownEditor/MarkdownEditor').default
    },
    {
      path: '/file',
      name: 'file-list',
      component: require('@/components/pages/FileList/FileList').default
    },
    {
      path: '/setting',
      name: 'setting-page',
      component: require('@/components/pages/Setting/Setting').default
    }
  ]
})
