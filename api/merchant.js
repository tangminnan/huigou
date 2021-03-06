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

async function getOrderListToBeConfirmed() {
  const userInfo = await userApi.getOpenId();
  return api.getData(`/api/business/toBeConfirmed`, {
    id: userInfo.userId,
    condition: 0
  });
}

async function getOrderList(condition) {
  const urlMap = {
    0: '/api/business/toBeConfirmed',
    1: '/api/business/toBeDelivered',
    2: '/api/business/delivered',
    3: '/api/business/returnAndExchangeOfGoods',
    4: '/api/business/confirmed'
  }
  const userInfo = await userApi.getOpenId();
  return api.getData(urlMap[condition], {
    id: userInfo.userId,
    condition
  });
}

async function getOrderListByGoodsId() {}

// 根据商品名字搜索商品列表
async function selectAllGoodsByBusinessAndName(name) {
  const userInfo = await userApi.getOpenId();
  return api.getData('/api/business/selectAllGoodsByBusinessAndName', {
    id: userInfo.userId,
    title: name
  })
}
// 查询所有的商品列表
async function selectAllGoodsByBusiness() {
  const userInfo = await userApi.getOpenId();
  return api.getData('/api/business/selectAllGoodsByBusiness', {
    id: userInfo.userId,
  })
}
// 查询某商品下的所有订单
// condition 0待确认 1待发货 2已发货 3退换/售后
// goodsId
async function searchBusinessOrderByCondition(goodsId, condition) {
  const userInfo = await userApi.getOpenId();
  return api.getData('/api/business/searchBusinessOrderByCondition', {
    id: userInfo.userId,
    goodsId,
    condition
  })
}


async function getOrderDetail(orderId) {
  return api.getData('/api/business/checkOrderTable', {
    id: orderId
  })
}

module.exports = {
  getMerchantInfo,
  applyToBeBusiness,
  searchAllClassify,
  setMerchantClass,
  queryApplyStatus,
  getOrderList,
  getOrderDetail,
  selectAllGoodsByBusiness,
  selectAllGoodsByBusinessAndName,
  searchBusinessOrderByCondition
}