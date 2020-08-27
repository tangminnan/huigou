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
    if (channel) {
      channel.on('orderList', orderList => {
        console.log('orderList', orderList)
        this.setData({
          orderList
        });
      })
    }
  },
  onClickSubmit: async function () {
    await getApp().getUserInfo();
    try {
      await Promise.all(
        this.data.orderList.map(async order => {
          await payApi.wxPay({
            orderNo: order.orderId,
            type: 1,
            openId: getApp().globalData.openId,
          });
        }))

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