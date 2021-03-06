// pages/sign/index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    qiandao:{},
    lingqusing:[],
    lingqutask:[],
    suoyou:[],
    syqiandao:[],
    qiandaozt: 1,
    qiandaojd:0,
   
  },

   //签到进度
   getqdjindu:function(){
     console.info("===========");
     console.info(this.data.userInfo.id);
     console.info("===========");
    wx.request({
      url: 'https://testh5.server012.com/api/home/searchSingSchedule',
      data: { userId: this.data.userInfo.id },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.info("签到进度");
        console.info(this.data.userInfo.id);
        console.info(res.data);
        if(res.data.code == 0){
            this.setData({
              qiandaojd: res.data.data
            })
        }
      }
    })

  },

  //签到状态
  getqdzhuangtai:function(){
    wx.request({
      url: 'https://testh5.server012.com/api/home/searchSingTask',
      data: { userId: this.data.userInfo.id },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.info(res.data);
        if(res.data.code == 0){
            this.setData({
              qiandaozt: res.data.data.status
            })
        }
      }
    })

  },

  //领取记录
  getlingqu:function(){
    wx.request({
      url: 'https://testh5.server012.com/api/home/searchUserBill',
      data: { userId: this.data.userInfo.id },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.info("领取记录");
        console.info(res.data.data);
        if(res.data.data.length>0){
          this.setData({
            lingqutask:res.data.data
          })
        }          
      }
    })
  },
  //所有任务
  getsuoyou: function () {
    wx.request({
      url: 'https://testh5.server012.com/api/home/searchAllTask',
      data: { userId: this.data.userInfo.id },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.info("领取任务");
        console.info(res.data);
        if (res.data.code == 0) {
          this.setData({
            suoyou: res.data.data
          })
        }
      }
    })
  },
  //签到列表
  getsyqiandao: function () {
    wx.request({
      url: 'https://testh5.server012.com/api/home/searchSigns',
      header: { 'content-type': 'application/json' },
      success: res => {
        console.info("签到列表");
        console.info(res.data);
        if (res.data.code == 0) {
          this.setData({
            syqiandao: res.data.data
          })
        }
      }
    })
  },
 //领取任务
 ling:function(e){
  var taskId = e.currentTarget.dataset.taskId
  wx.request({
    method:"POST",
    url: 'https://testh5.server012.com/api/home/pickUpTask',
    data: { 
      userId: this.data.userInfo.id ,
      taskId:taskId
    },
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    success: res => {
      //console.info(res.data);
      if (res.data.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        this.getsuoyou();
        this.getlingqu();
      }else{
        wx.showToast({
          title: '操作失败，请稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    }
  })

 },
 objectIsNullOrNot:function(param){
  return Object.keys(param).length===0? false:true
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
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
    this.getqdzhuangtai();
    this.getqdjindu();
    this.getlingqu();
    this.getsuoyou();
    this.getsyqiandao();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  sign: function () {
    console.info("今日签到");
    console.info(this.data.userInfo.id);
    wx.request({
      method:"POST",
      url: 'https://testh5.server012.com/api/home/singEverydayTaskByUserId', 
      data: { userId: this.data.userInfo.id },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        if (res.data.code == 0) {
          wx.showToast({
            title: '签到成功',
          })
          this.getqdzhuangtai();
          this.getqdjindu();
        }else{
          wx.showToast({
            title: '今日已签到',
          })
        }
      }
    })
    
  }
})