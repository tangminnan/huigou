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


function searchAllClassify() {
  return api.getData('/api/classify/searchAllClassify');
}

async function setMerchantClass(classifyId) {
  const userInfo = await userApi.getOpenId();
  return api.postData(`/api/business/classifyMerchantsMapping?userId=${userInfo.userId}&classifyIds=${classifyId}`)
}

module.exports = {
  getMerchantInfo,
  applyToBeBusiness,
  searchAllClassify,
  setMerchantClass
}