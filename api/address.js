const api = require('./request');
const userApi = require('./user');

// 收货地址
async function getAddressList() {
  const info = await userApi.getOpenId();
  return api.getData('/api/address/selectHgAddressByUserId', {
    userId: info.userId
  })
}

module.exports = {
  getAddressList
}