//获取应用实例
const app = getApp()
Page({  
  data: {    
    items: [
  
    ],

    checkboxArr: [],
    userName: '',//用户名
    phone: '',//手机号
    sex: '',
    shequ: '',
    shequid: '',
    checkValue:[],
    checkboxText: [],

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    },

//所有标签
  biaoqian: function (e) {
    wx.request({
      method: 'GET',
      url: 'https://testh5.server012.com/api/community/searchAllCommunity',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.info(res.data);
        if (res.data.code == 0) {
          this.setData({
            checkboxArr: res.data.data
          })
        }

      }
    })
  },
//保存
  saveshequ: function () {
    wx.request({
      method: 'POST',
      url: 'https://testh5.server012.com/api/info/updateHgUserCommunity',
      data: {
        id: this.data.userInfo.id,
        communityId: this.data.shequid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值
      },
      success: (res) => {
        //console.info(res.data);
        if (res.data.code == 0) {
          wx.showToast({
            title: '操作成功',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  onLoad: function (options) {
    //console.info(options);
    this.biaoqian();
    this.setData({
      userName: options.userName,
      phone: options.phone,
      sex: options.sex,
      checkValue: options.checkValue,
      checkboxText: options.checkboxText,
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
  radioChange: function (e) {
    var shequshu = e.detail.value;
    //console.info(shequshu);
      var sq = e.detail.value.split(',');
      this.setData({
        shequ: sq[0],
        shequid: sq[1]
      });
    this.saveshequ();
    wx.navigateTo({
      url: '../HGgerenXX/HGgerenXX?checkValue=' + JSON.stringify(this.data.checkValue) + '&checkboxText=' + JSON.stringify(this.data.checkboxText) + '&userName=' + this.data.userName + '&phone=' + this.data.phone + '&sex=' + this.data.sex + '&shequ=' + this.data.shequ + '&shequid=' + this.data.shequid,
     })

  },

 
})