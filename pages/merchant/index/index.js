//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: async function (options) {
  },
  onClickOrder: function (e) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/merchant/order/index?type=${type}`,
    })
  }
})