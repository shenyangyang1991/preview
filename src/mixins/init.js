import wepy from 'wepy'
import http from '@/util/request'
import Config from '@/config/index'

export default class initMixin extends wepy.mixin {
  async onLoad(options) {
    wepy.showLoading({
      title: '正在加载...',
      mask: true
    })
    let openid = wepy.getStorageSync('openid')
    if (!openid) {
      // 重新登录
      let sign = await wepy.login()
      if (sign.code) {
        let data = await http({
          url: `${Config.api.login.url}/${sign.code}`,
          method: Config.api.login.method
        })
        if (data && data.success) {
          let res = data.result
          let {openid} = res
          wepy.setStorageSync('openid', openid)
        } else {
          wepy.showModal({
            content: '登录失败，请重新打开',
            showCancel: false
          })
        }
      } else {
        wepy.showModal({
          content: '登录失败，请重新打开',
          showCancel: false
        })
      }
    }
    let isSave = wepy.getStorageSync('isSave')
    if (!isSave) {
      let sets = await wepy.getSetting()
      if (sets.authSetting['scope.userInfo']) {
        let user = await wepy.getUserInfo()
        let userInfo = await http({
          url: Config.api.user.save.url,
          method: Config.api.user.save.method,
          data: {
            openid,
            name: user.userInfo.nickName,
            headImgUrl: user.userInfo.avatarUrl
          }
        })
        if (userInfo && userInfo.success) {
          wepy.setStorageSync('isSave', true)
        } else {
          wepy.showModal({
            content: '用户信息读取失败，请重新打开',
            showCancel: false
          })
        }
      }
    }
    wepy.hideLoading()
    this.ready && await this.ready(options)
  }
}
