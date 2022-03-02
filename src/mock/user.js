
module.exports = [
  {
    url: '/mock/user/login',
    type: 'post',
    response: config => {
      const { password: pwd } = config.body
      if (pwd === '123456') {
        return {
          data: { id: 398, orgId: 1, userCode: 407, userName: '15972180255', realName: '颜波', nickName: '' },
          message: 'ok',
          status: 200
        }
      } else {
        return {
          data: null,
          message: '用户名或密码错误',
          status: 500
        }
      }
    }
  }
]
