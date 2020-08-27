const api = require('./api/request');

App({
  onLaunch: async function () {
    await this.getUserInfo();
  },
  globalData: {
    openid: '',
    userInfo: null
  },
  getUserInfo: async function () {
    if (this.globalData.userInfo) {
      return Promise.resolve(this.globalData.userInfo);
    }
    const app = this;
    return new Promise((resolve, reject) => {
      wx.login({
        success: async function (res) {
          const data = await api.getData('/api/info/saveOpenId', {
            code: res.code
          })
          const info = await api.getData('/api/login/getOpenId', {
            code: res.code
          });
          app.globalData.openid = data.openId;
          app.globalData.userInfo = info;
          app.globalData.userInfo.openId = data.openId
          resolve(app.globalData.userInfo);
        },
        fail(e) {
          reject(e);
        }
      })
    })
  }
})