const merchantApi = require('../../../api/merchant');
const app = getApp()

Page({
  data: {

  },
  onLoad: async function (options) {
    const info = await merchantApi.getMerchantInfo();
    console.log('info', info);
    this.setData({
      shopName: info.data[0].shopName,
      productList: info.data[1].map(item => {
        return {
          id: item.id,
          image: item.hgGoodsFiles[0].picture,
          title: item.title,
          price: item.hgSpecifications[0].goodsPresentPrice
        }
      })
    })
  },
  onClickOrder: function (e) {
    const type = e.currentTarget.dataset.type;
    const goodsId = e.currentTarget.dataset.goodsId;
    wx.navigateTo({
      url: `/pages/merchant/order/index?type=${type}&goodsId=${goodsId||''}`,
    })
  }
})