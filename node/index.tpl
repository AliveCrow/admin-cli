
{{#list}}
<template>
  <div class="{{this.pvgCode}}">
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
