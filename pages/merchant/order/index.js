// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      type: "notRecorded",
      title: "待确认",
    }, {
      type: "notShipped",
      title: "待发货",
    }, {
      type: 'shipped',
      title: "已发货",
    }, {
      type: 'inAfterSale',
      title: "退换货",
    }, {
      type: 'confirmed',
      title: "已确认",
    }],
    orderList: [{
      status: 0,
      statusDesc: '待确认收货',
      buyer: '18701345677',
      expressNo: 'df12345d342347878',
      productImg: '/assets/product-01.png',
      productName: '蒙牛纯真 常温风味酸牛奶 200g*24 礼盒装',
      count: 1,
      orderTime: '2020-05-28 14:29:52',
      originalPrice: 620.00,
      price: 420.00
    }, {
      status: 1,
      statusDesc: '待确认收货',
      buyer: '18701345677',
      expressNo: 'df12345d342347878',
      productImg: '/assets/product-01.png',
      productName: '蒙牛纯真 常温风味酸牛奶 200g*24 礼盒装',
      count: 1,
      orderTime: '2020-05-28 14:29:52',
      originalPrice: 620.00,
      price: 420.00
    }, {
      status: 2,
      statusDesc: '待确认收货',
      buyer: '18701345677',
      expressNo: 'df12345d342347878',
      productImg: '/assets/product-01.png',
      productName: '蒙牛纯真 常温风味酸牛奶 200g*24 礼盒装',
      count: 1,
      orderTime: '2020-05-28 14:29:52',
      originalPrice: 620.00,
      price: 420.00
    }, {
      status: 3,
      statusDesc: '待确认收货',
      buyer: '18701345677',
      expressNo: 'df12345d342347878',
      productImg: '/assets/product-01.png',
      productName: '蒙牛纯真 常温风味酸牛奶 200g*24 礼盒装',
      count: 1,
      orderTime: '2020-05-28 14:29:52',
      originalPrice: 620.00,
      price: 420.00
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type || 'notRecorded'
    const idx = this.data.tabs.findIndex(tab => tab.type == type);
    console.log('type', type, idx);
    this.setData({
      activeTab: idx == -1 ? 0 : idx
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onChangeActiveTab: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeTab: index
    })
  }
})