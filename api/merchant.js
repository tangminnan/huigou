const api = require('./request');
const userApi = require('./user');

async function getMerchantInfo() {
  const info = await userApi.getOpenId();
  console.log('info', info);
  return api.getData('/api/business/selectMyBusiness', {
    id: info.userId
  });
}

module.exports = {
  getMerchantInfo
}