<!--
 * @Author: grit
 * @Date: 2022/2/28 15:13
 * @LastEditTime: 2022/2/28 15:13
 * @FilePath: src/components/TabDialog
 * @FileName: index.vue
 * @Description: 输入文件描述信息
-->
<template>
  <el-dialog
      class="tab-dialog"
      :modal-append-to-body="false"
      width="60%"
      :visible.sync="dialogVisible"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <slot ></slot>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false;$emit('update:visible', false)">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Index',
  model: {
    prop: 'activeTab',
    event: 'tab-change'
  },
  props: {
    /**
     * 绑定值，选中选项卡的 name
     */
    activeTab: { type: String, default: '', required: false },
    /**
     * 日志数据
     */
    tableData: { type: Object, default: () => {}, required: false },
    /**
     * dialog的显示隐藏要用.sync
     */
    visible: { type: Boolean, default: false, required: false }
  },
  data() {
    return {
      activeName: '',
      dialogVisible: false
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(n, o) {
        this.dialogVisible = n
      }
    },
    activeTab: {
      immediate: true,
      handler(n, o) {
        this.activeName = n
        this.$emit('tab-change', n)
      }
    }
  },
  methods: {
    /**
     * tab 被选中时触发
     * 被选中的标签 tab 实例
     */
    handleTabClick(instance) {
      this.$emit('handleClick', instance)
      this.$emit('tab-change', instance.name)
    }
  }
}
</script>

<style scoped>

</style>
