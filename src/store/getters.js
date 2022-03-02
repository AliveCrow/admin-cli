/*
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2022-03-02 08:35:25
 * @LastEditTime: 2022-03-02 09:38:37
 */
const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  menus: state => state.menu.routes,
  userInfo: state => state.user.userInfo,
  keepAlive: state => state.app.keepAlive
}
export default getters
