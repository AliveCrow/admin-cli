const get = function(url) {
  console.log(url)
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.onload = function() {
      if (xhr.status == 200) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(null)
      }
    }
    xhr.onerror = function() {
      reject(null)
    }
    xhr.send(null)
  })
}

export default async(vue) => {
  if (!vue.config.login_type) {
    const resp = await get('/config/app-config.json')
    if (resp) {
      for (const key in resp) {
        vue.config[key] = resp[key] || ''
      }
    }
  }
}
