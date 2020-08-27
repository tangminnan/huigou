const payApi = require('../../../api/pay')
const userApi = require('../../../api/user')

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
    if (channel) {
      console.log('shoppingList', channel);
      channel.on('shoppingList', shoppingList => {
        console.log('shoppingList', shoppingList);
        this.setData({
          shoppingList
        })
      })
    }
  },
  onClickSubmit: async function () {
    const userInfo = await userApi.getOpenId();
    await Promise.all(this.data.shoppingList.map(async shop => {
      const data = await payApi.saveOrder({
        hgOrder: {
          addressId: 14,
          payType: 1,
          userId: userInfo.userId,
          account: 200
        },
        hgOrderTables: shop.skuList.map(sku => {
          return {
            goodsId: sku.goodsId,
            merchantsId: shop.shopId,
            userId: userInfo.userId,
            goodsNum: sku.count,
            goodsPrices: sku.price
          }
        })
      })
      console.log('order data', data)
      shop.orderId = data.data.orderId;
    }))

    wx.navigateTo({
      url: `/pages/shopping-cart/order-confirm/index`,
      success: (res) => {
        res.eventChannel.emit('orderList', this.data.shoppingList);
      }
    })
  },
  onClickChooseAddress: function () {
    wx.navigateTo({
      url: '/pages/HGshouhuoDZ/HGshouhuoDZ',
      success: function (res) {
        res.eventChannel.on('choosed_address', address => {
          console.log('address', address);
        })
      }
    })
  },
})