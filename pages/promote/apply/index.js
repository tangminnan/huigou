// pages/apply/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexList: [{
        value: 1,
        label: '男'
      },
      {
        value: 0,
        label: '女'
      }
    ],
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      userInfo: {
        ...this.data.userInfo,
        selectedSexIndex: value
      }
    })
  },
  onUploadCert: async function (e) {
    const images = await wx.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ['album', 'camera']
    })
    console.log('images', images);
    const path = images.tempFilePaths[0];
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        cert: path
      }
    })
  },
  onAgreeChange: function () {
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        isAgree: !this.data.userInfo.isAgree
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
          getApp().globalData.isPromote = true;
          wx.redirectTo({
            url: '/pages/promote/index/index',
          })
          wx.showToast({
            title: '保存成功',
          })
        }, 2000)
      }
    })
  }
})