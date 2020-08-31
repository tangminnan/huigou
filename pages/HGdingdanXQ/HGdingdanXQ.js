const payApi = require('../../api/order');
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    orderId:'',
    ddzt:0,
    addressId:0,

    dingdan:{},
    address:{},

    countdown:'',
    createTimeif:0
  },

  getdingdanxx:function(orderId){
    wx.request({
      url: 'https://testh5.server012.com/api/home/searchOrderTable',
      data:{orderId:orderId},
      header:{'content-type': 'application/json'},
      success:res=>{
        console.info(res.data);
        if(res.data.code==0){
          var createTime = res.data.data.createTime;
          var ddxq = res.data.data
          var goodsId = res.data.data.goodsId
          wx.request({
            url: 'https://testh5.server012.com/api/home/searchGoodsDetail',
            data: { goodsId : goodsId},
            header: { 'content-type': 'application/json'},
            success:res=>{
              //console.info(res.data.data);
              if(res.data.code == 0){
                this.setData({
                  dingdan: {goods:res.data.data,ddxq:ddxq},
                })
                
              }
            }
          })
          if(this.data.createTimeif==0){
            this.countDown(createTime);
          }
        }
      }
    })

  },

  getaddress:function(addressId){
    wx.request({
      url: 'https://testh5.server012.com/api/address/detailAddress',
      data: { id : addressId},
      header: { 'content-type': 'application/json'},
      success:res=>{
        //console.info(res.data.data);
        if(res.data.code == 0){
          this.setData({
            address: res.data.data,
          })
          
        }
      }
    })
  },

  onTapDayWeather() {

    wx.navigateTo({

      url: '/pages/tianjiaDZ/tianjiaDZ',

    })

  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId,
      ddzt:options.ddzt,
      addressId:options.addressId
    })
    this.getdingdanxx(options.orderId);
    this.getaddress(options.addressId);
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

    const channel = this.getOpenerEventChannel();
    if (channel) {
      channel.on('orderList', data => {
        console.log('orderList', data)
        this.setData({
          ...data
        });
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


  
  shouhuo:function(e){
    var orderId = this.data.orderId;
    wx.request({
      method:"POST",
      url: 'https://testh5.server012.com/api/home/completeOrderById',
      data:{
        orderId:orderId
      },
      header:{"Content-Type": "application/x-www-form-urlencoded"},
      success:res=>{
        if(res.data.code==0){
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: '../mine/mine'
          })
        }else{
          wx.showToast({
            title: '请稍后重试',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },

  //取消订单
  quxiao:function(e){
    var orderId = this.data.orderId;
    wx.request({
      method:'POST',
      url: 'https://testh5.server012.com/api/home/deleteOrderById',
      data:{orderId:orderId},
      header:{"Content-Type": "application/x-www-form-urlencoded"},
      success:res=>{
        if(res.data.code == 0){
          wx.showToast({
            title: '操作成功',
            icon:'none',
            duration:2000
          })
          wx.switchTab({
            url: '../mine/mine'
          })
        }else{
          wx.showToast({
            title: '操作失败,请稍后重试',
            icon:'none',
            duration:2000
          })
        }
      }
    })

  },

    //跳转
    tuiHuan: function (e) { 
      var orderId = this.data.orderId;
      wx.navigateTo({
        url: '../HGtuihuo/HGtuihuo?orderId='+orderId,
      })
    },

    zhifu: async function () {
      await getApp().getUserInfo();
      try {
        await Promise.all(
          this.data.orderList.map(async order => {
            await payApi.wxPay({
              orderNo: order.orderId,
              type: 1,
              openId: getApp().globalData.openId,
            });
          }))
  
        wx.navigateTo({
          url: `/pages/shopping-cart/result/index?type=success&count=${this.data.count}`,
        })
      } catch (e) {
        wx.navigateTo({
          url: `/pages/shopping-cart/result/index?type=fail`,
        })
      }
    },

  countDown(createTime) {
    var that = this

    var starttime = createTime

    var start = new Date(starttime.replace(/-/g, "/")).getTime()
    var endTime = start + 30 * 60000

    var date = new Date(); //现在时间
    var now = date.getTime(); //现在时间戳

    var allTime = endTime - now
    var m, s;
    if (allTime > 0) {
      m = Math.floor(allTime / 1000 / 60 % 60);
      s = Math.floor(allTime / 1000 % 60);
      that.setData({
        countdown: m + "：" + s,
      })
      setTimeout(that.countDown, 1000);
    } else {
      console.log('已截止')
      this.setData({
        createTimeif: 1,
        ddzt:5,
      })
    var orderId = this.data.orderId;
    wx.request({
      method:'POST',
      url: 'https://testh5.server012.com/api/home/deleteOrderById',
      data:{orderId:orderId},
      header:{"Content-Type": "application/x-www-form-urlencoded"},
      success:res=>{
        if(res.data.code == 0){
            this.getdingdanxx(this.data.orderId);
        }
      }
    })
      that.setData({
        countdown: '00:00'
      })
    }
  },

})


