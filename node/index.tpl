
{{#list}}
<template>
  <div class="{{this.pvgCode}} content-wrapper">
    {{this.pvgName}}
  </div>
</template>
<script>
export default {
  name: '{{toUpper this.pvgCode}}'
}
</script>
<style scoped lang='scss' >
.{{this.pvgCode }}{
}
</style>
{{/list}}
