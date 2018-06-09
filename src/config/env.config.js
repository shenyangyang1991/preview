export default {
  dev: {
    imageDomain: 'http://123.57.204.135:8081/filestore/image',
    apiDomain: 'http://123.57.204.135:8081/payliquidation',
    socketDomain: 'ws://123.57.204.135:8081/payliquidation/websocket'
  },
  prod: {
    imageDomain: 'https://judou.daxtech.com.cn/filestore/image',
    apiDomain: 'https://judou.daxtech.com.cn/payliquidation',
    socketDomain: 'wss://judou.daxtech.com.cn/wss'
  },
  version: '1.0.0'
}