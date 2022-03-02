<template>
  <div :class="classObj" class="app-wrapper" :style="{height :isQiankun?'calc(100vh - 40px)':'100vh'}">
    <div v-if="isQiankun" style="height: 40px"></div>
    <sidebar class="sidebar-container" :style="{top: isQiankun? '40px': '0'}"/>
    <div :class="{hasTagsView:appConfig.needTagsView}" class="main-container" >
      <div :class="{'fixed-header':appConfig.fixedHeader}" :style="{top:isQiankun?'40px':'0'}">
        <Navbar v-if="!isQiankun"></Navbar>
        <TagsView v-if="appConfig.needTagsView"/>
          <AppMain/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppMain from '@/layout/AppMain'
import Navbar from '@/layout/Navbar/index'
import Sidebar from '@/layout/Sidebar'
import TagsView from '@/layout/TagsView'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }

  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
