// pages/mine/mine.js
//获取应用实例
const app = getApp()
Page({
  data: {
    model: 0, //弹框状态
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    hgUserInfo:{},
    hgExtensionAccount:{},

  },

  getUserxx:function(){
    wx.request({
      method:'Get',
      url: 'http://182.92.118.35:8098/api/info/selectMyUser',
      data: { id: this.data.userInfo.id},
      header: { 'content-type': 'application/json' },
      success:res=>{
        console.info(res.data);
        if (res.data.code==0){
          this.setData({
            hgUserInfo:res.data.data.hgUserInfo,
            hgExtensionAccount:res.data.data.hgExtensionAccount
          })
        }
      }
    })
  },


  showview: function () { //弹框显示
    this.setData({
      model: 1
    })
    console.log("111")
  },
  model1: function () { //弹框消失
    this.setData({
      model: 0
    })
  },

  //跳转
  bianji: function () {
    wx.navigateTo({
      url: '../HGgerenXX/HGgerenXX',
    })
  },
  findDD: function () {
    wx.navigateTo({
      url: '../HGzhaohuiDD/HGzhaohuiDD',
    })
  },
  allDD: function () {
    wx.navigateTo({
      url: '../HGwodeDD/HGwodeDD',
    })
  },
  myDZ: function () {
    wx.navigateTo({
      url: '../HGshouhuoDZ/HGshouhuoDZ',
    })
  },
  myshezhi: function () {
    wx.navigateTo({
      url: '../HGshezhi/HGshezhi',
    })
  },
  myMoney: function () {
    wx.navigateTo({
      url: '../HGwodeQB/HGwodeQB',
    })
  },
  onGoSign: function () {
    wx.navigateTo({
      url: '/pages/promote/sign/index',
    })
  },
  onApplyMerchant: function () {
    const app = getApp()
    if (!app.globalData.isMerchant) {
      wx.navigateTo({
        url: '/pages/merchant/merchant-apply/index',
      })
    } else {
      wx.navigateTo({
        url: '/pages/merchant/index/index',
      })
    }
  },
  onApplyPromote: function () {
    const app = getApp()
    if (!app.globalData.isPromote) {
      wx.navigateTo({
        url: '/pages/promote/apply/index',
      })
    } else {
      wx.navigateTo({
        url: '/pages/promote/index/index',
      })
    }

  },

 onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
   this.getUserxx();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})