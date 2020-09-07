//获取应用实例
const app = getApp()
Page({
  data: { 
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openSettingBtnHidden: true,//是否授权
    //==================数量加减
    // input默认是1  
    num: 1,  
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled'  ,

    //========================模拟banner轮播图=
 imgUrls: [
  '/images/PH1.png',
  '/images/PH2.png',
  '/images/PH3.png'
  ],
  circular: true,
  //是否显示画板指示点 
  indicatorDots: true,
  //选中点的颜色 
  //是否竖直 
  vertical: false,
  //是否自动切换 
  autoplay: true,
  //自动切换的间隔
  interval: 3000,
  //滑动动画时长毫秒 
  duration: 1000,
  //所有图片的高度 
  imgheights: [],
  //图片宽度 
  imgwidth: 750,
  //默认 
  current: 0,

//==================选择套餐开始
use: [{
  "use_name": "经典牛奶1箱"
},
{
  "use_name": "经典牛奶（8瓶*4箱）"
},
{
  "use_name": "经典牛奶（8瓶*12箱）"
},
{
  "use_name": "经典牛奶（8瓶*24箱）"
},
{
  "use_name": "经典牛奶（8瓶*48箱）"
},
],
state: '',
shangpin:{},
sptupian:[],
spguige:[],
address:{},
shangjia:{},
jiage:0,
merchantsId:0,

dizhiId:0,
dizhish:'',
dizhiif:false,
goodId:0,
guigeId : 0,
gwcnum:0,

tanshux:1,
//=========================生成图片分享
model: 0,//弹框状态
modelA: 0,//弹框状态

shareuId:0

},  

//========================模拟banner图===============
imageLoad: function (e) {//获取图片真实宽度 
  var imgwidth = e.detail.width,
  imgheight = e.detail.height,
  //宽高比 
  ratio = imgwidth / imgheight;
  console.log(imgwidth, imgheight)
  //计算的高度值 
  var viewHeight = 750 / ratio;
  var imgheight = viewHeight;
  var imgheights = this.data.imgheights;
  //把每一张图片的对应的高度记录到数组里 
  imgheights[e.target.dataset.id] = imgheight;
  this.setData({
  imgheights: imgheights
  })
  },
  bindchange: function (e) {
  // console.log(e.detail.current)
  this.setData({ current: e.detail.current })
  },
  
 
//========================数量加减==============
/* 点击减号 */  
bindMinus: function() {  
    var num = this.data.num;  
    // 如果大于1时，才可以减  
    if (num > 1) {  
        num --;  
    }  
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';  
    // 将数值与状态写回  
    this.setData({  
        num: num,  
        minusStatus: minusStatus  
    });  
},  
/* 点击加号 */  
bindPlus: function() {  
    var num = this.data.num;  
    // 不作过多考虑自增1  
    num ++;  
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';  
    // 将数值与状态写回  
    this.setData({  
        num: num,  
        minusStatus: minusStatus  
    });  
},  
/* 输入框事件 */  
bindManual: function(e) {  
    var num = e.detail.value;  
    // 将数值与状态写回  
    this.setData({  
        num: num  
    });  
}  ,
//商品详情
getspid:function(options){
  var id = options.id;
this.setData({
  goodId:id
})
  wx.request({
    url: 'https://testh5.server012.com/api/home/searchGoodsDetail',
    data: { goodsId : id},
    header: { 'content-type': 'application/json'},
    success:res=>{
      //console.info(res.data);
      if(res.data.code == 0){
        var shangjiaId = res.data.data.hgGoods.merchantsId;
        res.data.data.hgGoods.goodsContent = res.data.data.hgGoods.goodsContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
          this.setData({
            shangpin: res.data.data.hgGoods,
            sptupian: res.data.data.hgGoodsFiles,
            spguige: res.data.data.hgSpecifications,
            jiage: res.data.data.hgSpecifications.length>0?res.data.data.hgSpecifications[0].goodsPresentPrice:"",
            guigeId:res.data.data.hgSpecifications.length>0?res.data.data.hgSpecifications[0].id:0,
            merchantsId: res.data.data.hgGoods.merchantsId,
        })
        this.getshangjia(shangjiaId);
      }
    }

  })
},
//商家
  getshangjia: function (shangjiaId) {
    //console.info(shangjiaId);
    wx.request({
      url: 'https://testh5.server012.com/api/business/selectMyBusiness',
      data: { id: shangjiaId },
      header: { 'content-type': 'application/json' },
      success: res => {
        console.info(res.data);
        if (res.data.code == 0) {
          this.setData({
            shangjia: res.data.data[0]
          })
          
        }
      }

    })
  },
////========================购买底部弹出框===========
  onLoad: function (options) {
    //console.info(options);
    if(options.userId!=null){
      this.setData({
        shareuId:options.userId
      })
    }
    
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

    this.getspid(options);
    this.getgwcnum();
    //this.getshangjia();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //点击我显示底部弹出框
  clickme: function (e) {
    this.showModal(e);
  },
  //显示对话框
  showModal: function (e) {
    this.setData({
      tanshux:e.currentTarget.dataset.type
    })
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

////========================选择套餐=======================
//选择用途后加样式
select_use: function(e) {
  var gjine = e.currentTarget.dataset.jine
  var id = e.currentTarget.dataset.id
  this.setData({
    state: e.currentTarget.dataset.key,
    jiage:parseInt(gjine),
    guigeId:id,
  });

},
onReady: function() {},
//购物车数量
getgwcnum:function(){
  if(this.data.userInfo.id != ''){
    wx.request({
      url: 'https://testh5.server012.com/api/cart/getCartCounts',
      data:{
        userId:this.data.userInfo.id,
      },
      header:{'content-type': 'application/json'},
      success:res=>{
        //console.info(res.data);
        if(res.data.code == 0){
          this.setData({
            gwcnum:res.data.data
          })
        }
      }
    })
  }
},

showok:function(e){
  let type = e.currentTarget.dataset.type
  
  if(type==1){
    this.jiarugouwuche();
  }else{
    this.goumai();
  }
},

goumai:function(){
  const shoppingList = [{
     shopId : this.data.shangjia.id,
     shopName : this.data.shangjia.shopName,
     skuList : [{
      img: this.data.sptupian[0].picture,
      title: this.data.shangpin.title,
      price: (this.data.jiage)*(this.data.num),
      skuId: this.data.guigeId,
      goodsId: this.data.shangpin.id,
      count: this.data.num,
      expressFee: this.data.shangpin.expressFee,
      hgCartId: ''
    }]
    
  }]
  console.info(shoppingList);
  wx.navigateTo({
    url: `/pages/shopping-cart/order-submit/index`,
    success: (res) => {
      res.eventChannel.emit('shoppingList', shoppingList);
    }
  })
},


//加入成功提示
jiarugouwuche:function() {
  wx.getSetting({
    success: function (res) {
      if (!res.authSetting['scope.userInfo']) {
        //未登录,跳转到登录页
        wx.redirectTo({
          url: '/pages/login/index',
        })
      }
    }
  })
  var businessId = this.data.merchantsId;
  var userId = this.data.userInfo.id;
  var goodsId = this.data.goodId;
  var specificationId = this.data.guigeId;
  var count = this.data.num;
  //console.info(businessId+"=="+userId+"=="+goodsId+"=="+specificationId+"=="+count)
  wx.request({
    method:"POST",
    url: 'https://testh5.server012.com/api/cart/addMyCart',
    data:{
      businessId:businessId,
      userId:userId,
      goodsId:goodsId,
      specificationId:specificationId,
      count:count
    },
    header:{"Content-Type": "application/x-www-form-urlencoded"},
    success:res=>{
      console.info(res.data);
      if(res.data.code == 0){
        wx.showToast({
          title: '已加入购物车',
          icon: 'none',
          duration: 2000
        })
        this.getgwcnum();
      }else{
        wx.showToast({
          title: '加入失败，请稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    }
  })

},

//========================分享弹框=============
shareBox: function () {//弹框显示
  this.setData({
    modelA: 1
  })
  console.log("111")
},
model1A: function () {//弹框消失
  this.setData({
    modelA: 0
  })
},
//========================生成图片分享弹框=============
showview: function () {//弹框显示
  this.setData({
    model: 1
  })
  console.log("111")
},
model1: function () {//弹框消失
  this.setData({
    model: 0
  })
},

onShareAppMessage: function (e) {
  var type = e.target.dataset.type;
  if(type==1){
    return {
      title: this.data.shangpin.title,
      path: 'pages/HGspXQ/HGspXQ?id=' + this.data.goodId+'&userId='+this.data.userInfo.id,
      imageUrl: this.data.sptupian[0].picture,
      success: (res) => {
        
      }
    }
  }
  if(type==2){console.info("===============");
     return {
       title: '惠购',
       path: 'pages/mine/mine?userId='+this.data.userInfo.id,
       imageUrl: '',
       success: (res) => {
        
       }
     }
  }
  
},
onShareTimeline: function(ops) {console.info(" - - -- - - -");
  return {
    title: this.data.shangpin.title,
    path: 'pages/HGspXQ/HGspXQ?id=' + this.data.goodId+'&userId='+this.data.userInfo.id,
    imageUrl: this.data.sptupian[0].picture,
  }
},


// 保存图片
saveImg:function(e){
  let that = this;

  //获取相册授权
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            //这里是用户同意授权后的回调
            that.saveImgToLocal();
          },
          fail() {//这里是用户拒绝授权后的回调
            that.setData({
              openSettingBtnHidden: false
            })
          }
        })
      } else {//用户已经授权过了
        that.saveImgToLocal();
      }
    }
  })

},
saveImgToLocal: function (e) {
  let that = this;

  let imgSrc = that.data.sptupian.picture[0];
  wx.downloadFile({
    url: imgSrc,
    success: function (res) {
      console.log(res);
      //图片保存到本地
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function (data) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        },
      })
    }
  })

},


//跳转
  shouhuoDZ: function () { 
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) {
          //未登录,跳转到登录页
          wx.redirectTo({
            url: '/pages/login/index',
          })
        }
      }
    })
    wx.navigateTo({ 
      url: '../shouhuodizhi/shouhuodizhi',
    })
  },
  sjXQ: function () { wx.navigateTo({ url: '../HGshangjiaXQ/HGshangjiaXQ?id=' + this.data.shangpin.merchantsId})},
  dianpu:  function  ()  {  wx.navigateTo({ url:  '../HGshangjiaZY/HGshangjiaZY?id=' + this.data.shangpin.merchantsId,})},
  onGoToShoppingCart: function() {
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) {
          //未登录,跳转到登录页
          wx.redirectTo({
            url: '/pages/login/index',
          })
        }
      }
    })
    wx.switchTab({
      url: '/pages/shopping-cart/index/index',
    })
  }
})
