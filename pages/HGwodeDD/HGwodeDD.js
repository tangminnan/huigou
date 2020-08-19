const app = getApp()

Page({
  data: {
    navbar: ['全部', '待付款', '待收货', '已完成', '退换货'],
    currentTab: 0,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    hiddenmodalput: true,
    model: 0,//快递单号弹框状态
  },
  //切换bar
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
    app.globalData.currentTab = e.currentTarget.dataset.idx;
  },
  onShow() {
    this.setData({
      currentTab: app.globalData.currentTab
    })
  },

  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
    })
    //全局变量
    app.globalData.currentTab = e.detail.current;
  },
  //高度
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight - 50
        });
      }
    })
  },

  //填写运单号弹框
  showview: function () {//弹框显示
    this.setData({
      model: 1
    })
    console.log("111")
  },
  model1: function () {//弹框消失
    this.setData({
      model: 0
    })
  },

  //============填写运单号成功提示
  showok:function() {
    wx.showToast({
        title: '已完成',
        icon: 'success',
        duration: 2000
    })
  },

  //跳转
  tuiHuan: function () { wx.navigateTo({url: '../HGtuihuo/HGtuihuo',})},
  goPay: function () { wx.navigateTo({url: '../HGdingdanXQ/HGdingdanXQ',})},

})