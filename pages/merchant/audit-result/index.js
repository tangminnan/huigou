const config = {
  success: {
    img: "../../../assets/success.png",
    desc: "审核通过",
    detail: "恭喜您，审核已通过"
  },
  processing: {
    img: "../../../assets/processing.png",
    desc: "等待处理",
    detail: "请您耐心等待工作人员与您联系"
  },
  fail: {
    img: "../../../assets/fail.png",
    desc: "审核未通过",
    detail: "未通过原因：营业执照没有通过"
  }
}
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
    const type = options.type || 'processing';
    console.log('type', type);
    this.setData({
      ...config[type]
    })
    if (type === 'success') {
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/merchant/index/index',
        })
      }, 2000)
    }
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

  }
})