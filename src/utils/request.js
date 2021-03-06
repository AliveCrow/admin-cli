import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { removeToken } from './auth'

let showMsg = true // 弹窗显示

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_PUBLIC_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.status === 200) {
      return res
    } else if (res.status === 404) {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    } else {
      if (showMsg) {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 3 * 1000
        })
        showMsg = false
        setTimeout(() => {
          showMsg = true
        }, 3000)
      }
    }
    return Promise.reject(new Error(res.message || 'Error'))
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
