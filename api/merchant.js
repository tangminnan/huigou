const api = require('./request');
const userApi = require('./user');

export async function getMerchantInfo() {
  const info = await userApi.getOpenId();
  console.log('info', info);
  return api.getData('/api/business/selectMyBusiness', {
    id: info.userId
  });
}