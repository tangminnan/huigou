const config = {
  success: {
    img: "../../../assets/success.png",
    desc: "审核通过",
    detail: "恭喜您，审核已通过"
  },
  processing: {
    img: "../../../assets/processing.png",
    desc: "等待处理",
    detail: "请您耐心等待工作人员与您联系"
  },
  fail: {
    img: "../../../assets/fail.png",
    desc: "审核未通过",
    detail: "未通过原因：营业执照没有通过"
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type || 'processing';
    console.log('type', type);
    this.setData({
      ...config[type]
    })
    if (type === 'success') {
      setTimeout(() => {
        const targetUrl = '/pages/merchant/index/index'
        wx.reLaunch({
          url: `/pages/mine/mine?url=${encodeURIComponent(targetUrl)}`,
        })
      }, 2000)
    }
  }
})