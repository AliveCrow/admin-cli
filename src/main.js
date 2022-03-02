/*
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2022-02-23 15:26:01
 * @LastEditTime: 2022-02-23 16:00:20
 */

import Vue from 'vue'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import '@/styles/element-ui/index.scss'
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/before'
import Setting from '@/config/setting'
import './icons' //     icon
import './public-path'
import mixins from '@/mixins'
import ReadConfig from '@/utils/config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '@/libs'
import '@/directive'
import '@/plugins'
import api from '@/api'

let instance = null
function render(props = {}) {
  NProgress.start()
  const { container } = props;
  (async() => {
    await ReadConfig(Vue)
    Vue.config.productionTip = false
    Vue.prototype.appConfig = Setting
    Vue.prototype.$config = Vue.config
    Vue.prototype.$api = api
    Vue.use(Element, { size: 'mini', zIndex: 4000 })
    Vue.mixin(mixins)
    instance = new Vue({
      el: container ? container.querySelector('#child-app2') : '#child-app2',
      router,
      store,
      render: (h) => h(App)
    })
  })()
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
}
export async function mount(props) {
  return new Promise((resolve, reject) => {
    render(props)
    NProgress.start()
    resolve()
  })
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}

