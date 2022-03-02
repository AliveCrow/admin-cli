<!--
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2021-10-29 11:00:42
 * @LastEditTime: 2022-02-18 17:22:00
-->
<template>
  <el-container ref="dynamic-table" class="dynamic-table">
    <TableHeader v-if="hasHeader" @openSettings="openSettings">
      <TableFooter v-if="pagination" />
      <template #btn>
        <!-- @slot Use this slot 操作按钮组 -->
        <slot name="btn" />
      </template>
    </TableHeader>
    <TableBody ref="TableBody" v-loading="TABLE_LOADING" :table-data="tableData">
      <template #contextList="scope">
        <!-- @slot Use this slot 右键内容 -->
        <slot name="contextList" :scope="scope.scope" />
      </template>
      <template #operate="scope">
        <!-- @slot Use this slot 操作列 -->
        <slot name="operate" :scope="scope.scope" />
      </template>
    </TableBody>
    <el-dialog v-dialogDrag :title="elTitle" :visible.sync="dialogVisible" :width="dWidth" append-to-body>
      <!-- @slot Use this slot dialog的插槽 -->
      <slot :name="slotName" />
      <template v-if="slotName === 'settings'">
        <TableConfig ref="TableConfig" />
        <div slot="footer" style="text-align: center">
          <el-button type="primary" @click="resetField">恢复默认字段</el-button>
          <el-button type="primary" @click="resetSort">恢复默认排序</el-button>
          <el-button :loading="btnLoading" type="primary" @click="confirm">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </el-container>
</template>
<script lang="js">
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import TableConfig from './TableConfig'

import store from 'store'
import { debounce } from '@/utils'
import logo from '@/layout/Sidebar/Logo'

export default {
  name: 'DynamicTableContainer',
  components: {
    TableHeader, TableBody, TableFooter, TableConfig
  },
  props: {
    /**
     * 表格标题
     */
    title: {
      type: String,
      default: 'defaultTitle'
    },
    /**
     * dialog的title
     */
    dTitle: {
      type: String,
      default: 'defaultTitle'
    },
    /**
 * 动态表的Id
 */
    formId: {
      type: String,
      default: '',
      required: true
    },
    /**
 * 是否有操作列
 */
    hasOperate: {
      type: Boolean,
      default: true
    },
    /**
* 表格数据
*/
    tableData: {
      type: Array,
      default: () => [],
      required: true
    },
    /**
* dialog的宽度
*/
    dialogWidth: {
      type: String,
      default: '600px'
    },
    /**
* 总页数
*/
    total: {
      type: Number,
      default: 0
    },
    /**
* 表格加载状态
*/
    tableLoading: {
      type: Boolean,
      default: false
    },
    /**
* 表格高度
*/
    tableHeight: {
      type: Number,
      default: window.innerHeight - 320
    },
    /**
* 是否有序号列
*/
    hasIndex: {
      type: Boolean,
      default: false
    },
    /**
* 是否显示表格title和按钮操作
*/
    hasHeader: {
      type: Boolean,
      default: true
    },
    /**
* 操作列的宽度
*/
    operateWidth: {
      type: String,
      default: '100px'
    },
    selection: {
      type: Boolean,
      default: true
    },
    /**
     * 是否自定义右键菜单
     */
    rowContext: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      elTitle: this.dTitle,
      dialogVisible: false,
      vLoading: true,
      size: 10,
      current: 1,
      pagination: 1,
      btnLoading: false,
      default: {
        allField: [],
        defaultField: [],
        formConfig: {}
      },
      user: {
        customConfig: {},
        dispField: []
      },
      slotName: 'settings',
      dWidth: '',
      tableDynamicHeight: '100%',
      clientHeight: ''
    }
  },
  computed: {
    TABLE_LOADING() {
      return this.tableLoading
    }
    // setDwidth() {
    //   return () => {
    //     this.dWidth = this.dialogWidth
    //     return this.dWidth
    //   }
    // },
  },
  // 202140
  provide() {
    return {
      title: this.title,
      formId: this.formId,
      hasOperate: this.hasOperate,
      tableHeight: () => this.tableDynamicHeight,
      hasIndex: this.hasIndex,
      operateWidth: this.operateWidth,
      selection: this.selection,
      rowContext: this.rowContext,
      clickRow: (val) => {
        /**
* 点击表格行
*
* @event rowClick
*/
        this.$emit('rowClick', val)
      },
      dblclick: (val) => {
        /**
* 双击表格行
*
* @event rowDblclick
*/
        this.$emit('rowDblclick', val)
      },
      setElTitle: (val) => {
        this.elTitle = val
      },
      setSlotName: (val) => {
        this.slotName = val
      },
      size: () => {
        return this.size
      },
      current: (val) => {
        if (val) {
          this.current = val
        }
        return this.current
      },
      total: () => {
        return this.total
      },
      OPEN_DIALOG: () => {
        this.dialogVisible = true
      },
      CLOSE_DIALOG: () => {
        this.dialogVisible = false
      },
      DEFAULT_FIELD: () => {
        return this.default
      },
      USER_FIELD: () => {
        return this.user
      },
      SLOT_NAME: () => {
        return this.slotName
      }
    }
  },
  watch: {
    clientHeight() {
      this.updateTableHeight()
    },
    dialogVisible(n, o) {
      if (n) {
        this.$nextTick(() => {
          if (this.$refs.TableConfig) {
            this.$refs.TableConfig.$refs.TableTree._setCheckedNodes(this.user.dispField)
            this.$refs.TableConfig.$refs.TableTree.init()
          }
        })
      }
    },
    dialogWidth(n, o) {
      this.dWidth = n
    },
    current(n) {
      /**
* 当前页改变
*
* @event currentChange
*/
      this.$emit('currentChange', n)
    }
  },
  created() {
    this.slotName = this.tableSlotName
    this.dWidth = this.dialogWidth
    // this.tableDynamicHeight = this.tableHeight
    this.getAllField()
    this.getListFieldConfig()
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`// 获取浏览器可视区域高度
    window.addEventListener('resize', this.updateClientHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.updateClientHeight)
  },
  methods: {
    updateClientHeight() {
      this.clientHeight = `${document.documentElement.clientHeight}`
      // this.tableDynamicHeight = window.innerHeight - 320
    },
    updateTableHeight() {
      this.tableDynamicHeight = window.innerHeight - 300
      console.log(this.tableDynamicHeight)
    },
    setCurrentRow(index) {
      this.$refs.TableBody.setCurrentRow(index)
    },
    openSettings() {
      this.dWidth = '600px'
      this.$emit('update:dialogWidth', '600px')
    },
    async getAllField() {
      const res = await this.$api.mock.getAllField({ formId: this.formId })
      console.log(res)
      // const res = {
      //   'formId': null,
      //   'pvgId': 1,
      //   'formConfig': '{"lineHeight":44,"pageSize":2,"pagination":1,"fontSize":14}',
      //   'formName': '收款单',
      //   'allField': '[{"dict":false,"prop":"facCode","label":"工厂云码","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"date","label":"单据日期","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"billno","label":"收款单单据号","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"agreeName","label":"合同名称","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"projFullname","label":"项目名称","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"customerName","label":"客户名称","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"agreeCcode","label":"合同云码","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"customerNccode","label":"客户nc编码","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"mny","label":"收款金额","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":true,"prop":"settletype","label":"结算类型","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"creator","label":"操作人","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"crtTime","label":"操作时间","width":"150","fommter":false,"orderby":"","sortable":false}]',
      //   'defaultField': '[{"dict":false,"prop":"facCode","label":"工厂云码","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"date","label":"单据日期","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"billno","label":"收款单单据号","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"agreeName","label":"合同名称","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"projFullname","label":"项目名称","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"customerName","label":"客户名称","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"agreeCcode","label":"合同云码","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"customerNccode","label":"客户nc编码","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"mny","label":"收款金额","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":true,"prop":"settletype","label":"结算类型","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"creator","label":"操作人","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"crtTime","label":"操作时间","width":"150","fommter":false,"orderby":"","sortable":false}]',
      //   'customConfig': '{"lineHeight":44,"pageSize":2,"pagination":1,"fontSize":14}'
      // }
      this.default.allField = JSON.parse(res.allField)
      this.default.defaultField = JSON.parse(res.defaultField)
      this.default.formConfig = JSON.parse(res.formConfig)
    },
    async getListFieldConfig() {
      const res = await this.$api.mock.getListFieldConfig({ formId: this.formId })
      // const res = {
      //   'id': null,
      //   'userEid': 398,
      //   'customConfig': '{"lineHeight":44,"pageSize":2,"pagination":1,"fontSize":14}',
      //   'formId': 202148,
      //   'dispField': '[{"dict":false,"prop":"facCode","label":"工厂云码","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"date","label":"单据日期","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"billno","label":"收款单单据号","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"agreeName","label":"合同名称","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"projFullname","label":"项目名称","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"customerName","label":"客户名称","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"agreeCcode","label":"合同云码","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"customerNccode","label":"客户nc编码","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"mny","label":"收款金额","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":true,"prop":"settletype","label":"结算类型","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"creator","label":"操作人","width":"150","fommter":false,"orderby":"","sortable":false},{"dict":false,"prop":"crtTime","label":"操作时间","width":"150","fommter":false,"orderby":"","sortable":false}]',
      //   'allField': null
      // }
      this.user.customConfig = JSON.parse(res.customConfig)
      if (!res.dispField) {
        this.user.dispField = JSON.parse(res.allField)
      } else {
        this.user.dispField = JSON.parse(res.dispField)
      }
      this.size = this.user.customConfig.pageSize
      this.pagination = !!this.user.customConfig.pagination
      this.$refs.TableBody.setRowStyle()
      if (!this.user.customConfig.pagination) {
        store.set(this.formId, -1)
      } else {
        store.set(this.formId, this.user.customConfig.pageSize)
      }
      // this.pagination = !this.user.customConfig.pagination
      /**
* 点击dialog的确认按钮触发
*
* @event confirm
*/
      this.$emit('confirm')
    },
    async saveField() {
      const res = await this.$api.mock.saveListFieldConfig({
        formId: this.formId,
        allField: JSON.stringify(this.$refs.TableConfig.$refs.TableTree.treeData),
        defaultField: JSON.stringify(this.default.defaultField),
        formConfig: JSON.stringify(this.default.formConfig),
        customConfig: JSON.stringify(this.user.customConfig),
        dispField: JSON.stringify(this.user.dispField)
      })
      if (!this.user.customConfig.pagination) {
        store.set(this.formId, -1)
      } else {
        store.set(this.formId, this.user.customConfig.pageSize)
      }
      this.pagination = !this.user.customConfig.pagination
      Promise.all([res]).then(() => {
        this.btnLoading = false
        this.dialogVisible = false
        this.$notify.info(res.message)
        this.$refs.TableBody.setRowStyle()
        this.getAllField()
        this.getListFieldConfig()
        this.$emit('confirm')
      }).catch(() => {
        this.btnLoading = false
      })
    },
    confirm() {
      this.btnLoading = true
      const tableConfirm = this.$refs.TableConfig.tableSettingsForm
      this.user.customConfig = tableConfirm
      this.$refs.TableConfig.$refs.TableTree._getCheckedNodes()
      // this.$refs.TableConfig.$refs.TableTree.checkedNodes
      const user_field = this.$refs.TableConfig.$refs.TableTree.checkedNodes
      user_field.forEach(r => {
        if (r.orderby !== '') {
          r.sortable = true
        } else {
          r.sortable = false
        }
      })
      this.user.dispField = user_field
      this.saveField()
      // this.dialogVisible = false
    },
    resetField() {
      this.$refs.TableConfig.$refs.TableTree._resetField()
    },
    resetSort() {
      this.$refs.TableConfig.$refs.TableTree._resetSort()
    },
    dialogBeforeClose() {
    },
    OPEN_DIALOG() {
      this.dialogVisible = true
    },
    CLOSE_DIALOG() {
      this.dialogVisible = false
    },
    SET_DIALOG_TITLE(content) {
      this.elTitle = content
    },
    SET_SLOT_NAME(setSlotName) {
      this.slotName = setSlotName
    }
  }
}
</script>
<style lang="scss">
$primary: #4089FF;
.dynamic-table {
  .tree_content {
    .el-input {
      width: 100px;
    }
  }

  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: $primary;
    color: #fff;
    border-radius: 4px;
  }

  .tree_box {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  .el-tree-node__content {
    height: 40px;

    .el-row {
      width: 100%;
      display: flex;
      align-items: center;

      .move {
        display: inline-block;
        margin-right: 5px;
      }

      .el-input__inner {
        padding-right: 0;
      }

      .el-select {
        margin-left: 10px;
      }
    }
  }

  .table_settings {
    .el-scrollbar__wrap {
      margin-bottom: 0 !important;
    }

    .tree_content {
      display: flex;
      align-items: center;

      .move {
        display: inline-block;
        cursor: move !important;
        font-size: 1rem;
      }
    }

    .el-tree-node {
      .el-tree-node__content {
        height: 40px;
      }

      .el-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
    }
  }
}

// button按钮
.el-button--new {
  color: #fff;
  background: linear-gradient(
    90deg,
    rgba($primary, 1) 0%,
    rgba($primary, 1) 100%
  );
  box-shadow: 0px 5px 10px 0px rgba($primary, 0.3);
  border-radius: 2px;
  border: none;
}

.el-button--new:hover,
.el-button--new:focus {
  background: linear-gradient(
    90deg,
    rgba($primary, 0.8) 0%,
    rgba($primary, 0.8) 100%
  );
  color: #ffffff;
}
</style>
<style scoped lang="scss">
.dynamic-table {
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
