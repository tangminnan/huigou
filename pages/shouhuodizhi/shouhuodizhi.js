//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    addressList: [],
  },

//地址列表
  getUserAddress: function () {
    wx.request({
      method: 'GET',
      url: 'https://testh5.server012.com/api/address/selectHgAddressByUserId',
      data: { userId: this.data.userInfo.id},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        //console.info(res.data);
        if (res.data.code == 0) {
          this.setData({
            addressList: res.data.data
          })
        }

      }
    })
  },



  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

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
    this.getUserAddress();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  

  //跳转
  xiugaiDZ: function () {
    wx.navigateTo({
      url: '../HGbainjiDZ/HGbainjiDZ',
    })
  },
  addNewdz: function () {
    wx.navigateTo({
      url: '../HGtianjiaDZ/HGtianjiaDZ',
    })
  },
  // 选中地址回调
  onChooseAddressItem: function (e) {
    
  var addId = e.currentTarget.dataset.id
  var shdizhi = e.currentTarget.dataset.dizhi
  let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
  let prevPage = pages[ pages.length - 2 ];  
  prevPage.setData({ 
    dizhiId:addId,
    dizhish:shdizhi,
    dizhiif:true,
  })
  wx.navigateBack({
    delta: 1  
  })
    // const channler = this.getOpenerEventChannel();
    // if (channler) {
    //   channler.emit('choosed_address', {
    //     userName: '张三',
    //     telPhone: '18701360779',
    //     province: '北京市顺义区',
    //     detailInfo: '宏远航程广场M座5层'
    //   });
    //   wx.navigateBack({delta: 1});
    // }
  }
})
