// 获取当前推广员信息
async function getOpenId() {
  return getApp().getUserInfo();
}

module.exports = {
  getOpenId
}