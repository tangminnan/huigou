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
  data: {},
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
    }
  }
})