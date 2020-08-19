Page({
  data:{
    //生日
   dates: '2016-11-08',
   //身高数组
   array:['160cm','165cm','170cm','175cm','180cm'],
   type:0,
   choseQuestionBank:"160cm",
   //体重数组
   objectArray: [
    {
      id: 0,
      name: '45kg'
    },
    {
      id: 1,
      name: '50kg'
    },
    {
      id: 2,
      name: '55kg'
    },
    {
      id: 3,
      name: '60kg'
    }
  ],
  objectIndex: 0,//默认显示位置
   //省市区选择器：
   region: ['省', '市', '区'],
   customItem: '请选择'//为每一列的顶部添加一个自定义的项
  },
  // 身高组件确定事件
  bindPickerChange: function (e) {
   var that=this
   console.log('picker发送选择改变，携带值为', e.detail.value)
   this.setData({
    type: e.detail.value,
    choseQuestionBank: that.data.array[e.detail.value]
   })
  },
  //  点击体重组件确定事件  
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      objectIndex: e.detail.value
    })
  },

  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
   this.setData({
     dates: e.detail.value
   })
 },

 //省市区选择器：
 bindRegionChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    region: e.detail.value
  })
},

//跳转
biaoqian: function () { wx.navigateTo({url: '../HGwodeBQ/HGwodeBQ',})},
shequ: function () { wx.navigateTo({url: '../HGshequ/HGshequ',})},

 })