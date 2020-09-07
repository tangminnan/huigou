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
    const businessType = options.businessType === undefined ? 1 : options.businessType;
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

    const images = await wx.chooseImage({
      count,
      sizeType: ["compressed"],
      sourceType: ['album', 'camera']
    })

    const userInfo = await userApi.getOpenId();
    const uploadedImages = [];
    for (let i = 0, len = images.tempFilePaths.length; i < len; i++) {
      const target = images.tempFilePaths[i];
      wx.showLoading({
        title: '上传中',
      })
      try {
        await requestApi.saveImage(target, userInfo.userId, type, 0)
        uploadedImages.push(target);
        wx.hideLoading()
      } catch (e) {
        wx.hideLoading()
        wx.showToast({
          title: '部分图片上传失败，请稍后重试',
          icon: 'none'
        })
      }
    }
    console.log(field, type, count, uploadedImages);
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

    const {
      address,
      selectedSexIndex,
      certification,
      license,
      otherAuth,
      others,
      ...otherInfos
    } = this.data.info;

    if (this.data.businessType === 0) {
      if (!certification || !certification.length) {
        return wx.showToast({
          title: '请上传品牌授权',
          icon: 'none'
        })
      }
    }
    if (!license || !license.length) {
      return wx.showToast({
        title: '请上传营业支招',
        icon: 'none'
      })
    }
    if (this.data.businessType === 1) {
      if (!otherAuth || !otherAuth.length) {
        return wx.showToast({
          title: '请上传相关证照',
          icon: 'none'
        })
      }
    }

    if (!address) {
      return wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
    }
    if (!otherInfos.phone) {
      return wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
    }
    if (!otherInfos.shopName) {
      return wx.showToast({
        title: '请输入店铺名称',
        icon: 'none'
      })
    }
    if (!otherInfos.introduction) {
      return wx.showToast({
        title: '请输入店铺说明',
        icon: 'none'
      })
    }

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