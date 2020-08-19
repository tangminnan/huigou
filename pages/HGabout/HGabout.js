// pages/tansuo/tansuo.js
Page({
/*页面的初始数据*/
data: {
 select:false,
 grade_name:'产品类型（*必选）',
 grades: [
     '产品类型1',
     '产品类型2',
     '产品类型3',
     '产品类型4',
   ]
},
/* 点击下拉框*/
bindShowMsg() {
 this.setData({
   select: !this.data.select
 })
},
/* 已选下拉框*/
mySelect(e) {
 console.log(e)
 var name = e.currentTarget.dataset.name
 this.setData({
   grade_name: name,
   select: false
 })
},
})