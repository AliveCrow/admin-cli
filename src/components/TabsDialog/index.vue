<!--
 * @Author: grit
 * @Date: 2022/2/28 14:51
 * @LastEditTime: 2022/2/28 14:51
 * @FilePath: src/components/TabsDialog
 * @FileName: vue.vue
 * @Description: 输入文件描述信息
-->
<template>
<!--  <el-dialog-->
<!--      className="tab-dialog"-->
<!--      :modal-append-to-body="false"-->
<!--      width="60%"-->
<!--      title=""-->
<!--      :visible.sync="visible"-->
<!--      >-->
<!--    <el-tabs v-model="activeName" @tab-click="handleClick">-->
<!--      <el-tab-pane label="基本信息" name="基本信息" type="border-card">-->
<!--        <p>机构云码：102562563</p>-->
<!--        <p>机构名称：武汉云台数据有限公司</p>-->
<!--        <p>机构简称：武汉云台</p>-->
<!--        <p>行政区域：湖北省武汉市</p>-->
<!--        <p>机构类型：商砼运输商、商砼泵送商</p>-->
<!--        <p>机构角色：系统管理员、商砼销售结算员、商砼发车调度</p>-->
<!--        <p>状态：启用</p>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="操作日记" name="操作日记">-->
<!--        <el-table-->
<!--            :data="tableData"-->
<!--            border-->
<!--            style="width: 100%">-->
<!--          <el-table-column-->
<!--              prop="optTime"-->
<!--              label="操作时间"-->
<!--              width="135">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--              prop="operator"-->
<!--              label="操作人"-->
<!--              width="60">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--              prop="optType"-->
<!--              label="操作类型"-->
<!--              width="75">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--              prop="optLog"-->
<!--              label="操作内容">-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
<!--    <span slot="footer" class="dialog-footer">-->
<!--    <el-button type="primary" @click="visible = false">确 定</el-button>-->
<!--  </span>-->
<!--  </el-dialog>-->
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped>

</style>
