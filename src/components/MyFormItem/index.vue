<!--
 * @Author: grit
 * @Date: 2022/3/2 10:33
 * @LastEditTime: 2022/3/2 10:33
 * @FilePath: src/components/MyFormItem
 * @FileName: index.vue
 * @Description: 输入文件描述信息
-->
<template>
  <el-form-item v-bind="$attrs" class="my-form-item">
    <template >
      <component :is="el" ref="componentEl" v-model="modelValue" v-bind="$attrs" v-on="$listeners">
        <slot />
      </component>
    </template>
  </el-form-item>
</template>

<script>
export default {
  data() {
    return {
      modelValue: null
    }
  },
  model: {
    prop: 'value',
    event: 'changed'
  },
  name: 'MyFormItem',
  props: {
    el: {
      type: String,
      default: 'div'
    },
    value: null
  },
  watch: {
    modelValue: {
      immediate: true,
      deep: true,
      handler: function(n, o) {
        this.$emit('changed', n)
      }
    },
    value: {
      immediate: true,
      deep: true,
      handler: function(n, o) {
        this.modelValue = n
      }
    }
  }
}
</script>

<style  lang="scss">
.my-form-item {
    margin-bottom: 10px!important;
}
</style>
