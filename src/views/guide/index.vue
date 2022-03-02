<template>
  <div>
    <div class="test">
      Home
    </div>
    <div>
      <el-button :plain="true" @click="open2">成功</el-button>
      <el-button :plain="true" @click="open3">警告</el-button>
      <el-button :plain="true" @click="open1">消息</el-button>
      <el-button :plain="true" @click="open4">错误</el-button>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button>默认按钮</el-button>
      <el-button size="medium">中等按钮</el-button>
      <el-button size="small">小型按钮</el-button>
      <el-button size="mini">超小按钮</el-button>
    </div>
    <div>
      <el-button :plain="true" @click="open2">成功</el-button>
      <el-button :plain="true" @click="open3">警告</el-button>
      <el-button :plain="true" @click="open1">消息</el-button>
      <el-button :plain="true" @click="open4">错误</el-button>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button>默认按钮</el-button>
      <el-button size="medium">中等按钮</el-button>
      <el-button size="small">小型按钮</el-button>
      <el-button size="mini">超小按钮</el-button>
    </div>
    <div>
      <el-button type="primary" @click="openDialog">弹出对话框</el-button>
    </div>
    <TabDialog
        :visible.sync="visible"
        v-model="activeName"
    >
      <template>
        <el-tab-pane label="基本信息" name="基本信息" type="border-card">
          <p>机构云码：102562563</p>
          <p>机构名称：武汉云台数据有限公司</p>
          <p>机构简称：武汉云台</p>
          <p>行政区域：湖北省武汉市</p>
          <p>机构类型：商砼运输商、商砼泵送商</p>
          <p>机构角色：系统管理员、商砼销售结算员、商砼发车调度</p>
          <p>状态：启用</p>
        </el-tab-pane>
        <el-tab-pane label="操作日志" name="操作日志">
          <el-table
              :data="tableData"
              border
              style="width: 100%">
            <el-table-column
                prop="optTime"
                label="操作时间"
                width="135">
            </el-table-column>
            <el-table-column
                prop="operator"
                label="操作人"
                width="60">
            </el-table-column>
            <el-table-column
                prop="optType"
                label="操作类型"
                width="75">
            </el-table-column>
            <el-table-column
                prop="optLog"
                label="操作内容">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </template>
    </TabDialog>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped>

</style>
