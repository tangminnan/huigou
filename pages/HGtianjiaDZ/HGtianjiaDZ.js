//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //=========城市选择=========================
    objectIndex: 0,//默认显示位置
   //省市区选择器：
   region: ['省', '市', '区'],
   customItem: '请选择',//为每一列的顶部添加一个自定义的项

    recipient:'',
    phone:'',
    phonetrue: false,
    regionif:0,
    detailAddress:'',
    isDefault:0

  },


  userNameInput: function (e) {
    this.setData({
      recipient: e.detail.value
    })
    //console.log(e.detail.value)
  },

  phoneInput: function (e) {
    var phone = e.detail.value;
    let that = this
    if (!(/^1[34578]\d{9}$/.test(phone))) {

      this.setData({
        phonetrue: false,
        phone: phone
      })
      if (phone.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      this.setData({
        phonetrue: true,
        phone: phone
      })
      //console.log('验证成功', that.data.phonetrue)
    }
  },

  addressdesInput: function (e) {
    this.setData({
      detailAddress: e.detail.value
    })
    //console.log(e.detail.value)
  },

  //选择默认地址
  switchChange: function (event) {
    var choose = event.detail.value == true ? 1 : 0;
    this.setData({
      isDefault: choose
    })
  },
//保存
  baocun:function(e){
    let that = this
    let val = e.detail.value
    let phonetrue = this.data.phonetrue
    if (phonetrue == false) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (this.data.recipient == '') {
      wx.showToast({
        title: '请输入收货人',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
   
    if (this.data.regionif == 0) {
      wx.showToast({
        title: '请选择城市',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    for(var i=0;i<this.data.region.length;i++){
        console.info(this.data.region[i]);
        if(this.data.region[i]=="请选择"){
          wx.showToast({
            title: '请输入正确的地址',
            icon: 'none',
            duration: 2000
          })
          return false;
        }
    }

    if (this.data.detailAddress == '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //console.info(this.data.recipient);
    //console.info(this.data.phone);
    //console.info(this.data.region);
    //console.info(this.data.detailAddress);
    //console.info(this.data.isDefault);
    var region1 = String(this.data.region[0]+","+this.data.region[1]+","+this.data.region[2])
    wx.request({
      method: 'POST',
      url: 'https://testh5.server012.com/api/address/addAddress',
      data: { 
        userId: this.data.userInfo.id,
        recipient: this.data.recipient ,
        phone: this.data.phone,
        region: region1,
        detailAddress: this.data.detailAddress,
        isDefault: this.data.isDefault
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        //console.info(res.data);
        if (res.data.code == 0) {
          wx.showToast({
            title: '操作成功',
            icon: 'none',
            duration: 2000
          })
          var pages = getCurrentPages();
          var beforePage = pages[pages.length - 2];
          beforePage.getUserAddress();
          wx.navigateBack({
            delta: 1,
          })
          // wx.navigateTo({
          //   url: '../HGshouhuoDZ/HGshouhuoDZ'
          // })
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
  onLoad: function () {
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
  },
  //省市区选择器：
 bindRegionChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    regionif:1,
    region: e.detail.value
  })
}
})
