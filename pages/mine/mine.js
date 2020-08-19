// pages/mine/mine.js
Page({
  data: {
    model: 0, //弹框状态
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

  }
})