Page({
 
  /* 页面的初始数据 */
  data: {
  curNav:1
  },
  /* 把点击到的某一项 设为当前curNav */
  switchRightTab:function(e){
  let id = e.target.dataset.id;
  console.log(id);
  this.setData({
  curNav: id
  })
  },
//跳转
spxqing: function () { wx.navigateTo({url: '../HGspXQ/HGspXQ',})},
sjZY: function () { wx.navigateTo({url: '../HGshangjiaZY/HGshangjiaZY',})},

 })
 