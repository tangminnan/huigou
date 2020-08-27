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
  return api.postJson('/api/business/UpdateUserInfoByBusiness', {
    id: info.userId,
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
// 0是未通过 1是审核中 2是审核通过
async function queryApplyStatus() {
  const userInfo = await userApi.getOpenId();
  return api.getData(`/api/business/selectBusinessStatus?id=${userInfo.userId}`);
}

module.exports = {
  getMerchantInfo,
  applyToBeBusiness,
  searchAllClassify,
  setMerchantClass,
  queryApplyStatus
}