const merchantApi = require('../../../api/merchant');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList: [{
      key: 0,
      name: '服装类',
    }, {
      key: 1,
      name: '选项一',
    }, {
      key: 2,
      name: '选项二',
    }, {
      key: 3,
      name: '选项三',
    }, {
      key: 4,
      name: '选项四',
    }, {
      key: 5,
      name: '选项五',
    }, {
      key: 6,
      name: '选项六',
    }, {
      key: 7,
      name: '选项七',
    }, {
      key: 8,
      name: '选项八',
    }],
    merchantInfo: {
      classKey: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const channel = this.getOpenerEventChannel();
    channel.on('merchantInfo', (info) => {
      console.log('receive merchant info', info);
      this.setData({
        merchantInfo: {
          ...this.data.merchantInfo,
          ...info
        }
      })
    })
  },
  onSelectMerchantClass: function (e) {
    console.log('e', e.currentTarget.dataset.key);
    this.setData({
      merchantInfo: {
        ...this.data.merchantInfo,
        classKey: e.currentTarget.dataset.key
      }
    })
  },
  onSubmitApplyInfo: async function () {
    // submit
    wx.showLoading({
      title: '提交中',
    });

    try {
      await merchantApi.applyToBeBusiness(this.data.merchantInfo);
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
    const res = await merchantApi.getMerchantInfo();
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