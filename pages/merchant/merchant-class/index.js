const merchantApi = require('../../../api/merchant');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList: [],
    classifyId: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const data = await merchantApi.searchAllClassify();
    console.log('data', data);
    this.setData({
      classList: data.data,
      classifyId: {}
    })
  },
  onSelectMerchantClass: function (e) {
    console.log('e', e.currentTarget.dataset.key);
    const key = +e.currentTarget.dataset.key;
    this.setData({
      classifyId: {
        ...this.data.classifyId,
        [key]: !this.data.classifyId[key]
      }
    })
  },
  onSubmitApplyInfo: async function () {
    // submit
    wx.showLoading({
      title: '提交中',
    });

    const types = Object.keys(this.data.classifyId).filter(item => !!this.data.classifyId[item]).join(',')
    try {
      await merchantApi.setMerchantClass(types);
      wx.hideLoading();
      wx.showToast({
        title: '提交成功',
      });
    } catch (e) {
      console.log(e);
      wx.hideLoading();
      wx.showToast({
        title: e && e.messasge || '出错了，请稍后再试',
      });
      return;
    }
    // 根据返回审核结果来决定跳转
    let merchantApplyStatus, reason;
    try {
      const data = await merchantApi.queryApplyStatus();
      merchantApplyStatus = data.data.auditState;
      reason = data.data.reason;
    } catch (e) {
      merchantApplyStatus = -1;
    }
    let targetUrl;
    switch (merchantApplyStatus) {
      case 0:
        targetUrl = `/pages/merchant/audit-result/index?type=fail&msg=${encodeURIComponent(reason)}`;
        break;
      case 2:
        targetUrl = '/pages/merchant/audit-result/index?type=success';
        break;
      case 1:
      default:
        targetUrl = '/pages/merchant/audit-result/index?type=processing';
    }
    wx.reLaunch({
      url: `/pages/mine/mine?url=${encodeURIComponent(targetUrl)}`,
    })
  },
})