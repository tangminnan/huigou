//获取应用实例
const app = getApp()
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

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
//全部标签
  biaoqian: function (e){
    wx.request({
      method: 'GET',
      url: 'https://testh5.server012.com/api/label/searchAllLabel',
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值
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

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
//保存
  savebiaoqian:function(){
    
    wx.request({
      method: 'POST',
      url: 'https://testh5.server012.com/api/info/updateHgUserLabel',
      data: {
        id: this.data.userInfo.id,
        labels: this.data.checkValue.join(",")
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值
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
 