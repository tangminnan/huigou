//app.js
App({
  onLaunch: async function () {
    // 登录
    const res = await wx.login();
    console.log('res.code', res.code);
  },
  onHide: function () {
    // 测试，每次启动都重置状态
    this.globalData.isMerchant = false;
    this.globalData.isPromote = false;
  },
  globalData: {
    userInfo: null
  }
})