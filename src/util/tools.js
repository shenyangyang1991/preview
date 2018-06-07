export function disposeSrc(src, prefix) {
  Object.keys(src).forEach(key => {
    if (typeof src[key] === 'string') {
      src[key] = `${prefix}${src[key]}`
    } else {
      src[key] = disposeSrc(src[key], prefix)
    }
  })
  return src
}

export function disposeUrl(url, prefix) {
  Object.keys(url).forEach(key => {
    if ('url' in url[key]) {
      url[key]['url'] = `${prefix}${url[key]['url']}`
    } else {
      url[key] = disposeUrl(url[key], prefix)
    }
  })
  return url
}

function time2DateStr(time) {
  let dateTime = new Date(time)
  let year = dateTime.getFullYear()
  let month = dateTime.getMonth() + 1
  let day = dateTime.getDate()
  var timeSpanStr = year + '/' + month + '/' + day
  return timeSpanStr
}

export function time2DateByArray(arr) {
  if (arr && arr instanceof Array) {
    arr.forEach((item, index) => {
      if (item && 'createDate' in item) {
        arr[index].createDate = time2DateStr(item.createDate)
      }
    })
  }

  return arr
}
