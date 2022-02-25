<!--
 * @Author: grit
 * @Date: 2022/2/24 15:07
 * @LastEditTime: 2022/2/24 15:07
 * @FilePath: src/layout/MainHeader
 * @FileName: index.vue
 * @Description: 输入文件描述信息
-->
<template>
  <div class="main-header">
    <logo v-if="appConfig.showLogo && !isQiankun" />
  </div>
</template>

<script>
import Logo from './Logo'
export default {
  name: 'Index',
  components: {
    Logo
  }
}
</script>

<style scoped lang="scss">
.main-header {
  position: fixed;
  top: 0;
  height: 40px;
  background-color: $StatusBarColor;
}
</style>
