//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    orderId:0,

  },


  //退货款
  huokuan:function(e){
    var type = e.currentTarget.dataset.type;
    var status;
    if(type=='1'){status == 7}
    if (type=='2'){status == 8}
    if (type=='3'){status == 9}
    wx.request({
      method:"POST",
      url: 'https://testh5.server012.com/api/home/returnGoods',
      data:{
        orderId:this.data.orderId,
        status:status
      },
      header:{"Content-Type": "application/x-www-form-urlencoded"},
      success:res=>{
        if(res.data.code== 0){
            wx.showToast({
              title: '操作成功',
              icon:'none',
              duration:200
            })
            let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
            let prevPage = pages[ pages.length - 2 ];  
            prevPage.jiazai();
            wx.navigateBack({
              delta: 1  
            })
        }else{
          wx.showToast({
            title: '操作失败，请稍后重试',
            icon:'none',
            duration:200
          })
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[ pages.length - 2 ];  
          wx.navigateBack({
            delta: 1  
          })
        }
      }
    })
  },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
