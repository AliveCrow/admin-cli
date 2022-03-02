<!--
 * @Author: grit
 * @Date: 2022/3/1 15:16
 * @LastEditTime: 2022/3/1 15:16
 * @FilePath: src/components/DatePicker
 * @FileName: index.vue
 * @Description: 输入文件描述信息
-->
<template>
  <div class="custom-date-picker">
    <el-date-picker
        v-bind="$attrs"
        v-on="$listeners"
        :picker-options="pickerOptions"
    >
      <!-- 插槽透传 -->
      <slot v-for="(_, name) in $slots" :slot="name" :name="name"/>
      <template
          v-for="(_, name) in $scopedSlots"
          :slot="name"
          slot-scope="slotData"
      >
        <slot :name="name" v-bind="slotData"/>
      </template>
    </el-date-picker>
  </div>
</template>
<script>
import pickerOptions from '@/libs/date-time-picker'
export default {
  name: 'DatePicker',
  props: {
    pickerOptions: {
      type: Object,
      default: () => pickerOptions
    }
  }
}
</script>
<style scoped lang='scss'>
.custom-date-picker {
  display: inline;
}
</style>
