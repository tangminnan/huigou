const orderApi = require('../../api/order');

Component({
  options: {
    styleIsolation: "apply-shared",
  },
  // 0待商家确认 1未出库 2配送中 3已取消 4已完成 5换货 6退款 7退货退款 8退货中 9退款中 10退货退款中 11退货完成12退款完成 13退货退款完成
  data: {
    StatusMap: {
      0: '待商家确认',
      1: '未出库',
      2: '配送中',
      3: '已取消',
      4: '已完成',
      5: '换货',
      6: '退款',
      7: '退货退款',
      8: '退货中',
      9: '退款中',
      10: '退货退款中',
      11: '退货完成',
      12: '退款完成',
      13: '退货退款完成'
    },
    DistributionStatusDescMap: {
      5: "用户申请换货",
      6: "用户申请退款",
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
    }
  },
  methods: {
    onRefusedApply: function (e) {
      this.setData({
        showRefusedModal: true,
        refusedReason: ''
      })
    },
    onConfirmRefusedApply: async function (e) {
      const orderId = e.currentTarget.dataset.orderId;
      if (!this.data.refusedReason) {
        wx.showToast({
          title: '请输入驳回原因',
          icon: 'none'
        })
        return;
      }
      wx.showLoading({
        title: '处理中',
        mask: true
      })
      try {
        const response = await orderApi.refuseAfterSale(orderId, this.data.refusedReason);
        console.log('response', response);
        this.setData({
          showRefusedModal: false,
          refusedReason: ''
        })
        wx.hideLoading();
        wx.showToast({
          title: '处理成功',
          icon: 'none'
        })
        this.triggerEvent('stateChange')
      } catch (e) {
        wx.hideLoading();
        wx.showToast({
          title: e && e.msg || '出错了，请稍后再试',
          icon: 'none'
        })
      }
    },
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
      wx.showLoading({
        title: '处理中',
        mask: true
      })
      try {
        const response = await orderApi.cancelOrder(orderId);
        console.log('response', response);
        wx.hideLoading();
        wx.showToast({
          title: '处理成功',
          icon: 'none'
        })
        this.triggerEvent('stateChange')
      } catch (e) {
        wx.hideLoading();
        wx.showToast({
          title: e && e.msg || '出错了，请稍后再试',
          icon: 'none'
        })
      }
    },
    confirmOrder: async function (e) {
      const orderId = e.currentTarget.dataset.orderId;
      wx.showLoading({
        title: '处理中',
        mask: true
      })
      try {
        const response = await orderApi.confirmOrder(orderId);
        console.log('response', response);
        wx.hideLoading();
        wx.showToast({
          title: '处理成功',
          icon: 'none'
        })
        this.triggerEvent('stateChange')
      } catch (e) {
        wx.hideLoading();
        wx.showToast({
          title: e && e.msg || '出错了，请稍后再试',
          icon: 'none'
        })
      }
    },
    onShowModal: async function (e) {

      // const expressNo = "12345678";
      this.setData({
        showPromptModal: true,
        expressNo: ''
      })

    },
    onRefusedReasonChange: function (e) {
      this.setData({
        refusedReason: e.detail.value
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
      wx.showLoading({
        title: '处理中',
        mask: true
      })
      try {
        await orderApi.updateExpressNo(orderId, this.data.expressNo);
        wx.hideLoading();
        wx.showToast({
          title: '发货成功',
          icon: 'none'
        })
        this.setData({
          expressNo: '',
          showPromptModal: false
        })
        this.triggerEvent('stateChange')
      } catch (e) {
        wx.hideLoading();
        wx.showToast({
          title: e && e.msg || '出错了，请稍后再试',
          icon: 'none'
        })
      }
    },
    // onConfirmRefund: async function (e) {
    //   // 确认退款
    //   const orderId = e.currentTarget.dataset.orderId;
    //   const pOrderId = e.currentTarget.dataset.parentOrderId;
    //   console.log('orderId', orderId);
    //   wx.showLoading({
    //     title: '处理中',
    //     mask: true
    //   })
    //   try {
    //     await orderApi.tuikuan(orderId, pOrderId);
    //     wx.hideLoading();
    //     wx.showToast({
    //       title: '确认退款成功',
    //       icon: 'none'
    //     })
    //     this.triggerEvent('stateChange')
    //   } catch (e) {
    //     wx.hideLoading();
    //     wx.showToast({
    //       title: e && e.msg || '出错了，请稍后再试',
    //       icon: 'none'
    //     })
    //   }
    // },
    onViewDetail: async function (e) {
      const orderId = e.currentTarget.dataset.orderId;
      console.log('orderId', orderId);
      wx.navigateTo({
        url: `/pages/merchant/refund/index?orderId=${orderId}`,
      })
    }
  }
})