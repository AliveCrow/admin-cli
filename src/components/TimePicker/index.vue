<!--
 * @Author: grit
 * @Date: 2022/3/1 15:15
 * @LastEditTime: 2022/3/1 15:15
 * @FilePath: src/components/TimePicker
 * @FileName: index.vue
 * @Description: 输入文件描述信息
-->
<template>
  <div class="custom-time-picker">
    <el-date-picker v-bind="$attrs" v-on="$listeners" :pickerOptions="pickerOptions">
      <!-- 插槽透传 -->
      <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
      <template
          v-for="(_, name) in $scopedSlots"
          :slot="name"
          slot-scope="slotData"
      >
        <slot :name="name" v-bind="slotData" />
      </template>
    </el-date-picker>
  </div>
</template>
<script >
import pickerOptions from '@/libs/date-time-picker'
export default {
  name: 'TimePicker',
  props: {
    pickerOptions: {
      type: Object,
      default: () => pickerOptions
    }
  }
}
</script>
<style  lang='scss' >
.el-picker-panel__body {
  margin-left: 200px !important;
}
.el-picker-panel__sidebar {
  width: 200px;
  button {
    float: left;
    width: 33.33%;
    text-align: center;
  }
}
.custom-time-picker {
  display: inline;
}
</style>
