const payApi = require('../../../api/pay');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const channel = this.getOpenerEventChannel();
    const orderId = options.orderId;
    this.setData({
      orderId
    })
    if (channel) {
      channel.on('orderList', data => {
        console.log('orderList', data)
        this.setData({
          ...data
        });
      })
    }
  },
  onClickSubmit: async function () {
    await getApp().getUserInfo();
    try {
      await payApi.wxPay({
        orderNo: this.data.orderId,
        type: 1,
        openId: getApp().globalData.openId,
      });
      wx.navigateTo({
        url: `/pages/shopping-cart/result/index?type=success&count=${this.data.count}`,
      })
    } catch (e) {
      wx.navigateTo({
        url: `/pages/shopping-cart/result/index?type=fail`,
      })
    }
  }
})