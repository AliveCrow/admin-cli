<!--
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2022-03-02 09:24:13
 * @LastEditTime: 2022-03-02 09:31:28
-->
<template>
  <div class='refresh-page'>
    refresh-page
  </div>
</template>
<script >
export default {
  name: 'RefreshPage',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$router.replace(from.path)
    })
  }
}
</script>
<style scoped lang='scss' >
.refresh-page {
}
</style>
