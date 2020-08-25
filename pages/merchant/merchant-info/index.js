const requestApi = require('../../../api/request');
const userApi = require('../../../api/user');

Page({
  data: {
    sexList: [{
      key: 1,
      label: "男"
    }, {
      key: 0,
      label: "女"
    }],
    info: {}
  },
  onLoad: function (options) {
    console.log('options.businessType', options.businessType);
    const businessType = options.businessType || 1;
    this.setData({
      businessType
    });
    wx.setNavigationBarTitle({
      title: businessType === 1 ? '个人经营' : '品牌商家'
    })
  },
  onFormChage: function (e) {
    console.log('e', e);
    const fieldName = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      info: {
        ...this.data.info,
        [fieldName]: value
      }
    })
  },
  onChooseAddress: async function (e) {
    const response = await wx.chooseAddress();
    console.log('response', response);
    this.setData({
      info: {
        ...this.data.info,
        address: response
      }
    })
  },
  onUploadImage: async function (e) {
    const type = e.currentTarget.dataset.field;
    let count = e.currentTarget.dataset.count;
    count = isNaN(count) ? 1 : +count;
    console.log(type, count);
    const images = await wx.chooseImage({
      count,
      sizeType: ["compressed"],
      sourceType: ['album', 'camera']
    })

    const userInfo = await userApi.getOpenId();
    const res = await requestApi.uploadFile({
      userId: userInfo.userId,
      filePath: images.tempFilePaths[0],
      type: 3,
      businessOrExtension: 0
    })
    console.log('res', res);

    this.setData({
      info: {
        ...this.data.info,
        [type]: images.tempFilePaths
      }
    })
  },
  onAgreeChange: function () {
    this.setData({
      info: {
        ...this.data.info,
        isAgree: !this.data.info.isAgree
      }
    })
  },
  submitForm: function () {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        wx.showToast({
          title: '校验通过'
        });
        wx.showNavigationBarLoading();
        setTimeout(() => {
          wx.hideNavigationBarLoading();
          getApp().globalData.isMerchant = true;
          wx.redirectTo({
            url: '/pages/merchant/audit-result/index?type=success'
          })
          wx.showToast({
            title: '保存成功',
          })
        }, 2000)
      }
    })
  }
})