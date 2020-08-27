Page({
  onClickApplyEnterprise: function (e) {
    wx.navigateTo({
      url: `/pages/merchant/merchant-info/index?businessType=${e.currentTarget.dataset.type}`,
    })
  },
})