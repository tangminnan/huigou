// 获取当前推广员信息
async function getOpenId() {
  const data = await getApp().getUserInfo();
  return {
    userId: data.user.id
  };
}

module.exports = {
  getOpenId
}