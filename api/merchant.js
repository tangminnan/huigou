const api = require('./request');
const userApi = require('./user');

async function getMerchantInfo() {
  const info = await userApi.getOpenId();
  console.log('info', info);
  return api.getData('/api/business/selectMyBusiness', {
    id: info.userId
  });
}

async function applyToBeBusiness(applyInfo) {
  const info = await userApi.getOpenId();
  return api.postData('/api/business/UpdateUserInfoByBusiness', {
    userId: info.userId,
    ...applyInfo,
  })
}


module.exports = {
  getMerchantInfo,
  applyToBeBusiness
}