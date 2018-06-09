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
  },
  battle: {
    create: {
      url: '/pages/fight/form/add',
      method: 'post'
    },
    join: {
      url: '/pages/fight/form/join',
      method: 'post'
    },
    quit: {
      url: '/pages/fight/form/exit',
      method: 'post'
    },
    start: {
      url: '/pages/fight/form/start',
      method: 'post'
    },
    get: {
      url: '/pages/aqFight/form/list',
      method: 'get'
    },
    submit: {
      url: '/pages/aqFight/form/submit',
      method: 'post'
    },
    end: {
      url: '/pages/fight/form/end',
      method: 'post'
    },
    result: {
      url: '/pages/aqFight/form/result',
      method: 'get'
    },
    tresult: {
      url: '/pages/roundFight/form/roundResult',
      method: 'get'
    }
  }
}