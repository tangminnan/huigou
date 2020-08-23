//app.js
App({
  onLaunch: async function () {
    // 登录
   // const res = await 
    wx.login({
        success: res => {
          console.log('res.code', res.code);
          if (res.code) {
            //获取微信小程序的openid
            wx.request({
              url: 'http://182.92.118.35:8098/api/login/getOpenId',
              data: {
                code: res.code
              },
              header: {
                "content-type": "application/json"
              },
              success: res => {
                //console.info(res.data);
              }
            })
          }
        }
    });    
  },
  /*
  onHide: function () {
    // 测试，每次启动都重置状态
    this.globalData.isMerchant = false;
    this.globalData.isPromote = false;
  },
  */
  globalData: {
    //userInfo: null,
    userInfo: {id:1}
  }
})