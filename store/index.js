import qs from 'qs'

export const state = () => ({
  group: 'USDT', //交易区
  currency: 'BTC', //币种名
  fvId: 1, // 币种id
  usertoken: '',
  priceDatas: '',
  noticeList: '',
  postList: '',
  noticeListByType: '',
  postListByType: '',
  rate: '',
  // star: [],
  historicalOrder: '',
  balances: {},
  updateOrderStatus: 0,
  historyData: [],
  currentData: [],
  userInfo: '', // 用户信息
  userbalances: 0, // 用户余额
  userbalancesCurrency: 0, // 用户余额Currency
  p_purchasePrice: null, // 买入金额
  p_purchaseNum: null, // 买入数量
  s_selloutPrice: null, // 卖出金额
  s_selloutNum: null, // 卖出数量
  v_needTradePasswd: 0, //是否需要交易密码

  state_entrustListLog: [], // 用户历史委托订单列表
  state_entrustList: [], // 用户限价委托订单列表
  orderType: '', //下单类型
  fbalance: 0, //法币账户余额
  Cbalance: 0, //币币账户余额
  isSeller: 0 ,//0：用户 1：商家
  systemNoticeUnReads:""//站内信未读消息数量
})

export const mutations = {
  SET_entrustList(state, data) {
    state.state_entrustList = data
  },
  SET_entrustListLog(state, data) {
    state.state_entrustListLog = data
  },
  SET_business(state, data) {
    if(data.index==1){
      state.p_purchasePrice = data.e
      state.p_purchaseNum = data.n
    }else{
      state.s_selloutPrice = data.e
      state.s_selloutNum = data.n
    }
  },
  SET_v_needTradePasswd(state, data) {
    state.v_needTradePasswd = data
  },
  SET_s_selloutPrice(state, data) {
    state.s_selloutPrice = data
  },
  SET_s_selloutNum(state, data) {
    state.s_selloutNum = data
  },
  SET_p_purchasePrice(state, data) {
    state.p_purchasePrice = data
  },
  SET_p_purchaseNum(state, data) {
    state.p_purchaseNum = data
  },
  updateOrderStatus(state, data) {
    state.updateOrderStatus = data
  },
  usertoken(state, data) {
    state.usertoken = data
  },
  priceDatas(state, data) {
    state.priceDatas = data
  },
  SET_noticeList(state, data) {
    state.noticeList = data.data
  },
  SET_postList(state, data) {
    state.postList = data
  },
  SET_noticeListByType(state, data) {
    state.noticeListByType = data.data
  },
  SET_postListByType(state, data) {
    state.postListByType = data
  },
  SET_rate(state, data) {
    state.rate = data.data
  },
  SET_historicalOrder(state, data) {
    state.historicalOrder = data
  },
  SET_balances(state, data) {
    state.balances = data
  },
  SET_userbalances(state, data) {
    if (data) {
      for (var item in data.balanceList) {
        if (data.balanceList[item].name == state.group) {
          state.userbalances = data.balanceList[item].total
          return
        } else {
          state.userbalances = 0
        }
      }
    }
  },
  SET_userbalancesCurrency(state, data) {
    if (data) {
      for (var item in data.balanceList) {
        if (data.balanceList[item].name == state.currency) {
          state.userbalancesCurrency = data.balanceList[item].total
          return
        } else {
          state.userbalancesCurrency = 0
        }
      }
    }
  },
  SET_fvId(state, data) {
    state.fvId = data
  },
  SET_currency(state, data) {
    state.currency = data
  },
  SET_group(state, data) {
    state.group = data
  },
  SET_historyData(state, data) {
    state.historyData = data
  },
  SET_currentData(state, data) {
    state.currentData = data
  },
  SET_userInfo(state, data) {
    state.userInfo = data
  },
  //下单类型：买入 卖出
  changeType(state, data) {
    state.orderType = data;
  },
  //法币账户余额
  setFbalance(state, data) {
    state.fbalance = data;
  },
  //币币账户余额
  setCbalance(state, data) {
    state.Cbalance = data;
  },
  //设置法币用户身份
  setBusiness(state, data) {
    state.isSeller = data;
  },
  systemNoticeUnReads(state,data){
    state.systemNoticeUnReads = data;
  }
}

export const actions = {
  async GET_userInfo({
    commit
  }) {
    let data = await this.$axios.$get('/api/v1/session')
    commit('SET_userInfo', data)
  },
  async GET_historyData({
    commit,
    state
  }) {
    var params = new URLSearchParams()
    params.append('id', state.fvId)
    params.append('page', 1)
    params.append('pageSize', 15)
    this.$axios.post('/api/v1/account/history', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        let datas = []
        for (var i in response.data.data) {
          if (response.data.data[i].sellName == state.currency) {
            datas.push(response.data.data[i])
          }
        }
        commit('SET_historyData', response.data.data.rows);
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  async GET_currentData({
    commit,
    state
  }) {
    var params = new URLSearchParams()
    params.append('id', state.fvId)
    params.append('page', 1)
    params.append('pageSize', 15)
    this.$axios.post('/api/v1/account/opening', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        let datas = []
        for (var i in response.data.data) {
          if (response.data.data[i].sellName == state.currency) {
            datas.push(response.data.data[i])
          }
        }
        commit('SET_currentData', response.data.data.rows)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  async GET_priceData({
    commit
  }) {
    let data = await this.$axios.$get('/api/v2/market/coins')
    commit('priceDatas', data.dataMap)
  },
  async GET_noticeList({
    commit
  }, requestData) {
    let data = await this.$axios.$get('/api/v1/articleCenter', {
      params: requestData
    })
    commit('SET_noticeList', data)
    commit('SET_postList', data)
  },
  async GET_noticeListByType({
    commit
  }, requestData) {
    let data = await this.$axios.$get('/api/v1/articleList', {
      params: requestData
    })
    commit('SET_noticeListByType', data)
    commit('SET_postListByType', data)
  },
  async GET_rate({
    commit
  }) {
    let data = await this.$axios.$get('/api/v2/market/getUsdtPrice')
    commit('SET_rate', data)
  },
  async GET_balances({
    commit
  }) {
    let data = await this.$axios.$post('/api/v1/account/balances')
    commit('SET_balances', data)
    commit('SET_userbalances', data.data)
    commit('SET_userbalancesCurrency', data.data)
  },
  //法币账户
  async getBalance({
    commit,
    state
  }, obj) {
    var params = new URLSearchParams()
    params.append('fuId', state.userInfo.data.id)
    params.append('fvId', obj.fvId)
    this.$axios.post(obj.url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      if (res.data.code == 200) {
        commit('setFbalance', res.data.data.fbalance);
        commit('setBusiness', res.data.data.ftype);
      }
    }).catch(error => {
      console.log(error)
    })
  },
  //币币账户
  async getChangeBalance({
    commit,
    state
  }, obj) {
    var params = new URLSearchParams()
    params.append('fuId', state.userInfo.data.id)
    params.append('fvId', obj.fvId)
    this.$axios.post(obj.url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      if (res.data.code == 200) {
        commit('setCbalance', res.data.data.ftotal)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  //设置未读站内消息数量
  async setUserSystemNoticeUnReads({
    commit
  }) {
    let data = await this.$axios.$get('/api/v1/systemNotice/unReads')
    if(data.data == null || data.data < 1){
      data.data = '';
    }
    commit('systemNoticeUnReads', data.data)
  }
}
