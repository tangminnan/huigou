Page({
 
  /* 页面的初始数据 */
  data: {
  curNav:0,

  fenlei:[],
  changpin:[],
    fenleiId:0,

  },

getfenlei:function(){
  wx.request({
    url: 'http://182.92.118.35:8098/api/classify/searchAllClassify',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res) => {
      if (res.data.code== 0){
        this.setData({
          fenlei: res.data.data,
          fenleiId: res.data.data[0].id
        })
      }
    }
  })
},
  onLoad: function (options) {
    this.getfenlei();
    this.getshangpin(this.data.fenleiId);
  },
  /* 把点击到的某一项 设为当前curNav */
  switchRightTab:function(e){
  let id = e.target.dataset.id;
  let fenid = e.target.dataset.fenid;
    console.log(fenid);
  this.setData({
  curNav: id
  })
    this.getshangpin(fenid);
  },

  getshangpin: function (fenid){
  wx.request({
    url: 'http://182.92.118.35:8098/api/classify/searchAllGoodsByClassifyId',
    data: { id: fenid},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res) => {
      console.info(res.data);
      if (res.data.code == 0) {
        this.setData({
          changpin: res.data.data
        })
      }
    }
  })
},


//跳转
spxqing: function (e) { 
  let id = e.target.dataset.id;
  wx.navigateTo({
    url: '../HGspXQ/HGspXQ?id='+id,
  })},
sjZY: function (e) { 
  let id = e.target.dataset.id;
  wx.navigateTo({
    url: '../HGshangjiaZY/HGshangjiaZY?id'+id,
  })},

 })
 