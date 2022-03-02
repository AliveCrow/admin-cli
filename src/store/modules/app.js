/*
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2022-03-02 08:35:25
 * @LastEditTime: 2022-03-02 09:41:44
 */
import dayjs from 'dayjs'
const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  keepAlive: dayjs().toISOString()
}
const mutations = {
  REFRESH: state => {
    state.keepAlive = dayjs().toISOString()
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
