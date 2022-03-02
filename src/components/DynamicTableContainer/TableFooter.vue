<!--
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2021-10-29 11:21:39
 * @LastEditTime: 2021-10-29 20:08:47
-->
<template>
  <el-footer class="dynamic-table-footer">
    <el-pagination
      background
      layout="total, prev, pager, next,jumper"
      :page-size="size()"
      :current-page="current()"
      :total="total()"
      @current-change="currentChange"
    />
  </el-footer>
</template>
<script lang='js'>
export default {
  name: 'DynamicTableFooter',
  inject: ['size', 'current', 'total'],
  methods: {
    currentChange(current) {
      this.current(current)
      return current
    }
  }
}
</script>
<style scoped lang='scss' >
.dynamic-table-footer {
  text-align: center;
  margin-top: 20px;
}
</style>
