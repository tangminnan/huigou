const shoppingApi = require('../../../api/shopping-cart');

Page({

  /**
   * 页面的初始数据
   * 0: {
   *  checked: false,
   *  skus: {
   *      0: {
   *        checked: false,
   *        count: 1
   *      }
   *  }
   * }
   */
  data: {
    list: [],
    selectedList: {},
    isAllChecked: false
  },
  onShow: async function (options) {
    const res = await shoppingApi.getShoppingCartList();
    const list = res.data;
    const selectedList = {};
    list.forEach((item) => {
      const skus = item.hgGoodsDetailEntity.hgSpecifications;
      const skuInfo = {};
      skus.forEach(sku => {
        skuInfo.checked = false;
        skuInfo.count = 1;
      })
      selectedList[item.hgGoodsDetailEntity.hgGoods.id] = {
        checked: false,
        skus: skuInfo
      }
    })
    this.setData({
      list: res.data,
      selectedList
    })
  },
  onClickSubmit: function (e) {
    wx.navigateTo({
      url: `/pages/shopping-cart/order-submit/index?count=${this.data.count}`,
    })
  },
  onCountChange: function (e) {
    let count = e.detail.value;
    count = Math.floor(count);
    count = count < 1 ? 1 : count;
    count = count > 99 ? 99 : count;
    const total = Math.floor(count * 4.2 * 100 + 0.5) / 100
    this.setData({
      count,
      total
    })
  },
  decrease: function (e) {
    const count = this.data.count - 1 < 1 ? 1 : this.data.count - 1;
    const total = Math.floor(count * 4.2 * 100 + 0.5) / 100
    this.setData({
      count,
      total
    })
  },
  increase: function (e) {
    const count = this.data.count + 1 > 99 ? this.data.count : this.data.count + 1;
    const total = Math.floor(count * 4.2 * 100 + 0.5) / 100
    this.setData({
      count,
      total
    })
  },
  toggleMerchantChange: function (e) {
    const shouldIgnore = e.target.dataset.role === 'input' || e.target.dataset.role === 'decrease' || e.target.dataset.role === 'increase'
    if (!shouldIgnore) {
      const id = e.currentTarget.dataset.id;
      const sl = this.data.selectedList;
      sl[id].checked = true;
      this.setData({
        selectedList: sl
      })
    }
  },
  toggleSkuChange: function (e) {

  },
  toggleAllChange: function (e) {

  }
})