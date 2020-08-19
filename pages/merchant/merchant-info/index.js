// pages/merchant-enterprise/index.js
Page({

  /**
   * 页面的初始数据
   */
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options.type', options.type);
    const type = options.type || 'personal';
    this.setData({
      type
    });
    wx.setNavigationBarTitle({
      title: type === 'personal' ? '个人经营' : '品牌商家'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onSexChange: function (e) {
    console.log('e.detail.value', e.detail);
    const value = +e.detail.value;
    this.setData({
      info: {
        ...this.data.info,
        selectedSexIndex: value
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
    const type = e.currentTarget.dataset.type;
    let count = e.currentTarget.dataset.count;
    count = isNaN(count) ? 1 : +count;
    console.log(type, count);
    const images = await wx.chooseImage({
      count,
      sizeType: ["compressed"],
      sourceType: ['album', 'camera']
    })
    console.log('images', images);
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
      console.log(valid, errors);
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