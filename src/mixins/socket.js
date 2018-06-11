import wepy from 'wepy'
import Config from '@/config/index'
import http from '@/util/request'

export default class socketMixin extends wepy.mixin {
  connectSocket() {
    try {
      wepy.connectSocket({
        url: `${Config.socket}/${this.fightId}/${this.openid}`
      })
    } catch (e) {
      wepy.connectSocket({
        url: `${Config.socket}/${this.fightId}/${this.openid}`
      })
    }
  }
  initSocket() {
    this.connectSocket()
    wepy.onSocketOpen(() => {
      this.socketCount = 0
      this.socketStatus = true
      this.sendJoinBattle()
    })
    wepy.onSocketMessage(res => {
      if (res && res.data) {
        let {data} = res
        try {
          let json = JSON.parse(data)
          this.subscribe(json)
        } catch (e) {}
      }
    })
    wepy.onSocketError(async (e) => {
      this.socketStatus = false
      // setTimeout(async () => {
      //   if (this.socketCount === 9) {
      //     this.socketCount = 0
      //     return
      //   }
      //   ++this.socketCount
      //   this.connectSocket()
      // }, 1000)
    })

    wepy.onSocketClose(async () => {
      this.socketStatus = false
      if (!this.$parent.isClose) {
        let confirms = await wepy.showModal({
          title: '网络提示',
          content: '游戏网络断开连接，请检查网络重连',
          showCancel: true,
          cancelText: '退出',
          confirmText: '重连'
        })
        if (confirms.confirm) {
          this.connectSocket()
        } else {
          this.isExit = false
          wepy.reLaunch({
            url: '/pages/index'
          })
        }
      }
      this.$parent.isClose = false
    })
  }
  sendJoinBattle() {
    let people = this.currPeople || {}
    let json = `{"op":"join","openid":"${this.openid}","name":"${people.name}","fUserId":"${people.id}","headImgUrl":"${people.headImgUrl}","fightId":"${this.fightId}"}`
    wepy.sendSocketMessage({
      data: json
    })
  }
  updateBattleContent() {
    let json = `{"op":"update","fightId":"${this.fightId}","minute":"${this.timeVal}","libType":"${this.quesVal}"}`
    wepy.sendSocketMessage({
      data: json
    })
  }
  async exitGame() {
    let exit = {}
    try {
      exit = await http({
        url: Config.api.battle.quit.url,
        method: Config.api.battle.quit.method,
        data: {
          openid: this.openid,
          fightId: this.fightId
        }
      })
    } catch (e) {}
    if (exit && exit.success) {
    }
    let people = this.currPeople || {}
    let json = `{"op":"exit","openid":"${this.openid}","name":"${people.name}","fUserId":"${people.id}","headImgUrl":"${people.headImgUrl}","fightId":"${this.fightId}"}`
    wepy.sendSocketMessage({
      data: json
    })
  }
  async startGame() {
    let sg = await http({
      url: Config.api.battle.start.url,
      method: Config.api.battle.start.method,
      data: {
        openid: this.openid,
        fightId: this.fightId
      }
    })
    if (sg && sg.success) {
    }
    let json = `{"op":"start","fightId":"${this.fightId}","minute":"${this.timeVal}","libType":"${this.quesVal}"}`
    wepy.sendSocketMessage({
      data: json
    })
  }
  subscribe(data) {
    let {op} = data
    if (op === 'join') {
      this.updatePeople(data.fightUsers)
      this.getCurrPeople(this.openid)
      if (this.currPeople && this.currPeople.ower == '01') {
        this.updateBattleContent()
      }
    } else if (op === 'update') {
      let {minute, libType} = data
      this.times.forEach((item, index) => {
        if (item.val === minute) {
          this.timeIndex = index
          return
        }
      })
      this.questions.forEach((item, index) => {
        if (item.val === libType) {
          this.quesIndex = index
          return
        }
      })
      this.$apply()
    } else if (op === 'exit') {
      this.updatePeople(data.fightUsers)
      this.getCurrPeople(this.openid)
    } else if (op === 'start') {
      this.isExit = false
      let {fightId, libType, minute} = data
      let {name, headImgUrl, id} = this.currPeople || {}
      wepy.redirectTo({
        url: `/pages/battle-games?fightId=${fightId}&classes=${libType}&times=${minute}&name=${name}&headImgUrl=${headImgUrl}&id=${id}`
      })
    } else if (op === 'end') {
      let {endReq, round, libType} = data
      if (endReq === 'true') {
        let urls = `/pages/battle-result?fightId=${this.fightId}&round=${round}&type=${libType}`
        wepy.redirectTo({
          url: urls
        })
      }
    }
  }
  overTime = null
  async gameOver() {
    let go = await http({
      url: Config.api.battle.end.url,
      method: Config.api.battle.end.method,
      data: {
        openid: this.openid,
        fightId: this.fightId
      }
    })
    if (go && go.success) {}
    let {name, headImgUrl, id} = this.currPeople || {}
    let json = `{"op":"end","openid":"${this.openid}","name":"${name}","fUserId":"${id}","headImgUrl":"${headImgUrl}","fightId":"${this.fightId}"}`
    wepy.sendSocketMessage({
      data: json
    })
    this.overTime = setTimeout(() => {
      let urls = `/pages/battle-result?fightId=${this.fightId}&round=${this.round}&type=${this.classes}`
      wepy.redirectTo({
        url: urls
      })
    }, 30000)
  }
  socketStatus = false
  isGameOver = false
  isExit = true
  isGoOut = true
  socketCount = 0
  async onUnload() {
    if (this.isExit) {
      await this.exitGame()
      this.$parent.isClose = true
      this.disconnectSocket()
    }
    if (this.isGameOver) {
      this.$parent.isClose = true
      this.disconnectSocket()
    }
    this.isGameOver = false
    this.isExit = true
    if (this.overTime) clearTimeout(this.overTime)
  }
  async disconnectSocket() {
    await wepy.closeSocket()
  }
}
