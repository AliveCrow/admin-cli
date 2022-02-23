
import Vue from 'vue'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${Vue.config.siteName}`
  }
  return `${title}`
}
