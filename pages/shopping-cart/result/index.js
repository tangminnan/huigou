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
  onLoad: function (options) {
    const addressId = options.addressId;
    const orderId = options.orderNo;
    const type = options.type || 'success';
    const msg = options.msg;
    this.setData({
      addressId,
      orderId,
      type,
      ...config[type],
      detail: msg || config[type].detail
    })
  },
  getOrderDetail: function () {
    wx.navigateTo({
      url: `/pages/HGdingdanXQ/HGdingdanXQ?orderId=${this.data.orderId}&ddzt=23&addressId=${this.data.addressId}`,
    })
  }
})