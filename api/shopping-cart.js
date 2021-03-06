const request = require('./request');
const userApi = require('./user');


async function getShoppingCartList() {
  const userInfo = await userApi.getOpenId();
  const res = await request.getData('/api/cart/searchMyCartByUserId', {
    userId: userInfo.userId
  });
  console.log('res', res);
  return res;
}


async function removeShoppingCartItem(id) {
  const res = await request.postData('/api/cart/deleteOneMyCart', {
    id
  });
}

module.exports = {
  getShoppingCartList,
  removeShoppingCartItem
}