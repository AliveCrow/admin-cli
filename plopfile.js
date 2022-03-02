const viewGenerator = require('./plop-templates/view/prompt')
const componentGenerator = require('./plop-templates/component/prompt')
const storeGenerator = require('./plop-templates/store/prompt.js')

module.exports = function(plop) {
  plop.setGenerator('新建views', viewGenerator)
  plop.setGenerator('新建组件', componentGenerator)
  plop.setGenerator('新建store', storeGenerator)
}
