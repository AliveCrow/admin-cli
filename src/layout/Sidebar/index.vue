<!--
 * @Author: grit
 * @Date: 2022/2/23 09:08
 * @LastEditTime: 2022-03-02 09:21:57
 * @FilePath: src/layout/sidebar
  * @Description: 输入文件描述信息
-->
<template>
  <div :class="{'has-logo':appConfig.showLogo}">
    <Logo v-if="!isQiankun"></Logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="menuItem in menus"
          :key="menuItem.path"
          :item="menuItem"
          :base-path="menuItem.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Logo from './Logo'

export default {
  name: 'Index',
  components: {
    SidebarItem,
    Logo
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'menus'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    },
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables () {
      return variables
    }
  }
}
</script>

<style scoped lang="scss">
</style>
