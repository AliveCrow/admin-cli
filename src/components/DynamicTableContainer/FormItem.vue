<!--
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2021-10-29 17:10:07
 * @LastEditTime: 2021-10-29 17:20:32
-->
<!--@name: FormItem-->
<!--@author: grit-->
<!--@date: 2021/10/25 13:58-->
<!--@description：FormItem-->
<!--@update: 2021/10/25 13:58-->
<!--@FilePath: src/components/DynamicTable-->

<template>
  <el-form-item
    :label="label"
    :prop="prop"
    class="form_item-180 settings_form_item"
  >
    <el-select
      v-model="vModel"
      filterable
      allow-create
      default-first-option
      placeholder="请选择文章标签"
    >
      <el-option
        v-for="(item,index) in options"
        :key="item.label + index"
        :label="item.label"
        :value="parseInt(item.value)"
      />
    </el-select>
  </el-form-item>

</template>
<script lang='js'>
export default {
  model: {
    prop: 'formModel',
    event: 'changed'
  },
  props: ['label', 'prop', 'formModel', 'options'],
  data() {
    return {
      vModel: null,
      initVal: null
    }
  },
  computed: {
    isDefault() {
      return function(val) {
        if (val.value === this.initVal) {
          return `${val.label}`
        } else {
          return `${val.label}`
        }
      }
    }
  },
  watch: {
    vModel: {
      immediate: true,
      deep: true,
      handler: function(n, o) {
        this.$emit('changed', parseInt(n))
      }
    }
  },
  created() {
    this.vModel = parseInt(this.formModel)
    this.initVal = parseInt(this.formModel)
  }
}
</script>
<style scoped lang='scss' >
.settings_form_item{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
