/*
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2022-03-02 08:35:25
 * @LastEditTime: 2022-03-02 09:37:07
 */

export default {
  computed: {
    isQiankun () {
      return !!window.__POWERED_BY_QIANKUN__
    }
  }
}
