<!--
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2021-10-29 11:20:52
 * @LastEditTime: 2021-11-25 18:08:03
-->
<template>
  <el-main class="dynamic-table-body">
    <el-table
        ref="table"
        class="table"
        :height="tableHeight()"
        :row-style="rowStyle"
        highlight-current-row
        :data="tableData"
        border
        stripe
        header-row-class-name="table-header-class"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        @row-contextmenu="rowContextActive"
    >
      <el-table-column
          v-if="selection"
          type="selection"
          width="55"/>
      <el-table-column
          v-if="hasIndex"
          type="index"
          width="80"
          label="序号"
          fixed="left"
      />
      <el-table-column
          v-for="(el, index) in USER_FIELD().dispField"
          :key="index"
          align="center"
          v-bind="{
          ...el,
          width: 0,
        }"
          :min-width="el.width"
          show-overflow-tooltip
      >
        <template v-slot:default="scope">
          <div>
            {{ needDict(scope.row, el) }}
            <!-- {{ scope.row[el.prop] }} -->
          </div>
        </template>
      </el-table-column>
      <el-table-column
          v-if="hasOperate"
          fixed="right"
          label="操作"
          :width="operateWidth"
      >
        <template slot-scope="scope">
          <slot name="operate" :scope="scope"/>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="contextVisible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <slot name="contextList">
        <ul>
          <li>刷新</li>
          <li>关闭</li>
          <li>关闭其他</li>
          <li>关闭所有</li>
        </ul>
      </slot>
    </div>
  </el-main>
</template>
<script>
import store from 'store'

export default {
  name: 'DynamicTableBody',
  inject: [
    'formId',
    'USER_FIELD',
    'hasOperate',
    'clickRow',
    'dblclick',
    'tableHeight',
    'hasIndex',
    'operateWidth',
    'selection',
    'rowContext'
  ],
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      structure: store.get('structure'),
      rowStyle: {},
      contextVisible: false,
      left: 0,
      top: 0
    }
  },
  computed: {
    needDict() {
      return (row, el) => {
        return row[el.prop]
      }
    }
  },
  mounted() {
    document.documentElement.addEventListener('mousedown', this.showContext, true)
  },
  // watch: {
  //   tableData: {
  //     immediate: true,
  //     deep: true,
  //     handler: function(n, o) {
  //       if (n.length >= 0) {
  //         this.tableLoading = false
  //       }
  //     }
  //   }
  //
  // },
  methods: {
    showContext() {
      this.contextVisible = false
    },
    // /**
    //  * 表格排序事件处理函数
    //  * @param {object} {column,prop,order} 列数据|排序字段|排序方式
    //  */
    // sortChange({ prop, order }) {
    //   this.tableData.sort(this.compare(prop, order))
    // },
    // /**
    //   * 排序比较
    //   * @param {string} propertyName 排序的属性名
    //   * @param {string} sort ascending(升序)/descending(降序)
    //   * @return {function}
    //   */
    // compare(propertyName, sort) {
    //   return function(obj1, obj2) {
    //     var value1 = obj1[propertyName]
    //     var value2 = obj2[propertyName]
    //     if (typeof value1 === 'string' && typeof value2 === 'string') {
    //       const res = value1.localeCompare(value2, 'zh')
    //       return sort === 'ascending' ? res : -res
    //     } else {
    //       if (value1 <= value2) {
    //         return sort === 'ascending' ? -1 : 1
    //       } else if (value1 > value2) {
    //         return sort === 'ascending' ? 1 : -1
    //       }
    //     }
    //   }
    // },
    setCurrentRow(index) {
      this.$nextTick(() => {
        this.$refs.table.setCurrentRow(this.$refs.table.data[index])
      })
    },
    rowClick(row) {
      this.clickRow(row)
    },
    rowDblclick(row) {
      this.dblclick(row)
    },
    rowContextmenu(row, column, event) {
      this.contextVisible = false
      this.rowContextActive(row, column, event)
    },
    rowContextActive(row, column, event) {
      console.log(this.rowContext)
      if (!this.rowContext) return
      event.preventDefault()
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = event.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = event.clientY - 200
      this.contextVisible = true
    },
    setRowStyle(customConfig) {
      var stylejson = {}
      stylejson.height =
          this.USER_FIELD().customConfig.lineHeight + 'px !important'
      stylejson.lineHeight =
          this.USER_FIELD().customConfig.lineHeight + 'px !important'
      stylejson.fontSize =
          this.USER_FIELD().customConfig.fontSize + 'px !important'
      this.rowStyle = stylejson
      return stylejson
    }
  }
}
</script>
<style scoped lang="scss">
.el-main {
  padding: 0 !important;

}

.dynamic-table-body {
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    border-radius: 2px;
    font-size: 1rem;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  }
}
</style>
