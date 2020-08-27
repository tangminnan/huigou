// 获取当前推广员信息
const api = require('./request');

let cacheInfo;

export async function getOpenId() {
  if (cacheInfo) {
    return Promise.resolve(cacheInfo);
  }
  const res = await wx.login();
  console.log('res', res);
  const info = await api.getData('/api/login/getOpenId', {
    code: res.code
  });
  cacheInfo = info;
  return cacheInfo;
}