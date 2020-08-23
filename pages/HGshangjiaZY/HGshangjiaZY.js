// pages/tansuo/tansuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shangjia:[],
      shangpin:{},
  },

  getshangjia: function (options){
    var id = options.id;
    wx.request({
      url: 'http://182.92.118.35:8098/api/business/selectMyBusiness',
      data: { id: id },
      header: { 'content-type': 'application/json' },
      success: res => {
        if (res.data.code == 0) {
          this.setData({
            shangjia: res.data.data.business,
            shangpin: res.data.data.goods
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getshangjia(options);
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
  //跳转
  sjxiangqing: function () { wx.navigateTo({url: '../HGshangjiaXQ/HGshangjiaXQ',})},
  spXQ: function () { wx.navigateTo({url: '../HGspXQ/HGspXQ',})},
})