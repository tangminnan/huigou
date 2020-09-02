const app = getApp()

Page({
  data: {
    navbar: ['待入账', '余额', '提现明细'],
    currentTab: 0,
    hiddenmodalput: true,
  //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    dairuzd:[],
    yue:0,
    tixianmx:[],
  },
  //切换bar
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    this.getindex(e.currentTarget.dataset.idx);
    //全局变量
    app.globalData.currentTab = e.currentTarget.dataset.idx;
  },
  onShow() {
    this.setData({
      //currentTab: app.globalData.currentTab
      currentTab: 0
    })
  },

getindex:function(ind){
  //console.info(ind);
  if (ind==0){
    this.getdairuzd();
  }
  if (ind == 1) {
    this.getyue();
  }
  if (ind == 2) {
    this.gettixianmx();
  }
},
//待入账
  getdairuzd:function(){
      wx.request({
        url: 'https://testh5.server012.com/api/info/selectBillByUserId',
        data: { id: this.data.userInfo.id},
        success:res=>{
          //console.info(res.data);
          if (res.data.code==0){
            if (res.data.data.length>0){
              this.setData({
                dairuzd: res.data.data
              })
            }
          }
        }

      })
  },
  //余额
  getyue: function () {
    wx.request({
      url: 'https://testh5.server012.com/api/info/selectBlanceByUserId',
      data: { id: this.data.userInfo.id },
      success: res => {
        //console.info(res);
        if (res.data.code == 0) {
            this.setData({
              yue: res.data.data
            })
        }
      }

    })

  },
  //提现明细
  gettixianmx: function () {
    wx.request({
      url: 'https://testh5.server012.com/api/info/selectCashByUserId',
      data: { id: this.data.userInfo.id },
      success: res => {
        //console.info(res.data);
        if (res.data.code == 0) {
          if (res.data.data.length > 0) {
            this.setData({
              tixianmx: res.data.data
            })
          }
        }
      }

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
    this.getdairuzd();
    this.getyue();
    this.gettixianmx();
    },
    getUserInfo: function (e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
 

  //
  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  //跳转
  tiXian: function () { wx.navigateTo({url: '../HGtixian/HGtixian?yue='+this.data.yue,})},
})