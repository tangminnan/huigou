Page({
  data: {
    model: 0,//弹框状态
  },
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
})