<!--
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2022-03-02 09:20:18
 * @LastEditTime: 2022-03-02 09:28:57
-->

<template>
  <div class="sys_news-out">
    传出消息
    <el-input
      v-model="value"
      placeholder="inpur"
    ></el-input>
  </div>
</template>
<script>
export default {
  name: 'SysNewsOut',
  data () {
    return {
      value: ''
    }
  }
}
</script>
<style scoped lang='scss' >
.sys_news-out {
}
</style>
