Page({  
  data: {    
    items: [
  
    ],

    checkboxArr: [],
    userName: '',//用户名
    phone: '',//手机号
    sex: '',
    shequ: '',
    shequid: '',
    checkValue:[],
    checkboxText: [],

    },


  biaoqian: function (e) {
    wx.request({
      method: 'GET',
      url: 'http://182.92.118.35:8098/api/community/searchAllCommunity',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.info(res.data);
        if (res.data.code == 0) {
          this.setData({
            checkboxArr: res.data.data
          })
        }

      }
    })
  },

  saveshequ: function () {
    wx.request({
      method: 'POST',
      url: 'http://182.92.118.35:8098/api/info/updateHgUserCommunity',
      data: {
        id: this.data.userInfo.id,
        communityId: this.data.shequid
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

  onLoad: function (options) {
    //console.info(options);
    this.biaoqian();
    this.setData({
      userName: options.userName,
      phone: options.phone,
      sex: options.sex,
      checkValue: options.checkValue,
      checkboxText: options.checkboxText,
    })
  },

  radioChange: function (e) {
    var shequshu = e.detail.value;
    //console.info(shequshu);
      var sq = e.detail.value.split(',');
      this.setData({
        shequ: sq[0],
        shequid: sq[1]
      });
    this.saveshequ();
    wx.navigateTo({
      url: '../HGgerenXX/HGgerenXX?checkValue=' + JSON.stringify(this.data.checkValue) + '&checkboxText=' + JSON.stringify(this.data.checkboxText) + '&userName=' + this.data.userName + '&phone=' + this.data.phone + '&sex=' + this.data.sex + '&shequ=' + this.data.shequ + '&shequid=' + this.data.shequid,
     })

  },

 
})