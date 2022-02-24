<template >
  <div class="table-demo " >
    <el-form ref="form" :model="form" label-width="80px" inline>
      <el-form-item label="审批人">
        <el-input v-model="form.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="search" @click="onSubmit">查询</el-button>
        <el-button>重置</el-button>
        <el-button type="text">展开/收起<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TableDemo',
  props: {},
  data() {
    return {
      value: '',
      form: {
        user: '',
        region: ''
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-demo {}
</style>
