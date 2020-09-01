// pages/tansuo/tansuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changpin:[],

    pageNo: 1, 
    pageSize: 10, 
    searchLoading: false, 
    searchLoadingComplete: false ,

  },
//获取分类
  getfenleiList: function (options){
   var id =  options.id;
    wx.request({
      url: 'https://testh5.server012.com/api/classify/searchAllGoodsByClassifyId',
      data: { 
        id: id ,
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

  searchjieguo:function(options){
      var searchValue = options.searchValue
      wx.request({
        url: 'https://testh5.server012.com/api/home/searchGoodsByName',
        data: { 
          name: searchValue ,
          pageNum: this.data.pageNo,
          pageSize:this.data.pageSize
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          console.info(res.data);
          if (res.data.code == 0) {
            this.setData({
              changpin: this.data.changpin.concat(res.data.data.list)
            })
          }else{
            wx.switchTab({
              url: '/pages/index/index'
            })
            wx.showToast({
              title: '没有搜索到东西',
              icon:'none',
              duration:2000
            })
            
          }
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.flag!=null){
      this.searchjieguo(options);
    }else{
      this.getfenleiList(options);
    }
    
    wx.setNavigationBarTitle({
      title: options.flname
    })


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
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.searchLoadingComplete){
      var currentPageNo = this.data.pageNo;
      this.setData({
        pageNo: currentPageNo + 1,
      })
      this.getshangpin();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

//跳转
spxqing:  function  (e)  {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:  '../HGspXQ/HGspXQ?id=' + id,
    })
  },
  sjZY:  function  (e)  {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:  '../HGshangjiaZY/HGshangjiaZY?id=' + id,
    })
  },

})