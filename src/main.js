
import Vue from 'vue'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import '@/styles/element-ui.scss'
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/before'
import Setting from '@/config/setting'
import './icons' // icon
import mixins from '@/mixins'
import ReadConfig from '@/utils/config';

(async() => {
  await ReadConfig(Vue)
  Vue.config.productionTip = false
  Vue.prototype.appConfig = Setting
  Vue.prototype.$config = Vue.config
  Vue.use(Element, { size: 'mini', zIndex: 3000 })
  Vue.mixin(mixins)
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()
