<template>
  <div>
    <DynamicTableContainer
        operateWidth="200"
        form-id="123123"
        :table-data="[{},{},{},{},{},{},{},{},{},{},{},{}]"
        :rowContext="true"
        :total="10"
    >
      <template #contextList>
        <ul class="context-list">
          <li>详情</li>
          <li>删除</li>
        </ul>
      </template>
      <template #operate="scope">
        <div class="fixed-operate">
          <el-button
              @click="handleRowClick(scope.row)"
              type="text"
              size="mini"
          >详情
          </el-button
          >
          <el-button type="text" size="mini">修改</el-button>
          <el-button type="text" size="mini">添加</el-button>
          <el-button type="text" size="mini">编辑</el-button>
          <el-button type="text" size="mini">编辑</el-button>
          <el-button
              @click="handleRowClick(scope.row)"
              type="text"
              size="mini"
          >详情
          </el-button
          >
          <el-button type="text" size="mini">修改</el-button>
          <el-button type="text" size="mini">添加</el-button>
          <el-button type="text" size="mini">编辑</el-button>
          <el-button type="text" size="mini">编辑</el-button>
        </div>
      </template>
    </DynamicTableContainer>
    <div>
      <DatePicker
          v-model="value"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      >
      </DatePicker>
    </div>
    <div>
      <TimePicker
          v-model="value"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      >
      </TimePicker>
    </div>
  </div>
</template>

<script>
import DynamicTableContainer from '@/components/DynamicTableContainer'

export default {
  name: 'Index',
  components: {
    DynamicTableContainer
  },
  data() {
    return {
      value: '',
      pickerOptions: {}
    }
  },
  methods: {
    change(val) {
      console.log('===: ', val)
    },
    handleRowClick(scopd) {
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    openDialog() {
      this.visible = true
    },
    handleClose(done) {
      done()
    },
    open1() {
      this.$message('这是一条消息提示')
    },
    open2() {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },

    open3() {
      this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
    },

    open4() {
      this.$message.error({
        message: '错了哦，这是一条错误消息'
      })
    }
  }
}
</script>

<style lang="scss">
.fixed-operate {
  display: flex;
  flex-wrap: wrap;

  .el-button--text {
    padding: 0 !important;
    margin: 0 8px 0 0;
    position: relative;
  }
}

.demo-table {
  position: relative;

  .context-list {
    list-style-type: none;
    padding: 5px 0;

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #4089ff;
        color: #fff;
      }
    }
  }
}
</style>
