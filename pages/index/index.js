//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    focus: false,
    inputValue: ''
  },
  //跳转
  more: function () { wx.navigateTo({url: '../HGspXQ/HGspXQ',})},
  hufu: function () { wx.navigateTo({url: '../HGfenleiList/HGfenleiList',})},
  gengduo: function () { wx.navigateTo({url: '../HGfenlei/HGfenlei',})},

})
