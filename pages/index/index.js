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

    pageNo: 0, 
    pageSize: 10, 
    searchLoading: false, 
    searchLoadingComplete: false ,

  },
//轮播图
getbanner:function(){

  wx.request({
    method:'GET',
    url: 'https://testh5.server012.com/api/home/searchHomeBanner',
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
//分类
getfenlei:function(){
  wx.request({
    method:'GET',
    url: 'https://testh5.server012.com/api/home/searchHomeClassify',
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
//top
gettopph: function () {
  wx.request({
    method: 'GET',
    url: 'https://testh5.server012.com/api/home/searchHomeRecommendGoods',
    header: {
      'content-type': 'application/json' // 默认值
    },
    data:{
      pageNum: 0,
      pageSize:5
    },
    success: res => {
      //console.info(res.data);
      if (res.data.code == 0) {
        var shangtop=[];
        for(var i = 0;i<res.data.data.list.length;i++){
          if (res.data.data.list[i].hgGoods.isRecommend == 0){
            shangtop.push(res.data.data.list[i]);
          }
        }
        this.setData({
          shangpintop: shangtop
        })
      }
    }
  })

},
//推荐
  getshangpin: function () {
    wx.request({
      method: 'GET',
      url: 'https://testh5.server012.com/api/home/searchHomeRecommendGoods',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        pageNum: this.data.pageNo,
        pageSize:this.data.pageSize
      },
      success: res => {
        //console.info(res.data);
        if (res.data.code == 0) {
          if(res.data.data.list.length<this.data.pageSize){
            this.setData({
              searchLoading: false,
              searchLoadingComplete :true
            })
          }
          this.setData({
            shangpintuijian: this.data.shangpintuijian.concat(res.data.data.list)
          })
          
        }
      }
    })

  },
//触底
  onReachBottom: function() {
    if (!this.data.searchLoadingComplete){
      var currentPageNo = this.data.pageNo;
      this.setData({
        pageNo: currentPageNo + 1,
      })
      this.getshangpin();
    }
  },

  shangpinxq:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '../HGspXQ/HGspXQ?id='+id })
  },

onLoad:function(){
  this.getbanner();
  this.getfenlei();
  this.getshangpin();
  this.gettopph();
},

  //跳转
  more: function () { wx.navigateTo({url: '../HGspXQ/HGspXQ',})},
  hufu: function (e) { 
    let id = e.currentTarget.dataset.id;
    let flname = e.currentTarget.dataset.flname;
   // console.info(e);
     wx.navigateTo({
       url: '../HGfenleiList/HGfenleiList?id='+id+"&flname="+flname,
     })
  },
  gengduo: function () { wx.navigateTo({url: '../HGfenlei/HGfenlei',})},

})
