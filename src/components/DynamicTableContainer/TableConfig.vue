<!--
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2021-10-29 11:30:52
 * @LastEditTime: 2021-11-04 22:00:07
-->
<template>
  <div class="table-config">
    <div v-if="SLOT_NAME() === 'settings'" class="table_settings">
      <el-form
        ref="table_settings_form"
        class="table_settings_form_header"
        :model="tableSettingsForm"
        label-width="80px"
        :inline="true"
      >
        <el-row>
          <el-col :span="12">
            <FormItem
              v-model="tableSettingsForm.lineHeight"
              prop="lineHeight"
              label="行高"
              :options="tableSettingOptions.lineHeightOptions"
            />
          </el-col>
          <el-col :span="12">
            <FormItem
              v-model="tableSettingsForm.pagination"
              prop="pagination"
              label="是否分页"
              :options="tableSettingOptions.paginationOptions"
            />
          </el-col>
          <el-col :span="12">
            <FormItem
              v-show="tableSettingsForm.pagination"
              v-model="tableSettingsForm.pageSize"
              prop="pageSize"
              label="每页条数"
              :options="tableSettingOptions.pageSizeOptions"
            />
          </el-col>
          <el-col :span="12">
            <FormItem
              v-model="tableSettingsForm.fontSize"
              prop="fontSize"
              label="字体大小"
              :options="tableSettingOptions.fontSizeOptions"
            /></el-col>
        </el-row>
      </el-form>
    </div>
    <el-divider />
    <div style="margin: 0 auto;max-height: 400px">
      <TableTree ref="TableTree" />
    </div>
  </div>
</template>
<script lang='js'>
import FormItem from './FormItem'
import TableTree from './TableTree'

export default {
  name: 'TableConfig',
  components: {
    FormItem, TableTree
  },
  inject: ['SLOT_NAME', 'DEFAULT_FIELD', 'USER_FIELD'],
  data() {
    return {
      // settings
      tableSettingsForm: {
        lineHeight: 44,
        pagination: 1,
        pageSize: 10,
        fontSize: 16

      },
      tableSettingOptions: {}
    }
  },
  created() {
    this.buildOptions()
  },
  methods: {
    buildOptions() {
      const default_field = this.DEFAULT_FIELD()
      const user_field = this.USER_FIELD()
      this.tableSettingsForm = user_field.customConfig
      for (const i in default_field.formConfig) {
        if (parseInt(default_field.formConfig[i]) === parseInt(user_field.customConfig[i])) {
          this.tableSettingOptions[`${i}Options`] = [{
            label: parseInt(default_field.formConfig[i]) + '(默认)',
            value: parseInt(default_field.formConfig[i])
          }]
        } else {
          this.tableSettingOptions[`${i}Options`] = [{
            label: parseInt(default_field.formConfig[i]) + '(默认)',
            value: parseInt(default_field.formConfig[i])
          }, {
            label: parseInt(user_field.customConfig[i]),
            value: parseInt(user_field.customConfig[i])
          }]
        }
      }
      this.tableSettingOptions.paginationOptions = [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ]
    }
  }

}
</script>
<style scoped lang='scss' >
.table_settings_form_header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
