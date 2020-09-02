const api = require('./request');

// 商家端订单，支付相关操作

async function saveOrder(orderInfo) {
  return api.postJson('/api/home/saveOrder', orderInfo);
}

async function wxPay(orderInfo) {
  const data = await api.postData('/api/pay/wxPay', orderInfo);
  console.log('pay data', data);

  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...data,
      signType: 'MD5',
      success(res) {
        console.log('微信支付成功', res)
        resolve(res)
      },
      fail(e) {
        console.log('微信支付失败', e)
        reject(e)
      }
    })
  })

}

async function cancelOrder(orderId) {
  return api.postData('/api/home/deleteOrderById', {
    orderId
  })
}

async function confirmOrder(orderId) {
  return api.postData('/api/home/confirmOrder', {
    orderId
  })
}

async function updateExpressNo(orderId, expressNo) {
  return api.postData('/api/home/updateOrderTableCourierNumber', {
    orderId,
    courierNumber: expressNo
  })
}

async function confirmRefund(orderId) {
  return api.postData('/api/business/updateOrderRetreat', {
    id: orderId
  })
}
// 退换货订单详情
async function fetchOrderDetail(orderId) {
  return api.getData('/api/business/checkOrderTable', {
    id: orderId
  })
}
// 退换货快递单号
async function updateRetCourierNumber(orderId, retCourierNumber) {
  return api.postData('/api/home/updateOrderTableRetCourierNumber', {
    orderId,
    retCourierNumber
  })
}
// 换货
async function returnGoods(orderId) {
  return api.postData('/api/business/returnGoods', {
    id: orderId
  })
}
// 退货退款
async function retreatGoods(orderId) {
  return api.postData('/api/business/updateOrderRetreat', {
    id: orderId
  })
}

module.exports = {
  saveOrder,
  wxPay,
  cancelOrder,
  confirmOrder,
  updateExpressNo,
  confirmRefund,
  fetchOrderDetail,
  updateRetCourierNumber,
  returnGoods,
  retreatGoods
}