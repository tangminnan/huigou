Page({
  data: {
    tabs: ['待入账', '余额', '提现明细'],
    activeTab: 1,
  },

  onLoad() {

  },

  onTabClick(e) {
    const index = e.currentTarget.dataset.index
    console.log(e)
    this.setData({
      activeTab: index
    })
  },
  onClickWithdraw(e) {
    wx.navigateTo({
      url: '/pages/promote/withdraw/index',
    })
  }
})