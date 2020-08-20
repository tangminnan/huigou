import userApi from '/api/user';
//app.js
App({
  onLaunch: async function () {
    console.log('userApi', userApi);
    const res = await userApi.getOpenId();
    console.log('res', res);

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