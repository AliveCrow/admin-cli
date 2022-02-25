
export default {
  computed: {
    isQiankun() {
      console.log(!!window.__POWERED_BY_QIANKUN__)
      return !!window.__POWERED_BY_QIANKUN__
    }
  }
}
