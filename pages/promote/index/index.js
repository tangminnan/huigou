const app = getApp();
const userApi = require('../../../api/user');
Page({
  data: {
  
      notRecorded: 500,
      balance: 1500
    
  },
  //查询余额 待入账
  getExtension:async function(){
    const user = await userApi.getOpenId();
    console.info("-----------------------");
    console.info(user);
    console.info("-----------------------");
    wx.request({
      method: 'GET',
      url: 'https://testh5.server012.com/api/info/selectMyUser',
      data:{id: user.userId},
      success: (res) => {
        if (res.data.code == 0) {
          console.info("-----------余数额度-----------------------");
          console.info(res);
          console.info("-----------余数额度-----------------------");
          console.info(res.data.msg);
          this.setData({
           
            notRecorded: res.data.data.hgUserInfo.arnExtension,
            balance:res.data.data.hgUserInfo.balanceExtension
           });
          }
      }
    })
  },
  //分享到小程序
  // shareMiniprogramToFriend: async function () {console.info("==============");
  // const user = await userApi.getOpenId();
    
  //      return {
  //        title: '惠购',
  //        path: '../../pages/mine/mine?userId='+user.userId,
  //        imageUrl: '',
  //        success: (res) => {
          
  //        }
  //      } 
  // },

   onShareAppMessage: function (e) {
     var type = e.target.dataset.type;
     var userInfo = app.globalData.userInfo
      // if(type==1){
      //   return {
      //     title: this.data.shangpin.title,
      //     path: 'pages/HGspXQ/HGspXQ?id=' + this.data.goodId+'&userId='+this.data.userInfo.id,
      //    imageUrl: this.data.sptupian[0].picture,
      //     success: (res) => {
          
      //    }
      //   }
      // }
     if(type==2){console.info("=======分享小程序给好友========");
        return {
          title: '惠购小程序',
          path: '/pages/index/index',
          imageUrl: '../../../assets/share-miniprogram.png',
          success: (res) => {
          
          }
        }
     }

     if(type==3){console.info("======分享二维码给好友=========");
     return {
       title: '惠购小程序二维码',
       path: '/pages/index/index',
       imageUrl: '../../../assets/share-qrcode.png',
       success: (res) => {
       
       }
     }
  }
    
   },





  onLoad: async function (options) {
      this.getExtension();
      wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  //    return {
  //      title: '微信小程序联盟',
  //      desc: '最具人气的小程序开发联盟!',
  //      path: '/pages/promote/index/index?id=123'
  //    }

  // },
  onShareTimeline: function () {
    return {
      title: ''
    }
  },
  shareProductToFriend: function () {
    wx.navigateTo({
      url: '/pages/HGfenlei/HGfenlei',
    })
  },
      shareMiniprogramToFriend: function () {console.info("微信分享");
         wx.showShareMenu({
         menus: ['shareAppMessage', 'shareTimeline'],
           withShareTicket: true,
           success:(res)=>{
                 console.info("===分享success==");
           }
         });
      //  this.onShareAppMessage();
     
      },
  sign: function (e) {
    wx.navigateTo({
      url: '/pages/promote/sign/index',
    })
  },
  handleGoWallet: function () {
    wx.navigateTo({
      url: '/pages/promote/wallet/index',
    })
  }
})