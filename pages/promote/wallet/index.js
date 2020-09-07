
const userApi = require('../../../api/user');
Page({
  data: {
    tabs: ['待入账', '余额', '提现明细'],
    activeTab: 1,
    extensionBill:[],
    extensionBalance:0,
    extensionBillCash:[],
  },

  //查询推广端 待入账 余额 提现明细
  getExtensionInfo:async function(){
    const user = await userApi.getOpenId();
    console.info("-----------------------");
    console.info(user);
    console.info("-----------------------");
    wx.request({
      method: 'GET',
      url: 'https://testh5.server012.com/api/extension/user/selectMyExtensionBill',
      data:{id: user.userId},
      success: (res) => {
        if (res.data.code == 0) {
          console.info(res.data.msg);
          this.setData({
              extensionBill: res.data.data,
           });
          }
      }
    }),
    wx.request({
      method: 'GET',
      url: 'https://testh5.server012.com/api/extension/user/selectMyExtensionBalance',
      data:{id: user.userId},
      success: (res) => {
        if (res.data.code == 0) {
          console.info(res.data.msg);
          this.setData({
            extensionBalance: res.data.data
            });
          
        }
      }
    }),
  wx.request({
    method: 'GET',
    url: 'https://testh5.server012.com/api/extension/user/selectMyExtensionBillCash',
    data:{id: user.userId},
    success: (res) => {
      if (res.data.code == 0) {
         console.info(res.data.msg);
          this.setData({
          extensionBillCash: res.data.data
          });
      }
    }
  })
},
  onLoad() {
      this.getExtensionInfo();

  },

  onTabClick(e) {
    const index = e.currentTarget.dataset.index
    console.log(e)
    this.setData({
      activeTab: index
    })
  },
  onClickWithdraw(e) {
    wx.navigateTo({
      url: '/pages/promote/withdraw/index',
    })
  }
})