const orderApi = require('../../../api/order');
const order = require('../../../api/order');

Page({
  data: {
    order: {}
  },
  onLoad: async function (options) {
    this.orderId = options.orderId;
    this.getOrderDetail();
  },
  getOrderDetail: async function () {
    console.log('orderId', this.orderId);
    let data;
    try {
      data = await orderApi.fetchOrderDetail(this.orderId);
    } catch (e) {
      wx.showToast({
        title: e && e.msg || '出错了，请稍后再试',
        icon: 'none'
      })
      return;
    }
    const order = data.data;
    console.log('order', data.data);
    this.setData({
      order: {
        shopId: order.hgGoods.merchantsId,
        pOrderId: order.parentId,
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
      }
    })
  },
  onEditRetCourierNumber: function (e) {
    this.setData({
      showPromptModal: true
    })
  },
  onExpressNoChange: function (e) {
    console.log('e', e);
    this.setData({
      expressNo: e.detail.value
    })
  },
  onUpdateOrderExpressNo: async function (e) {
    if (!this.data.expressNo) {
      wx.showToast({
        title: '请输入退/换货快递单号',
        icon: 'none'
      })
      return;
    }
    try {
      await orderApi.updateRetCourierNumber(this.orderId, this.data.expressNo);
      this.setData({
        showPromptModal: false,
      });
      wx.showToast({
        title: '设置快递单号成功',
        icon: 'none'
      })
      this.getOrderDetail();
    } catch (e) {
      wx.showToast({
        title: e && e.msg || '出错了，请稍后再试',
        icon: 'none'
      })
      return;
    }
  },
  onRetreatGoods: async function (e) {
    try {
      await orderApi.retreatGoods(this.orderId);
      wx.showToast({
        title: '退货退款成功',
        icon: 'none'
      })
      this.getOrderDetail();
    } catch (e) {
      wx.showToast({
        title: e && e.msg || '出错了，请稍后再试',
        icon: 'none'
      })
      return;
    }
  },
  onReturnGoods: async function (e) {
    try {
      await orderApi.returnGoods(this.orderId);
      wx.showToast({
        title: '退/换货成功',
        icon: 'none'
      })
      this.getOrderDetail();
    } catch (e) {
      wx.showToast({
        title: e && e.msg || '出错了，请稍后再试',
        icon: 'none'
      })
      return;
    }
  }
})