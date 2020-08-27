// pages/tansuo/tansuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    shangjia:{},
    pinlei:[]

  },
//商家信息
  getshangjia: function (options){
    var id = options.id
    wx.request({
      url: 'https://testh5.server012.com/api/business/selectMyBusiness',
      data: { id: id },
      header: { 'content-type': 'application/json' },
      success: res => {
        //console.info(res.data);
        if (res.data.code == 0) {
          this.setData({
            shangjia: res.data.data[0]
          })

        }
      }

    })
  },
//品类
  getpinlei: function (options) {
    
      wx.request({
        url: 'https://testh5.server012.com/api/label/selectLabelByUserId',
        data: { id: options.id },
        header: { 'content-type': 'application/json' },
        success: res => {
          //console.info(res.data);
          if (res.data.code == 0) {
            this.setData({
              pinlei: res.data.data
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
    this.getpinlei(options);
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