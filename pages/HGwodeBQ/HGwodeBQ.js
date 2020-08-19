Page({
  data: {
  checkboxArr: [{
   name: '选项A',
   checked: false
  }, {
   name: '选项B',
   checked: false
  }, {
   name: '选项C',
   checked: false
  }, {
   name: '选项D',
   checked: false
  }, {
   name: '选项E',
   checked: false
  }, {
   name: '选项F',
   checked: false
  }, {
    name: '辣妈',
    checked: false
   }, {
    name: '选项G',
    checked: false
   }, {
    name: '选项H',
    checked: false
   }],
  },
  checkbox: function (e) {
  var index = e.currentTarget.dataset.index;//获取当前点击的下标
  var checkboxArr = this.data.checkboxArr;//选项集合
  checkboxArr[index].checked = !checkboxArr[index].checked;//改变当前选中的checked值
  this.setData({
   checkboxArr: checkboxArr
  });
  },
  checkboxChange: function (e) {
  var checkValue = e.detail.value;
  this.setData({
   checkValue: checkValue
  });
  },
  confirm: function() {// 提交
  console.log(this.data.checkValue)//所有选中的项的value
  },
 })
 