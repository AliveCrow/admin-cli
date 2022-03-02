/*
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2022-03-02 08:35:25
 * @LastEditTime: 2022-03-02 09:26:31
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'el-icon-eleme', affix: true }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/refresh',
    name: 'Refresh',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/refresh/index'),
        meta: { noCache: true }
      }
    ]

  }
]
const createRouter = () => new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/app/child-app2/' : '/',
  mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  // routes: constantRoutes.concat(menu)
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
