const merchantApi = require('../../../api/merchant');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList: [],
    classifyId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const data = await merchantApi.searchAllClassify();
    console.log('data', data);
    this.setData({
      classList: data.data,
      classifyId: data.data[0].id
    })
  },
  onSelectMerchantClass: function (e) {
    console.log('e', e.currentTarget.dataset.key);
    this.setData({
      classifyId: e.currentTarget.dataset.key
    })
  },
  onSubmitApplyInfo: async function () {
    // submit
    wx.showLoading({
      title: '提交中',
    });

    try {
      await merchantApi.setMerchantClass(this.data.classifyId);
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
    let res;
    try {
      res = await merchantApi.getMerchantInfo();
    } catch (e) {
      // 返回500 还不是商家，等待商家注册走通再说
      wx.navigateTo({
        url: '/pages/merchant/audit-result/index?type=processing',
      });
      return;
    }
    switch (res.auditState) {
      case 0:
        wx.navigateTo({
          url: '/pages/merchant/audit-result/index?type=fail',
        });
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/merchant/audit-result/index?type=success',
        });
        break;
      case 1:
      default:
        wx.navigateTo({
          url: '/pages/merchant/audit-result/index?type=processing',
        });
    }
  },
})