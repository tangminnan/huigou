const requestApi = require('../../../api/request');
const userApi = require('../../../api/user');
const ensureAuth = require('../../../api/auth');
const merchantApi = require('../../../api/merchant');


Page({
  data: {
    sexList: [{
      key: 1,
      label: "男"
    }, {
      key: 0,
      label: "女"
    }],
    info: {
      selectedSexIndex: 0
    }
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
    // 待确认这里的选择地址是跳转到哪里
    // 和用户收获地址含义明显不同，暂时同
    console.log('scope address');
    await ensureAuth('scope.address');
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
    const field = e.currentTarget.dataset.field;
    const type = e.currentTarget.dataset.type;
    let count = e.currentTarget.dataset.count;
    count = isNaN(count) ? 1 : +count;
    console.log(field, type, count);
    const images = await wx.chooseImage({
      count,
      sizeType: ["compressed"],
      sourceType: ['album', 'camera']
    })

    const userInfo = await userApi.getOpenId();
    const uploadedImages = [];
    for (let i = 0, len = images.tempFilePaths.length; i < len; i++) {
      const target = images.tempFilePaths[i];
      await requestApi.saveImage(target, userInfo.userId, type, 0)
      uploadedImages.push(target);
    }

    console.log('res', res);

    this.setData({
      info: {
        ...this.data.info,
        [field]: uploadedImages
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
  submitForm: async function () {
    console.log('info', this.data.info);

    // validate


    const {
      address,
      selectedSexIndex,
      ...otherInfos
    } = this.data.info;

    const submitData = {
      ...otherInfos,
      businessType: +this.data.businessType,
      address: `${address.provinceName}${address.cityName}${address.countyName} ${address.detailInfo} ${address.postalCode}     ${address.userName} ${address.telNumber}`,
      sex: this.data.sexList[selectedSexIndex].key
    }
    wx.showLoading({
      title: '提交中',
    });

    try {
      await merchantApi.applyToBeBusiness(submitData);
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
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/merchant/merchant-class/index'
      })
    }, 2000);
  }
})