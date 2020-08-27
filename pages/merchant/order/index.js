const merchantApi = require('../../../api/merchant');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      type: "notRecorded",
      title: "待确认",
    }, {
      type: "notShipped",
      title: "待发货",
    }, {
      type: 'shipped',
      title: "已发货",
    }, {
      type: 'inAfterSale',
      title: "退换货",
    }, {
      type: 'confirmed',
      title: "已确认",
    }],
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type || 'notRecorded'
    const idx = this.data.tabs.findIndex(tab => tab.type == type);
    console.log('type', type, idx);
    this.setData({
      activeTab: idx == -1 ? 0 : idx
    }, () => {
      this.getOrderList(this.data.activeTab)
    })
  },
  onChangeActiveTab: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeTab: index
    }, () => {
      this.getOrderList(this.data.activeTab)
    })
  },
  getOrderList: async function () {
    const orderList = await merchantApi.getOrderList(this.data.activeTab);
    console.log('orderList', orderList)
  }
})