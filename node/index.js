/* eslint-disable prefer-const */
/*
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2021-10-13 14:44:54
 * @LastEditTime: 2022-03-02 09:19:50
 */
var fs = require('fs')
var Path = require('path')
const Handlebars = require('handlebars')
var http = require('http')

// 转换驼峰
Handlebars.registerHelper('toUpper', function (str) {
  str = str.replace(/\//g, '_')
  return str.replace(/(\-|\_)(\w)/g, function (all, $1, $2) {
    return $2.toUpperCase()
  }).replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
})

function resolve (dir) {
  return Path.join(__dirname, '../' + dir)
}
function createRouteToFiles (arr) {
  const controllers = []
  arr.forEach((r) => {
    if (r.children.length > 0) {
      console.log(`/src/views${r.pvgCode}`)
      if (!fs.existsSync(resolve(`/src/views${r.pvgCode}`))) {
        fs.mkdirSync(resolve(`/src/views${r.pvgCode}`))
      }
      createRouteToFiles(r.children)
    } else {
      controllers.push(r)
      const index_tpl = Handlebars.compile(
        fs.readFileSync(Path.join(__dirname, './index.tpl'), 'utf-8')
      )
      const index_result = index_tpl({
        list: () => {
          let {
            id,
            pid,
            children,
            pvgName,
            pvgCode,
            high,
            pvgLv,
            isDisp,
            checked
          } = r
          pvgCode = pvgCode.split('/')
          pvgCode.shift()
          pvgCode = pvgCode.join('_')
          return [
            {
              id,
              pid,
              children,
              pvgName,
              pvgCode,
              high,
              pvgLv,
              isDisp,
              checked
            }
          ]
        }
      })
      if ((r.pvgCode).substr(0, 1) !== '/') {
        r.pvgCode = `/${r.pvgCode}`
      }
      if (!fs.existsSync(resolve(`/src/views${r.pvgCode}`))) {
        fs.mkdirSync(resolve(`/src/views${r.pvgCode}`))
      }
      if (!fs.existsSync(resolve(`/src/views${r.pvgCode}/index.vue`))) {
        fs.writeFileSync(
          resolve(`/src/views${r.pvgCode}/index.vue`),
          index_result
        )
      }
      console.log(`${r.pvgName}:`, `/src/views${r.pvgCode}/index.vue`)
    }
  })
}

let { baseURL } = require('./config')
const request = require('request')
const prompt = require('prompt')
const tree = require('./tree')
prompt.start()
const schema = {
  properties: {
    userName: {
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    password: {
      hidden: true
    }
  }
}
prompt.get(schema, (err, result) => {
  if (err) {
    throw err
  }
  // print user credentials
  console.log(`${result.userName} / ${result.password}`)
  console.log('请求中...')
  let tree = require('./tree')
  if (JSON.stringify(tree) === '{}') {
    console.log('\x1B[31m请手动将getCurrentRolePvgTree返回的数据放入tree对象中\x1B[0m')
  } else {
    createRouteToFiles(tree.data[0].children)
  }
  return
  var options = {
    'method': 'POST',
    'url': `${baseURL}/api/login`,
    'headers': {
      'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'realName': result.userName,
      'password': result.password
    })
  }
  request(options, function (error, response) {
    if (error) throw new Error('接口错误,请手动将baseURL换为项目的请求地址')
    var options = {
      'method': 'GET',
      'url': `${baseURL}/api/sys/role/getCurrentRolePvgTree`,
      'headers': {
        'ACCESS_TOKEN': JSON.parse(response.body).data.token,
        'Cookie': `JSESSIONID=${JSON.parse(response.body).data.token}`
      }
    }
    request(options, function (error, res) {
      if (error) throw new Error('接口错误,请手动将baseURL换为项目的请求地址')
      let tree = require('./tree')
      tree = JSON.parse(res.body)
      if (JSON.stringify(tree) === '{}') {
        console.log('\x1B[31m请手动将getCurrentRolePvgTree返回的数据放入tree对象中\x1B[0m')
      } else {
        createRouteToFiles(tree.data[0].children)
      }
    })
  })
})

