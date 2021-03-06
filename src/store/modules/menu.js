import { constantRoutes } from '@/router'

const state = {
  routes: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
