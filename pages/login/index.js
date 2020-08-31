Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    login_pic:'',
    shareuId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.userId!=null){
      this.setData({
        shareuId:options.userId
      })
    }
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (getApp().globalData.userInfo != null) {//res.authSetting['scope.userInfo']
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              //that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          });
        }
      }
    })
    // 登录图片
    // wx.request({
    //   url: config.api_base_url + 'index/login_pic',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     that.setData({
    //       login_pic: res.data.msg
    //     })
    //   }
    // })

  },
  bindGetUserInfo: function (e) {
    //console.info(e.detail.userInfo);
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      var openid = getApp().globalData.openid; 
      var data={}
      if(this.data.shareuId==0){
        data = {
          id:getApp().globalData.userInfo.id,
          userName: e.detail.userInfo.nickName,
          sex: e.detail.userInfo.gender,
          userLogo: e.detail.userInfo.avatarUrl,
          phone:'18711111111',
          isUser:0,
          labelId:1,
          communityId:1,
          name: e.detail.userInfo.nickName,
          userType:0,
          openId: openid
        }
      }else{
        data = {
          id:getApp().globalData.userInfo.id,
          userName: e.detail.userInfo.nickName,
          sex: e.detail.userInfo.gender,
          userLogo: e.detail.userInfo.avatarUrl,
          phone:'18711111111',
          invitationNum:this.data.shareuId,
          isUser:0,
          labelId:1,
          communityId:1,
          name: e.detail.userInfo.nickName,
          userType:0,
          openId: openid
        }
      }
      wx.request({
        url: 'https://testh5.server012.com/api/info/addHgUserInfo', 
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method:'post',
        success:(res)=> {
          console.info(res.data)
          if (res.data.code==0){
            getApp().globalData.userInfo = res.data.data
            wx.switchTab({
              url: '/pages/mine/mine'
            })
          }else{
            //console.log("写入失败")
            getApp().globalData.userInfo == null
            wx.showToast({
              title: '请稍后重试',
              icon:'none',
              duration:2000
            })
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        }
      })
      //授权成功后，跳转进入小程序首页
      
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    // var openid = getApp().globalData.openid;
    // wx.request({
    //   url: getApp().globalData.urlPath + 'hstc_interface/queryByOpenid',
    //   data: {
    //     openid: getApp().globalData.openid
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     getApp().globalData.userInfo = res.data;
    //   }
    // }) 
  },  
})