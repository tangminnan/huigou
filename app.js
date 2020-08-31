const api = require('./api/request');

App({
  onLaunch: async function () {
    await this.getUserInfo();
  },
  globalData: {
    openid: '',
    openId: '',
    sessionKey: '',
    userInfo: null,
    user: null,
    //userInfo: {id:1}
  },
  getUserInfo: async function () {
    const app = this;
    if (app.globalData.openid) {
      return Promise.resolve({
        openid: app.globalData.openid,
        openId: app.globalData.openid,
        sessionKey: app.globalData.sessionKey,
        user: app.globalData.user,
        userInfo: app.globalData.user,
      });
    }
    return new Promise((resolve, reject) => {
      wx.login({
        success: async function (res) {
          const data = await api.getData('/api/info/saveOpenId', {
            code: res.code
          })
          //console.info(data)
          app.globalData.openid = data.openId;
          app.globalData.openId = data.openId;
          app.globalData.sessionKey = data.sessionKey;
          app.globalData.user = data.user;
          app.globalData.userInfo = data.user;
          resolve({
            openid: app.globalData.openid,
            openId: app.globalData.openid,
            sessionKey: app.globalData.sessionKey,
            user: app.globalData.user,
            userInfo: app.globalData.user,
          })
        },
        fail(e) {
          reject(e);
        }
      })
    })
  },

})