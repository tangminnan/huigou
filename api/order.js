const api = require('./request');

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

module.exports = {
  saveOrder,
  wxPay,
  cancelOrder,
  confirmOrder,
  updateExpressNo
}