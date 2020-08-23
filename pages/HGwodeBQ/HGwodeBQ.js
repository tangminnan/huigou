
Page({
  data: {
  /* 
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
   */
    checkboxArr:[],
    userName: '',//用户名
    phone: '',//手机号
    sex: '',
    shequ: '',
    shequid:'',
    checkboxText: [],
  },

  biaoqian: function (e){
    wx.request({
      method: 'GET',
      url: 'http://182.92.118.35:8098/api/label/searchAllLabel',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        //console.info(res.data);
        if (res.data.code == 0) {
          this.setData({
            checkboxArr: res.data.data
          })
        }

      }
    })
  },

  onLoad: function (options) {
    this.biaoqian();
    this.setData({
      userName: options.userName,
      phone: options.phone,
      sex: options.sex,
      shequ: options.shequ,
      shequid: options.shequid,
    })
  },
  checkbox: function (e) {
  var index = e.currentTarget.dataset.index;//获取当前点击的下标
  var checkboxArr = this.data.checkboxArr;//选项集合
  checkboxArr[index].checked = !checkboxArr[index].checked;//改变当前选中的checked值
  this.setData({
    checkboxArr: checkboxArr,
  });
  },
  checkboxChange: function (e) {
  var checkValue = e.detail.value;
  this.setData({
   checkValue: checkValue
  });
  },

  savebiaoqian:function(){
    wx.request({
      method: 'POST',
      url: 'http://182.92.118.35:8098/api/info/updateHgUserLabel',
      data: {
        id: this.data.userInfo.id,
        labels: JSON.stringify(this.data.checkValue)
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        //console.info(res.data);
        if (res.data.code == 0) {
          wx.showToast({
            title: '操作成功',
            icon: 'none',
            duration: 2000
          })
        }

      }
    })
  },

  confirm: function() {// 提交
    if (this.data.checkValue==null){
      wx.showToast({
        title: '请选择',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    var checkboxText = [];
    for (var i = 0; i < this.data.checkboxArr.length;i++){
      if (this.data.checkboxArr[i].checked==true){
        checkboxText.push(this.data.checkboxArr[i].labelName);
        }
    }
    this.setData({
      checkboxText: checkboxText,
    });
    this.savebiaoqian();
    wx.navigateTo({
      url: '../HGgerenXX/HGgerenXX?checkValue=' + JSON.stringify(this.data.checkValue) + '&checkboxText=' + JSON.stringify(this.data.checkboxText) + '&userName=' + this.data.userName + '&phone=' + this.data.phone + '&sex=' + this.data.sex + '&shequ=' + this.data.shequ + '&shequid=' + this.data.shequid,
    })
  },
  chongzhi: function (e) {// 重置
    this.biaoqian();
  },


 })
 