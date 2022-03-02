/*
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2022-03-01 10:52:24
 * @LastEditTime: 2022-03-02 09:28:08
 */
import router, { constantRoutes, resetRouter } from './index'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'
import generationRoute from '@/utils/generation-route'
import { getToken } from '@/utils/auth'
import api from '@/api'
import toAwait from 'await-to-js'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    // 请求菜单
    const [err, res] = await toAwait(api.mock.menu())
    let menuList = []
    if (!err) {
      // 有token的情况下必有userinfo
      menuList = generationRoute(res.data[0].children).concat([{ path: '*', redirect: '/404', hidden: true }])
    }
    if (store.state.menu.routes.length <= constantRoutes.length) {
      menuList.forEach(r => {
        router.addRoute(r)
      })
      next({ ...to, replace: true })
    }
    store.commit('menu/SET_ROUTES', menuList)

    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
