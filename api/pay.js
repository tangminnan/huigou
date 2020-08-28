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

module.exports = {
  saveOrder,
  wxPay
}