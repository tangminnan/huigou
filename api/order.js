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

async function wxRefund(pOrderId, orderId) {
  return api.postData('/api/pay/wxRefund', {
    order: pOrderId,
    orderTableId: orderId
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
// async function returnAndExchangeOfGoods(orderId) {
//   return api.postData('/api/business/returnAndExchangeOfGoods', {
//     id: orderId
//   })
// }
// 退款
// 8换货中 9退款中 10退货退款中
async function processAfterSale(orderId, parentOrderId, status) {
  if (status === 9 || status === 10) {
    await wxRefund(parentOrderId, orderId);
  }
  return api.postData('/api/business/returnGoods', {
    orderId: orderId,
    status
  })
}
async function tuikuan(orderId, parentOrderId) {
  return processAfterSale(orderId, parentOrderId, 9)
}
async function huanhuo(orderId, parentOrderId) {
  return processAfterSale(orderId, parentOrderId, 8)
}
// 退货退款
async function tuikuantuihuo(orderId, parentOrderId) {
  return processAfterSale(orderId, parentOrderId, 10)
}

module.exports = {
  saveOrder,
  wxPay,
  wxRefund,
  cancelOrder,
  confirmOrder,
  updateExpressNo,
  confirmRefund,
  fetchOrderDetail,
  updateRetCourierNumber,
  tuikuan,
  huanhuo,
  tuikuantuihuo
}