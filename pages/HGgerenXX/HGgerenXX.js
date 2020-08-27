//获取应用实例
const app = getApp()

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
   customItem: '请选择',//为每一列的顶部添加一个自定义的项

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    sexs: [{ num: 0, value: '男', checked: false }, { num: 1, value: '女', checked: false}],

    userName:'',//用户名
    phone: '',//手机号
    phonetrue: false,
    sexcheck:0,
    sex:'',//性别
    checkValue:[],//标签id
    shequ:'',//社区
    shequid: '',//社区id
    checkboxText:[]//标签名称
  },

  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
    //console.log(e.detail.value)
  },

  phoneInput: function (e) {
    var phone = e.detail.value;
    let that = this
    if (!(/^1[34578]\d{9}$/.test(phone))) {

      this.setData({
        phonetrue: false,
        phone: phone
      })
      if (phone.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      this.setData({
        phonetrue: true,
        phone: phone
      })
      //console.log('验证成功', that.data.phonetrue)
    }
  },

  radiochange:function(e){
    //console.log(e.detail.value)
    if (e.detail.value == '') {
      this.setData({
        sexcheck: 1
      })
    }else {
      this.setData({
        sexcheck : 0,
        sex: e.detail.value
      })
    }

  },

  getshuju: function (options){
    //console.info(options);
    if(!this.objectIsNullOrNot(options)){
    if (options.checkValue == "undefined"){
      var checkV = [];
    }else{
      var checkV = JSON.parse(options.checkValue);
    }
    if (options.checkboxText == "undefined") {
      var checkboxT = [];
    }else{
      var checkboxT = JSON.parse(options.checkboxText);
    }
  
    if (options.sex == 0) {
      this.data.sexs[0].checked = true
    }else if (options.sex == 1) {
      this.data.sexs[1].checked = true
    }else{
        this.data.sexs[0].checked = false,
        this.data.sexs[1].checked = false
    }
      this.setData({
        checkValue: checkV,
        userName: options.userName,
        phone: options.phone,
        sex: options.sex,
        checkboxText: checkboxT,
        sexs: this.data.sexs,
        shequ: options.shequ,
        shequid: options.shequid,
      })
    }
  },
//获取信息
getUserxx:function(){
  wx.request({
    method: 'GET',
    url: 'https://testh5.server012.com/api/info/selectHgUserInfoByUserId',
    data: {
      id: this.data.userInfo.id,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res) => {
      //console.info(res.data);
      if (res.data.code == 0) {
        if (res.data.data.userInfo.sex == 0) {
          this.data.sexs[0].checked = true
        } else if (res.data.data.userInfo.sex == 1) {
          this.data.sexs[1].checked = true
        } else {
          this.data.sexs[0].checked = false,
          this.data.sexs[1].checked = false
        }
        var checkboxT = [];
        var community = '';
        if (res.data.data.hgLabel.length>0){
          for (var i = 0; i < res.data.data.hgLabel.length; i++) {
            checkboxT.push(res.data.data.hgLabel[i].labelName)
          }
        }
        if (res.data.data.hgCommunity!=null){
          community = res.data.data.hgCommunity.community
        }
        this.setData({
          phonetrue: true,
          checkValue: res.data.data.userInfo.labelId,
          userName: res.data.data.userInfo.userName,
          phone: res.data.data.userInfo.phone,
          sex: res.data.data.userInfo.sex,
          checkboxText: checkboxT,
          sexs: this.data.sexs,
          shequ: community,
          shequid: res.data.data.userInfo.communityId,
        })
      }

    }
  })
},

  onLoad: function (options) {
    this.getshuju(options);
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    this.getUserxx();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
//保存
  baocun: function (e) {
    let that = this
    let val = e.detail.value
    let phonetrue = this.data.phonetrue
    if (phonetrue == false ) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 2000
      })
      return false;
    } 
    if (this.data.userName==''){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (this.data.sex==''){
      wx.showToast({
        title: '请选择性别',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    //console.info(this.data.userName);
    //console.info(this.data.phone);
    //console.info(this.data.sex);
    //console.info(this.data.checkValue);
    //console.info(this.data.checkboxText);
    //console.info(this.data.shequ);
    //console.info(this.data.shequid);

    wx.request({
      method: 'POST',
      url: 'https://testh5.server012.com/api/info/updateHgUserInfo',
      data: { 
        id: this.data.userInfo.id ,
        name: this.data.userName,
        sex: this.data.sex,
        phone: this.data.phone
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
          wx.switchTab({
            url: '../mine/mine'
          })
        }

      }
    })

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
objectIsNullOrNot:function(param){
  return JSON.stringify(param)==="{}"?true:false;
},
//跳转
biaoqian: function () { 
  wx.navigateTo({
    url: '../HGwodeBQ/HGwodeBQ?userName=' + this.data.userName + '&phone=' + this.data.phone + '&sex=' + this.data.sex + '&shequ=' + this.data.shequ + '&shequid=' + this.data.shequid,
   })
  },
shequ: function () { 
  wx.navigateTo({
    url: '../HGshequ/HGshequ?userName=' + this.data.userName + '&phone=' + this.data.phone + '&sex=' + this.data.sex + '&checkValue=' + this.data.checkValue + '&checkboxText=' + this.data.checkboxText,
  })},

 })