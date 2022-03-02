<template>
  <div class="base_data_materials content-wrapper">
    <div class="card">
      <el-form :model="searchForm" inline>
        <MyFormItem v-model="searchForm.value1" label="value1" prop="value1" el="el-input"></MyFormItem>
        <MyFormItem v-model="searchForm.value2" label="value2" prop="value2" el="el-input"></MyFormItem>
        <MyFormItem v-model="searchForm.value2" label="value2" prop="value2" el="el-input"></MyFormItem>
        <MyFormItem v-model="searchForm.value2" label="value2" prop="value2" el="el-input"></MyFormItem>
        <MyFormItem v-model="searchForm.value2" label="value2" prop="value2" el="el-input"></MyFormItem>
        <MyFormItem v-model="searchForm.value2" label="value2" prop="value2" el="el-input"></MyFormItem>
        <MyFormItem v-model="searchForm.value2" label="value2" prop="value2" el="el-input"></MyFormItem>
        <MyFormItem v-model="searchForm.value2" label="value2" prop="value2" el="el-input"></MyFormItem>
        <MyFormItem v-model="searchForm.value2" label="value2" prop="value2" el="el-input"></MyFormItem>
        <MyFormItem el="el-button" type="search">查询</MyFormItem>
        <MyFormItem el="el-button" type="reset">重置</MyFormItem>
      </el-form>
    </div>
    <DynamicTableContainer
        :table-data="tableData"
        :form-id="formId"/>
  </div>
</template>
<script>
export default {
  name: 'BaseDataMaterials',
  data() {
    return {
      formId: '',
      tableData: [],
      total: 0,
      searchForm: {
        value1: '',
        value2: ''
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.base_data_materials {
}
</style>
