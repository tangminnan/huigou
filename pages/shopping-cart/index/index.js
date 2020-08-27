const shoppingApi = require('../../../api/shopping-cart');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 1,
    total: 4.2,
    isChecked: true
  },
  onLoad: async function (options) {
    const res = await shoppingApi.getShoppingCartList();
    console.log('res', res);
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
  toggleChange: function (e) {
    const shouldIgnore = e.target.dataset.role === 'input' || e.target.dataset.role === 'decrease' || e.target.dataset.role === 'increase'
    if (!shouldIgnore) {

      this.setData({
        isChecked: !this.data.isChecked
      })
    }
  }
})