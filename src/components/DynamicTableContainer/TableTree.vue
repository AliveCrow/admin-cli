<!--
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2021-10-29 17:24:42
 * @LastEditTime: 2022-02-18 15:57:16
-->
<template>
    <el-scrollbar style="height: 400px; width: 100%;padding-bottom:20px" class="table-tree">
      <el-tree
        ref="tree"
        class="tree"
        draggable
        :allow-drop="_allowDrop"
        :data="treeData"
        show-checkbox
        node-key="prop"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="_renderContent"
        @node-drag-start="_nodeDragStart"
        @node-drop="_nodeDrop"
      />
    </el-scrollbar>
</template>
<script lang='js'>
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
export default {
  inject: ['DEFAULT_FIELD', 'USER_FIELD'],
  data() {
    return {
      treeData: [],
      checkedNodes: []
    }
  },
  mounted() {
    this._setCheckedNodes(this.USER_FIELD().dispField)
  },
  methods: {
    init() {
      this.treeData = deepClone(this.DEFAULT_FIELD().allField)
      this.$nextTick(() => {
        this._setCheckedNodes(this.USER_FIELD().dispField)
      })
    },
    _resetField() {
      this._setCheckedNodes(this.DEFAULT_FIELD().allField)
    },
    _resetSort() {
      this.checkedNodes = this.$refs.tree.getCheckedNodes()
      // this.treeData = []
      this.treeData = deepClone(this.DEFAULT_FIELD().defaultField)
      // this._setCheckedNodes(this.DEFAULT_FIELD().defaultField)
      this.$nextTick(() => {
        this._setCheckedNodes(this.checkedNodes)
      })
    },
    _getCheckedNodes() {
      this.checkedNodes = this.$refs.tree.getCheckedNodes()
    },
    _setCheckedNodes(nodes) {
      this.$refs.tree.setCheckedNodes(nodes)
      this.checkedNodes = this.$refs.tree.getCheckedNodes()
    },
    _nodeDragStart(dragNode, event) {
      this.checkedNodes = this.$refs.tree.getCheckedNodes()
    },
    _nodeDrop(dragNode, enterNode, position, event) {
      this._setCheckedNodes(this.checkedNodes)
    },
    /**
     * 禁止拖拽项目成为子节点
     */
    _allowDrop(draggingNode, dropNode, type) {
      return type !== 'inner'
    },
    _renderContent(h, { node, data, store }) {
      return (
        <el-row >
          <el-col span={12}>
            {node.label}
          </el-col>
          <el-col span={12} class='tree_content'>
            <div class='move'>
              <i class='el-icon-rank' title='拖动排序'></i></div>
            <el-input class='left_margin_10' size='small' type='number' v-model={data.width} maxlength='3' />
            <el-select
              size='small'
              v-model={data.orderby}
              class='left_margin_10'
              clearable
              placeholder='请选择'
            >
              <el-option label='升序' value='ascending'>升序</el-option>
              <el-option label='降序' value='descending'>降序</el-option>
            </el-select>
          </el-col>
        </el-row>
      )
    }
  }
  // <el-option label='升序' value='ascending'>升序</el-option>
  // <el-option label='降序' value='descending'>降序</el-option>
}
</script>
<style  lang='scss' >
.table-tree {
  max-height: 350px;
  overflow-x: hidden;
  .tree_content {
    display: flex;
    align-items: center;
    .el-input__inner {
      width: 100px;
    }
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-tree-node {
    height: 40px;
  }
  .el-scrollbar__view {
    padding-top: 10px;
  }
  .el-row {
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
  }
}
</style>
