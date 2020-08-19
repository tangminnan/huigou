// pages/shopping-cart/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 1,
    total: 4.2,
    isChecked: true
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
  onClickSubmit: function (e) {
    wx.navigateTo({
      url: `/pages/shopping-cart/order-submit/index?count=${this.data.count}`,
    })
  },
  onCountChange: function (e) {
    let count = e.detail.value;
    count = Math.floor(count);
    count = count < 1 ? 1 : count;
    count = count > 99 ? 99 : count;
    const total = Math.floor(count * 4.2 * 100 + 0.5) / 100
    this.setData({
      count,
      total
    })
  },
  decrease: function (e) {
    const count = this.data.count - 1 < 1 ? 1 : this.data.count - 1;
    const total = Math.floor(count * 4.2 * 100 + 0.5) / 100
    this.setData({
      count,
      total
    })
  },
  increase: function (e) {
    const count = this.data.count + 1 > 99 ? this.data.count : this.data.count + 1;
    const total = Math.floor(count * 4.2 * 100 + 0.5) / 100
    this.setData({
      count,
      total
    })
  },
  toggleChange: function (e) {
    const shouldIgnore = e.target.dataset.role === 'input' || e.target.dataset.role === 'decrease' || e.target.dataset.role === 'increase'
    if (!shouldIgnore) {

      this.setData({
        isChecked: !this.data.isChecked
      })
    }
  }
})