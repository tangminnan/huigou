import userApi from '/api/user';
//app.js
App({
  onLaunch: async function () {

    // 登录
    //const res = await wx.login();
    //console.log('res.code', res.code);
    wx.login({
        success: res => {
          console.log('res.code', res.code);
          if (res.code) {
            //获取微信小程序的openid
            wx.request({
              url: 'https://testh5.server012.com/api/info/saveOpenId',
              data: {
                code: res.code
              },
              success: res => {
                //console.info(res.data);
                this.globalData.openid = res.data.openId;
              }
            })
          }
        }
    });    
    // console.log('userApi', userApi);
    // const res = await userApi.getOpenId();
    // console.log('res', res);

  },
  
  // onHide: function () {
  //   // 测试，每次启动都重置状态
  //   this.globalData.isMerchant = false;
  //   this.globalData.isPromote = false;
  // },
  
  globalData: {
    //userInfo: {id：1},
    openid:'',
    userInfo: null
  }
})