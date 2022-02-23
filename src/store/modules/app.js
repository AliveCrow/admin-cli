const state = {
    sidebar: {
        opened: true,
        withoutAnimation: false
    }

}
const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
