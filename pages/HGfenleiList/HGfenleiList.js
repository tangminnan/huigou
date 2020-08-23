// pages/tansuo/tansuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changpin:[],

  },

  getfenleiList: function (options){
   var id =  options.id;
    wx.request({
      url: 'http://182.92.118.35:8098/api/classify/searchAllGoodsByClassifyId',
      data: { id: id },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.info(res.data);
        if (res.data.code == 0) {
          this.setData({
            changpin: res.data.data
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfenleiList(options);
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
spxqing:  function  (e)  {
    let id = e.target.dataset.id;
    wx.navigateTo({
      url:  '../HGspXQ/HGspXQ?id=' + id,
    })
  },
  sjZY:  function  (e)  {
    let id = e.target.dataset.id;
    wx.navigateTo({
      url:  '../HGshangjiaZY/HGshangjiaZY?id' + id,
    })
  },

})