// pages/mine/mine.js
//获取应用实例
import userApi from '../../api/user';
import merchantApi from '../../api/merchant';

const app = getApp()
Page({
  data: {
    model: 0, //弹框状态
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    hgUserInfo: {},
    hgExtensionAccount: {},

    merchantApplyStatus: 0,

    shareuId: 0
  },

  //微信小程序下拉刷新
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    this.getUserxx();
  },

  //获取用户信息
  getUserxx: async function () {
    //console.info(this.data.userInfo.id)
    const userInfo = await userApi.getOpenId();
    wx.request({
      method: 'Get',
      url: 'https://testh5.server012.com/api/info/selectMyUser',
      data: {
        id: userInfo.userId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        //console.info(res.data);
        if (res.data.code == 0) {
          this.setData({
            hgUserInfo: res.data.data.hgUserInfo,
            hgExtensionAccount: res.data.data.hgExtensionAccount
          })
        }
      }
    })
  },

  getMerchantApplyStatus: async function () {
    try {
      const data = await merchantApi.queryApplyStatus();
      this.setData({
        merchantApplyStatus: data.data
      })
    } catch (e) {
      this.setData({
        merchantApplyStatus: -1
      })
    }
  },
  //拨打客服
  bdkf: function () {
    wx.makePhoneCall({

      phoneNumber: '139xxxxxxxx'

    })
  },

  showview: function () { //弹框显示
    this.setData({
      model: 1
    })
    console.log("111")
  },
  model1: function () { //弹框消失
    this.setData({
      model: 0
    })
  },

  //跳转
  bianji: function () {
    wx.navigateTo({
      url: '../HGgerenXX/HGgerenXX',
    })
  },
  findDD: function () {

    wx.navigateTo({
      url: '../HGzhaohuiDD/HGzhaohuiDD',
    })
  },
  allDD: function (e) {
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../HGwodeDD/HGwodeDD?type=' + type,
    })
  },
  myDZ: function () {
    wx.navigateTo({
      url: '../HGshouhuoDZ/HGshouhuoDZ',
    })
  },
  myshezhi: function () {
    wx.navigateTo({
      url: '../HGshezhi/HGshezhi',
    })
  },
  myMoney: function () {
    wx.navigateTo({
      url: '../HGwodeQB/HGwodeQB',
    })
  },
  onGoSign: function () {
    wx.navigateTo({
      url: '/pages/promote/sign/index',
    })
  },
  onApplyMerchant: async function () {
    await this.getMerchantApplyStatus();
    switch (this.data.merchantApplyStatus) {
      case 0:
        wx.navigateTo({
          url: '/pages/merchant/audit-result/index?type=fail',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/merchant/audit-result/index?type=processing',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/merchant/index/index',
        })
        break;
      default:
        wx.navigateTo({
          url: '/pages/merchant/merchant-apply/index',
        })
    }
  },
  onApplyPromote: function () {
    if (this.data.hgUserInfo.isExtension !== 0) {
      wx.navigateTo({
        url: '/pages/promote/apply/index',
      })
    } else {
      wx.navigateTo({
        url: '/pages/promote/index/index',
      })
    }
  },

  onLoad: function (options) {
    /* 跳转中转发页功能 */
    if (options.url) {
      return wx.navigateTo({
        url: decodeURIComponent(options.url),
      })
    }
    //console.info(app.globalData.userInfo);
    if (options.userId != null) {
      this.setData({
        shareuId: options.userId
      })
    }
    var shareuId = this.data.shareuId;
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) { //
          //未登录,跳转到登录页
          if (shareuId == 0) {
            wx.redirectTo({
              url: '/pages/login/index',
            })
          } else {
            wx.redirectTo({
              url: '/pages/login/index?shareuId=' + shareuId,
            })
          }

        }
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
    this.getUserxx();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})