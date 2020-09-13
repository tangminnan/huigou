const payApi = require('../../../api/order');
const shoppingApi = require('../../../api/shopping-cart');

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
    const orderId = options.orderId;
    this.setData({
      orderId
    })
    if (channel) {
      channel.on('orderList', data => {
        console.log('orderList', data)
        this.setData({
          ...data
        });
      })
    }
    console.info(this.data.address.id);
  },
  onClickSubmit: async function () {
    await getApp().getUserInfo();
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    try {
      await payApi.wxPay({
        orderNo: this.data.orderId,
        type: 1,
        openId: getApp().globalData.openId,
      });
      wx.hideLoading()
      // 利用我的页面来中专，进而消除购物中间流程页面
      const targetUrl = `/pages/shopping-cart/result/index?type=success&count=${this.data.count}&orderNo=${this.data.orderId}&addressId=${this.data.address.id}`;
      wx.reLaunch({
        url: `/pages/mine/mine?url=${encodeURIComponent(targetUrl)}`,
      })
      this.clearShoppingItem();
    } catch (e) {
      wx.hideLoading()
      // const msg = e && e.msg || '支付失败，请重新支付'
      const targetUrl = `/pages/shopping-cart/result/index?type=fail`;
      wx.reLaunch({
        url: `/pages/mine/mine?url=${encodeURIComponent(targetUrl)}`,
      })
    }
  },
  clearShoppingItem: async function () {
    const cartItemList = [];
    this.data.shoppingList.forEach(shop => {
      shop.skuList && shop.skuList.forEach(sku => {
        cartItemList.push(sku.hgCartId)
      })
    })
    for (let i = 0, len = cartItemList.length; i < len; i++) {
      const cartid = cartItemList[i];
      try {
        await shoppingApi.removeShoppingCartItem(cartid)
      } catch (e) {
        console.log('ignore error', e)
      }
    }

  }
})