import wepy from 'wepy'
import http from '@/util/request'
import Config from '@/config/index'

export default class initMixin extends wepy.mixin {
  async saveOrUpdateUser(options, result) {
    let {openid, userExist, userinfo} = result
    let userIf = userinfo || {}
    let sets = await wepy.getSetting()
    if (sets.authSetting['scope.userInfo']) {
      let users = await wepy.getUserInfo()
      if (userExist === 'false') {
        await this.saveUser(openid, users)
      } else {
        let nickName = encodeURIComponent(users.userInfo.nickName)
        if (userIf.name !== nickName || userIf.headImgUrl !== users.userInfo.avatarUrl) {
          await this.saveUser(openid, users)
        }
      }
      this.ready && await this.ready(options)
    } else {
      this.auth && await this.auth(options)
    }
  }
  async saveUser(openid, users) {
    let userInfo = await http({
      url: Config.api.user.save.url,
      method: Config.api.user.save.method,
      data: {
        openid,
        name: users.userInfo.nickName,
        headImgUrl: users.userInfo.avatarUrl
      }
    })
    if (userInfo && userInfo.success) {
    } else {
      wepy.showModal({
        content: '用户信息读取失败，请重新打开',
        showCancel: false
      })
    }
  }
  async onLoad(options) {
    wepy.showLoading({
      title: '正在加载...',
      mask: true
    })
    let openid = wepy.getStorageSync('openid')
      // 重新登录
    let sign = await wepy.login()
    if (sign.code) {
      let data = await http({
        url: `${Config.api.login.url}/${sign.code}`,
        method: Config.api.login.method
      })
      if (data && data.success) {
        let res = data.result
        let {openid, userExist, userinfo} = res
        wepy.setStorageSync('openid', openid)
        this.saveOrUpdateUser && await this.saveOrUpdateUser(options, res)
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
    wepy.hideLoading()
  }
}
