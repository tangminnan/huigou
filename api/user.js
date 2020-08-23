// 获取当前推广员信息
import api from './request';

async function getOpenId() {
  const res = await wx.login();
  console.log('res', res);
  return api.getData('/api/login/getOpenId', {
    code: res.code
  });
}

module.exports = {
  getOpenId
}