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
      wx.navigateTo({
        url: `/pages/shopping-cart/result/index?type=success&count=${this.data.count}&orderNo=${this.data.orderId}&addressId=${this.data.address.id}`,
      })
      this.clearShoppingItem();
    } catch (e) {
      wx.hideLoading()
      wx.navigateTo({
        url: `/pages/shopping-cart/result/index?type=fail`,
      })
    }
  },
  clearShoppingItem: async function () {
    const cartItemList = [];
    this.data.shoppingList.forEach(shop => {
      shop.skuList && shop.skuList.forEach(sku => {
        cartItemList.push(sku.hgCartIds)
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