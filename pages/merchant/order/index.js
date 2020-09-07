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
    const list = [];
    orderList.data.forEach(porder => {
      porder.orderTables && porder.orderTables.forEach(order => {
        list.push({
          shopId: order.hgGoods.merchantsId,
          pOrderId: porder.orderId,
          orderId: order.id,
          goodsId: order.goodsId,
          img: order.hgGoods.hgGoodsFile.picture,
          title: order.hgGoods.title,
          goodsNum: order.goodsNum,
          goodsPrices: order.goodsPrices,
          createTime: order.createTime,
          expressFee: order.expressFee,
          distributionStatus: order.distributionStatus,
          remark: order.remarks,
          courierNumber: order.courierNumber,
          retCourierNumber: order.retCourierNumber
        })
      })
    })

    this.setData({
      orderList: list
    })
  },
  onOrderStateChange: function(e) {
    this.getOrderList()
  }
})