import wepy from 'wepy'

export default async function request(options) {
  if (options.header) {
    options.header['Content-Type'] = 'application/x-www-form-urlencoded'
  } else {
    options.header = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  let response = {}
  try {
    response = await wepy.request(options)
  } catch (e) {
    wepy.showModal({
      content: '网络异常，请检查网络',
      showCancel: false
    })
  }

  if (response.statusCode === 200) {
    let {data} = response
    if (data) {
      let {isSuccess, obj, msg} = data
      if (isSuccess === 'true') {
        return {success: true, result: obj}
      } else {
        return {success: false, result: msg, obj: obj}
      }
    }
  } else if (response.statusCode === 404) {
    await wepy.showModal({
      content: `未找到服务器, 请联系客服. `,
      showCancel: false
    })
  } else if (response.statusCode === 500) {
    await wepy.showModal({
      content: `服务器出错, 请联系客服. `,
      showCancel: false
    })
  } else {
  }
}
