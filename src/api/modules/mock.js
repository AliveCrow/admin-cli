import request from '@/utils/request'

export default {
  login: (data) => {
    return request({
      url: 'https://dev.usemock.com/621e774a3cba06aedfdcf601/login?_method=post',
      method: 'post',
      data
    })
  },
  menu: () => {
    return request({
      url: 'https://dev.usemock.com/621e774a3cba06aedfdcf601/menu',
      method: 'get'
    })
  },
  // getAllField, getListFieldConfig, saveListFieldConfig
  getAllField: ({ formId }) => {
    return request({
      url: 'https://dev.usemock.com/621e774a3cba06aedfdcf601/getAllField',
      method: 'get',
      params: { formId }
    })
  },
  getListFieldConfig: ({ formId }) => {
    return request({
      url: 'https://dev.usemock.com/621e774a3cba06aedfdcf601/getListFieldConfig',
      method: 'get',
      params: { formId }
    })
  },
  saveListFieldConfig: (data) => {
    return request({
      url: 'https://dev.usemock.com/621e774a3cba06aedfdcf601/saveListFieldConfig',
      method: 'post',
      data
    })
  }
}
