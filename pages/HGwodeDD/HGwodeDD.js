const app = getApp()

Page({
  data: {
    navbar: ['全部', '待付款', '待收货', '已完成', '退换货'],
    currentTab: 0,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    hiddenmodalput: true,
    model: 0,//快递单号弹框状态

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    orderList:[],
    ifnull:0
  },
  //切换bar
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    this.getOrderzt(e.currentTarget.dataset.idx);
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

  getOrderzt: function (orderFlag){
    
    if (orderFlag == 0) {
      this.getUserOrder(-1); 
    } else if (orderFlag == 1) {
      this.getUserOrder(0); //未支付 
    } else if (orderFlag == 2) {
      this.getUserOrder(1); //待收货 
    } else if (orderFlag == 3) {
      this.getUserOrder(2); //已完成 
    } else {
      this.getUserOrder(3); //退款售后
    }
    
  },

  getUserOrder: function (condition){
    console.info(condition);
    wx.request({
      method: 'GET',
      url: 'http://182.92.118.35:8098/api/home/searchOrderByCondition',
      data:{
        userId: this.data.userInfo.id,
        condition: condition
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.info(res.data.data);
        if (res.data.code == 0 && res.data.data != undefined) {
          this.setData({
            orderList: res.data.data,
            ifnull: 1
          })
        }else{
          this.setData({
            ifnull: 0
          })
        }
      }
    })

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

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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