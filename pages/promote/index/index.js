const app = getApp();

Page({
  data: {
    walletInfo: {
      notRecorded: 500,
      balance: 1500
    }
  },
  onLoad: async function (options) {

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
  onShareTimeline: function () {
    return {
      title: ''
    }
  },
  shareProductToFriend: function () {
    wx.navigateTo({
      url: '/pages/HGfenlei/HGfenlei',
    })
  },
  shareMiniprogramToFriend: function () {
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  sign: function (e) {
    wx.navigateTo({
      url: '/pages/promote/sign/index',
    })
  },
  handleGoWallet: function () {
    wx.navigateTo({
      url: '/pages/promote/wallet/index',
    })
  }
})