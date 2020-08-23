//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    focus: false,
    inputValue: '',
    banner:'/images/boshilun.png',
    fenleiList:[],
    shangpintop:[],
    shangpintuijian:[],

  },

getbanner:function(){

  wx.request({
    method:'GET',
    url: 'http://182.92.118.35:8098/api/home/searchHomeBanner',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res) => {
      //console.info(res.data);
      if(res.data.code==0){
        this.setData({
          //banner: res.data.data[0].banner
        })
      }
    }
  })

},

getfenlei:function(){
  wx.request({
    method:'GET',
    url: 'http://182.92.118.35:8098/api/home/searchHomeClassify',
    header:{
      'content-type': 'application/json' // 默认值
    },
    success:res=>{
      //console.info(res.data);
      if(res.data.code==0){
        this.setData({
          fenleiList: res.data.data
        })
      }
    }
  })

},

  getshangpin: function () {
    wx.request({
      method: 'GET',
      url: 'http://182.92.118.35:8098/api/home/searchHomeRecommendGoods',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        //console.info(res.data);
        if (res.data.code == 0) {
          this.setData({
            shangpintuijian: res.data.data
          })
          for(var i = 0;i<res.data.data.length;i++){
            if (res.data.data[i].isRecommend == 0){
              this.setData({
                shangpintop: res.data.data[i]
              })
              
            }
          }
        }
      }
    })

  },

  shangpinxq:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '../HGspXQ/HGspXQ?id='+id })
  },

onLoad:function(){
  this.getbanner();
  this.getfenlei();
  this.getshangpin();
},

  //跳转
  more: function () { wx.navigateTo({url: '../HGspXQ/HGspXQ',})},
  hufu: function (e) { 
    let id = e.target.dataset.id;
    wx.navigateTo({
      url: '../HGfenleiList/HGfenleiList?id='+id,
    })},
  gengduo: function () { wx.navigateTo({url: '../HGfenlei/HGfenlei',})},

})
