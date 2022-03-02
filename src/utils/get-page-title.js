
import Vue from 'vue'

export default function getPageTitle(pageTitle) {
  console.log(Vue.config)
  if (pageTitle) {
    return `${pageTitle} - ${Vue.config.siteName}`
  }
  return `${Vue.config.siteName}`
}
