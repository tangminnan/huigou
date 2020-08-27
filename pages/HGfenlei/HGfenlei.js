Page({
 
  /* 页面的初始数据 */
  data: {
  curNav:0,

  fenlei:[],
  changpin:[],
    fenleiId:0,

    pageNo: 0, 
    pageSize: 10, 
    searchLoading: false, 
    searchLoadingComplete: false ,

  },
//获取分类
getfenlei:function(){
  wx.request({
    url: 'https://testh5.server012.com/api/classify/searchAllClassify',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res) => {
      //console.info(res.data);
      if (res.data.code== 0){
        this.setData({
          fenlei: res.data.data,
          fenleiId: res.data.data[0].id
        })
        this.getshangpin(this.data.fenleiId);
      }
    }
  })
},
  onLoad: function (options) {
    this.getfenlei();
  },
  /* 把点击到的某一项 设为当前curNav */
  switchRightTab:function(e){
  let id = e.target.dataset.id;
  let fenid = e.target.dataset.fenid;
    //console.log(fenid);
  this.setData({
    curNav: id,
    changpin:[],
    pageNum: 0,
    pageSize:10
  })
    this.getshangpin(fenid);
  },
//获取商品
  getshangpin: function (fenid){
  wx.request({
    url: 'https://testh5.server012.com/api/classify/searchAllGoodsByClassifyId',
    data: { 
      id: fenid,
      pageNum: this.data.pageNo,
      pageSize:this.data.pageSize
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res) => {
      //console.info(res.data);
      if (res.data.code == 0) {
        if(res.data.data.list.length<this.data.pageSize){
          this.setData({
            searchLoading: false,
            searchLoadingComplete :true
          })
        }
        this.setData({
          changpin: this.data.changpin.concat(res.data.data.list)
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

//跳转
spxqing: function (e) { 
  let id = e.currentTarget.dataset.id;
  wx.navigateTo({
    url: '../HGspXQ/HGspXQ?id='+id,
  })
},
sjZY: function (e) { 
  let id = e.currentTarget.dataset.id;
  wx.navigateTo({
    url: '../HGshangjiaZY/HGshangjiaZY?id='+id,
  })
},

 })
 