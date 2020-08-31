const app = getApp()

Page({
  data: {
    navbar: ['全部', '待付款', '待收货', '已完成', '退换货'],
    currentTab: 0,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    hiddenmodalput: true,
    model: 0,//快递单号弹框状态

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    orderList:[],
    ifnull:0,
    dian:0,

    orderId:'',
    retCourierNumber:''
  },
  //切换bar
  navbarTap: function (e) {

    if(e.currentTarget.dataset.idx == this.data.currentTab){
        return false;
    }
    this.setData({
      orderList: [],
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
    app.globalData.currentTab = e.currentTarget.dataset.idx;
    
  },
  onShow() {
    this.setData({
      currentTab: app.globalData.currentTab
    })
    
  },

  swiperChange: function (e) {
    this.setData({
      orderList: [],
      currentTab: e.detail.current,
    })
    //全局变量
    app.globalData.currentTab = e.detail.current;

    this.getOrderzt(e.detail.current);
  },

  getOrderzt: function (orderFlag){
    //console.info(orderFlag);
    if (orderFlag == 0) {
      this.getUserAllOrder(); 
    } else if (orderFlag == 1) {
      this.getUserOrder(0); //未支付 
    } else if (orderFlag == 2) {
      this.getUserOrder(1); //待收货 
    } else if (orderFlag == 3) {
      this.getUserOrder(2); //已完成 
    } else {
      this.getUserOrder(3); //退款售后
    }
    
  },
//获取全部订单
  getUserAllOrder:function(){
    wx.request({
      method: 'GET',
      url: 'https://testh5.server012.com/api/home/searchAllOrder',
      data:{
        userId: this.data.userInfo.id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.info(res.data);
        
        var ordergood = [];
        if (res.data.code == 0 && res.data.data.length >0) {
          for(var i = 0;i<res.data.data.length;i++){
            for(var j = 0;j<res.data.data[i].orderTables.length;j++){
              var goodsId = res.data.data[i].orderTables[j].goodsId;
              var order = res.data.data[i];
              var orderTables = res.data.data[i].orderTables[j];
            wx.request({
              url: 'https://testh5.server012.com/api/home/searchGoodsDetail',
              data: { goodsId : goodsId},
              header: { 'content-type': 'application/json'},
              success:res=>{
                //console.info(res.data.data);
                if(res.data.code == 0){
                  this.setData({
                    orderList: this.data.orderList.concat({goods:res.data.data,order:order,orderTables:orderTables}),
                    ifnull: 1
                  })
                  //console.info(this.data.orderList);
                  //ordergood.concat({goods:res.data.data,order:order})
                }
              }
            })
            }
            
          }
          
          // this.setData({
          //   orderList: ordergood,
          //   ifnull: 1
          // })
        }else{
          this.setData({
            ifnull: 0
          })
        }
      }
    })
  },
//获取用户订单
  getUserOrder: function (condition){
    //console.info(condition);
    wx.request({
      method: 'GET',
      url: 'https://testh5.server012.com/api/home/searchOrderByCondition',
      data:{
        userId: this.data.userInfo.id,
        condition: condition
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        //console.info(res.data);
        if (res.data.code == 0 && res.data.data != null) {
          for(var i = 0;i<res.data.data.length;i++){
            for(var j = 0;j<res.data.data[i].orderTables.length;j++){
              var goodsId = res.data.data[i].orderTables[j].goodsId;
              var order = res.data.data[i];
              var orderTables = res.data.data[i].orderTables[j];
              wx.request({
                url: 'https://testh5.server012.com/api/home/searchGoodsDetail',
                data: { goodsId : goodsId},
                header: { 'content-type': 'application/json'},
                success:res=>{
                  //console.info(res.data.data);
                  if(res.data.code == 0){
                    this.setData({
                      orderList: this.data.orderList.concat({goods:res.data.data,order:order,orderTables:orderTables}),
                      ifnull: 1
                    })
                    //console.info(this.data.orderList);
                    //ordergood.concat({goods:res.data.data,order:order})
                  }
                }
              })
            }           
          }
          // this.setData({
          //   orderList: res.data.data,
          //   ifnull: 1
          // })
        }else{
          this.setData({
            ifnull: 0
          })
        }
      }
    })

  },
//取消订单
  quxiao:function(e){
    var orderId = e.currentTarget.dataset.orderId;
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
          this.jiazai();
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

  jiazai:function(){
    if(this.data.currentTab==0){
      this.getUserAllOrder(); 
    }else{
      this.getUserOrder(this.data.currentTab);
    }
  },

  shouhuo:function(e){
    var orderId = e.currentTarget.dataset.orderId
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
          this.jiazai();
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
    this.getUserAllOrder(); 
    //this.getUserOrder(0)
    
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  danhao:function(e){
    this.setData({
      retCourierNumber: e.detail.value
    })
  },
  
  //填写运单号弹框
  showview: function (e) {//弹框显示
    this.setData({
      model: 1,
      orderId:e.currentTarget.dataset.orderId
    })
    console.log("111")
  },
  model1: function () {//弹框消失
    this.setData({
      model: 0
    })
  },

  ddxiangq:function(e){
    var orderId = e.currentTarget.dataset.id
    var ddzt = e.currentTarget.dataset.ddzt
    wx.navigateTo({
      url: '../HGtuihuo/HGtuihuo?orderId='+orderId+'&ddzt='+ddzt,
    })
  },

  //============填写运单号成功提示
  showok:function(e) {
    if(this.data.retCourierNumber==''){
      wx.showToast({
        title: '请输入单号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.request({
      method:"POST",
      url: 'https://testh5.server012.com/api/home/updateOrderTableRetCourierNumber',
      data:{
        orderId:this.data.orderId,
        retCourierNumber:this.data.retCourierNumber
      },
      header:{"Content-Type": "application/x-www-form-urlencoded"},
      success:res=>{
        if(res.data.code==0){
          wx.showToast({
            title: '已完成',
            icon: 'success',
            duration: 2000
          })
          this.jiazai();
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

  //跳转
  tuiHuan: function (e) { 
    var orderId = e.currentTarget.dataset.orderId;
    wx.navigateTo({
      url: '../HGtuihuo/HGtuihuo?orderId='+orderId,
    })
  },
  goPay: function (e) { 
    var orderId = e.currentTarget.dataset.id;
    var ddzt = e.currentTarget.dataset.ddzt
    var addid = e.currentTarget.dataset.addid
    wx.navigateTo({
      url: '../HGdingdanXQ/HGdingdanXQ?orderId='+orderId+'&ddzt='+ddzt+'&addressId='+addid,
    })
  },

})