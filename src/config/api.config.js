export default {
  login: {
    url: '/pages/login',
    method: 'get'
  },
  user: {
    save: {
      url: '/pages/userSave',
      method: 'post'
    }
  },
  news: {
    newsList: {
      url: '/pages/news/form/index',
      method: 'get'
    },
    newNews: {
      url: '/pages/news/form/getNew',
      method: 'get'
    },
    latest: {
      url: '/pages/news/latest',
      method: 'get'
    }
  },
  rankList: {
    url: '/pages/ranking/form/list',
    method: 'post'
  },
  aqTrain: {
    question: {
      url: '/pages/aqTrain/form/list',
      method: 'get'
    },
    result: {
      url: '/pages/aqTrain/form/result',
      method: 'get'
    },
    submit: {
      url: '/pages/aqTrain/form/submit',
      method: 'post'
    }
  },
  aq: {   
    result: {
      url: '/pages/aq/form/result',
      method: 'get'
    },
    submit: {
      url: '/pages/aq/form/submit',
      method: 'post'
    },
    get: {
      url: '/pages/aq/form/list',
      method: 'get'
    }
  },
  advise: {
    url: '/pages/advise/form/submit',
    method: 'get'
  },
  roundTrain: {
    url: '/pages/roundTrain/form/roundResult',
    method: 'get'
  },
  roundResult: {
    url: '/pages/round/form/roundResult',
    method: 'get'
  }
}
