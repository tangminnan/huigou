const config = {
  success: {
    img: "/assets/success.png",
    desc: "支付成功",
    detail: "下单成功，请等待商家确认收货"
  },
  fail: {
    img: "/assets/fail.png",
    desc: "支付失败",
    detail: "支付失败，请重新支付"
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
    const addressId = options.addressId;
    const orderId=options.orderNo;
    const type = options.type || 'success';
    const count = options.count || 1;
    const total = Math.floor(count * 4.2 * 100 + 0.5) / 100
    const originTotal = Math.floor(count * 5.2 * 100 + 0.5) / 100
    this.setData({
      addressId,
      orderId,
      count,
      total,
      type,
      originTotal,
      ...config[type]
    })
    console.info("成功交款的订单号 "+this.data.orderId);
    console.info("成功交款后的地址 "+this.data.addressId);
    console.info("成功提交订单 "+type);
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
  //查看订单详情
  getOrderDetail:function(){
      wx.navigateTo({
        url: `/pages/HGdingdanXQ/HGdingdanXQ?orderId=${this.data.orderId}&ddzt=23&addressId=${this.data.addressId}`,
      })
  }

})