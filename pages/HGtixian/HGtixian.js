//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    yue:0,
    jine:'',
  },


  quanbu:function (){
    this.setData({
      jine: this.data.yue
    })
  },

  txjine: function (e) {
    this.setData({
      jine: e.detail.value
    })
  },
  tixian:function(){
    var tixianed =  parseInt(this.data.jine);
    var shengyued =   this.data.yue;
    //console.info(tixianed+"=="+shengyued);
    if (tixianed > shengyued){
      wx.showToast({
        title: '不得大于余额',
        icon: 'none',
        duration: 3000
      })
      return false;
    }

    //提现


  },

  optionsyue:function (options){
    this.setData({
      yue:options.yue
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.optionsyue(options);
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
