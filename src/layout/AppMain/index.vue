<!--
 * @Author: grit
 * @Date: 2022/2/23 09:58
 * @LastEditTime: 2022-03-02 09:42:41
 * @FilePath: src/layout/AppMain
 * @FileName: index.vue
 * @Description: 输入文件描述信息
-->
<template>
  <el-scrollbar class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <!--      要想缓存,必须views有name,并且要和route.name一致-->
      <keep-alive :include="cachedViews">
        <router-view :key="$store.state.app.keepAlive + key" />
      </keep-alive>
    </transition>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {
      refresh: false
    }
  },
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - 134px);
  width: 100%;
  position: relative;
  padding: 20px;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 34px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

