/*
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2022-03-02 08:35:25
 * @LastEditTime: 2022-03-02 09:16:03
 */
import { deepClone, transformStr } from '@/utils'

/**
 * 动态加载路由组件
 */
export function loadView (view) {
  return (resolve) => require([`@/${view}`], resolve)
}
/**
 * @description 排序
 * @param {*} pvgs
 * @returns {*}
 */
const sortList = (pvgs) => {
  pvgs.sort(function (a, b) {
    if (a.prior < b.prior) {
      return -1
    } else if (a.prior === b.prior) {
      return 0
    } else {
      return 1
    }
  })
  return pvgs
}

export default function generationRoute (arr = []) {
  /**
   * 菜单排序
   */
  sortList(arr).forEach((i) => {
    if (i.children.length > 0) {
      i.children = sortList(i.children)
    }
  })
  const newArr = arr.filter((i) => i.isDisp && i.pvgName !== '颁发企业账号')
  return newArr.map((route) => {
    let com
    if (route.children.length > 0) {
      com = 'layout'
    } else {
      if (route.pvgCode.substr(0, 1) !== '/') {
        com = `views/${route.pvgCode}`
      }
      com = `views${route.pvgCode}`
    }
    const obj = {
      path: route.pvgCode,
      name: transformStr(route.pvgCode),
      component: loadView(com),
      meta: {
        title: route.pvgName,
        noCache: false, // 默认都进行缓存
        icon: 'icon' + route.pvgCode.split('/').join('-')
      },
      children: generationRoute(route.children)
    }
    return obj
  })
}

