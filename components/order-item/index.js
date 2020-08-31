const orderApi = require('../../api/order');
const order = require('../../api/order');

const statusDescMap = {
  0: '等待发货',
  1: '待确认收货',
  2: '已确认收货'
}
const afterSaleStatusDescMap = {
  1: '已同意退款'
}
Component({
  options: {
    styleIsolation: "apply-shared",
  },
  data: {
    StatusMap: {
      0: '待商家确认',
      1: '未出库',
      2: '配送中',
      3: '已取消',
      4: '已完成',
      5: '换货',
      6: '退货',
      7: '退货退款',
      8: '退货中',
      9: '退款中',
      10: '退货完成',
      11: '退款完成',
      12: '退货退款完成'
    },
    DistributionStatusDescMap: {
      5: "用户申请换货",
      6: "用户申请退货",
      7: "用户申请退货退款"
    },
    showPromptModal: false,
    expressNo: ''
  },
  properties: {
    order: {
      type: Object
    },
    mode: {
      type: String
    },
    count: {
      type: Number
    },
    total: {
      type: Number
    },
    originTotal: {
      type: Number
    },
    condtion: {
      type: Number
    }
  },
  methods: {
    onOperateOrderDetail: function (e) {
      console.log('this', this);
      wx.navigateTo({
        url: '/pages/merchant/refund/index',
        success: (res) => {
          res.eventChannel.emit('order-data', this.data.order);
        }
      })
    },
    cancelOrder: async function (e) {
      const orderId = e.currentTarget.dataset.orderId;
      const response = await orderApi.cancelOrder(orderId);
      console.log('response', response);
    },
    confirmOrder: async function (e) {
      const orderId = e.currentTarget.dataset.orderId;
      const response = await orderApi.confirmOrder(orderId);
      console.log('response', response);
    },
    onShowModal: async function (e) {

      // const expressNo = "12345678";
      this.setData({
        showPromptModal: true,
        expressNo: ''
      })

    },
    onExpressNoChange: function (e) {
      this.setData({
        expressNo: e.detail.value
      })
    },
    onUpdateOrderExpressNo: async function (e) {
      const orderId = e.currentTarget.dataset.orderId;
      console.log('orderId', orderId);
      console.log('expressNo', this.data.expressNo);
      try {
        await orderApi.updateExpressNo(orderId, expressNo);
        wx.showToast({
          title: '发货成功',
          icon: 'none'
        })
      } catch (e) {
        wx.showToast({
          title: '出错了，请稍后再试',
          icon: 'none'
        })
      }

    }
  }
})