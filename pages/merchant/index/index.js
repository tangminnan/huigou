const merchantApi = require('../../../api/merchant');

Page({
  data: {

  },
  onLoad: async function (options) {
    this.getMerchantInfo()
    this.getGoodsInfo()
  },
  getMerchantInfo: async function () {
    const info = await merchantApi.getMerchantInfo();
    console.log('info', info);
    this.setData({
      shopName: info.data[0].shopName,
      // productList: info.data[1].map(item => {
      //   return {
      //     id: item.id,
      //     image: item.hgGoodsFiles[0].picture,
      //     title: item.title,
      //     price: item.hgSpecifications[0].goodsPresentPrice
      //   }
      // })
    })
  },
  getGoodsInfo: async function () {
    try {
      const list = await merchantApi.selectAllGoodsByBusiness();
      const productList = list.map(item => {
        return {
          id: item.id,
          image: item.hgGoodsFiles[0].picture,
          title: item.title,
          price: item.hgSpecifications[0].goodsPresentPrice
        }
      })
      this.setData({
        productList
      })
    } catch (e) {
      console.error('查询店铺所有的商品列表失败', e)
    }

  },
  onClickOrder: function (e) {
    // const type = e.currentTarget.dataset.type;
    const goodsId = e.currentTarget.dataset.goodsId;
    wx.navigateTo({
      url: `/pages/merchant/order/index?goodsId=${goodsId||''}`,
    })
  },
  onSearch: async function (e) {
    console.log('input value', e.detail.value);
    wx.showLoading({
      title: '处理中',
    })
    try {
      const list = await merchantApi.selectAllGoodsByBusinessAndName(e.detail.value)
      const productList = list.map(item => {
        return {
          id: item.id,
          image: item.hgGoodsFiles[0].picture,
          title: item.title,
          price: item.hgSpecifications[0].goodsPresentPrice
        }
      })
      this.setData({
        productList
      })
      wx.hideLoading()
    } catch (e) {
      console.error('搜索失败', e);
      wx.hideLoading()
      wx.showToast({
        title: e && e.msg || '搜索失败，请稍后重试',
        icon: 'none'
      })
    }
  },
  goEditProfile: function (e) {
    wx.navigateTo({
      url: '/pages/HGgerenXX/HGgerenXX',
    })
  }
})