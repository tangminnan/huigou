// pages/withdraw/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 560
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onClickWithdrawAll: function () {
    this.setData({
      money: this.data.balance
    })
  },
  onInputMoeny: function (e) {
    this.setData({
      money: e.detail.value
    })
  },
  onClickSubmit: function (e) {
    wx.showLoading({
      mask: true,
      title: '处理中'
    });
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '申请成功，请耐心等待',
      })
    }, 2000);
  }
})