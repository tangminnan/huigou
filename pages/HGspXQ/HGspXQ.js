Page({
  data: { 
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
jiage:{},
merchantsId:0,


//=========================生成图片分享
model: 0,//弹框状态
modelA: 0,//弹框状态

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

getspid:function(options){
  var id = options.id;
  wx.request({
    url: 'http://182.92.118.35:8098/api/home/searchGoodsDetail',
    data: { goodsId : id},
    header: { 'content-type': 'application/json'},
    success:res=>{
      
      if(res.data.code == 0){
          this.setData({
            shangpin: res.data.data.hgGoods,
            sptupian: res.data.data.hgGoodsFiles,
            spguige: res.data.data.hgSpecifications,
            jiage: res.data.data.hgSpecifications[0],
            merchantsId: res.data.data.hgGoods.merchantsId,
        })
      }
    }

  })
},
  getshangjia: function () {
    wx.request({
      url: 'http://182.92.118.35:8098/api/business/selectMyBusiness',
      data: { id: this.data.merchantsId },
      header: { 'content-type': 'application/json' },
      success: res => {
        if (res.data.code == 0) {
          this.setData({
            shangjia: res.data.data.business
          })
          
        }
      }

    })
  },
////========================购买底部弹出框===========
  onLoad: function (options) {
    //console.info(options);
    this.getspid(options);
    this.getshangjia();
  },
  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
  },
  //显示对话框
  showModal: function () {
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
  this.setData({
    state: e.currentTarget.dataset.key,
  });
},
onReady: function() {},

//加入成功提示
showok:function() {
  wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 2000
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



//跳转
  shouhuoDZ: function () { wx.navigateTo({ url: '../shouhuodizhi/shouhuodizhi',})},
  sjXQ: function () { wx.navigateTo({ url: '../HGshangjiaXQ/HGshangjiaXQ?id=' + this.data.shangpin.merchantsId})},
  dianpu:  function  ()  {  wx.navigateTo({ url:  '../HGshangjiaZY/HGshangjiaZY?id=' + this.data.shangpin.merchantsId,})},
onGoToShoppingCart: function() {
  wx.switchTab({
    url: '/pages/shopping-cart/index/index',
  })
}
})
