// pages/apply/index.js
const userApi = require('../../../api/user');
const requestApi = require('../../../api/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexList: [{
        value: 0,
        label: '男'
      },
      {
        value: 1,
        label: '女'
      }
    ],
    userInfo: {},
    info: {
      selectedSexIndex: 1,
      communityIndex:0,
      path:''
    },
    communityList:[]
    
  },
    //选择所有的社区
  getAllCommunity:function(){
    wx.request({
      url: 'https://testh5.server012.com/api/community/searchAllCommunity',
      method:'GET',
      success: (res)=>{
        if(res.data.code==0 && res.data.data.length>0){
          var arry=[];
          for(let i=0;i<res.data.data.length;i++){
            var community=  res.data.data[i];
              arry.push({communityId:community.id,communityName:community.area+" "+community.community});
          }
          this.setData({
            communityList: arry
              
          })
        }
      }
        })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
      this.getAllCommunity();
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
  onShareAppMessage: function () {

  },
  onSexChange: function (e) {
    console.log('e', e);
    const fieldName = e.target.dataset.field;
    const value = e.detail.value;
    this.setData({
      info: {
        ...this.data.info,
        [fieldName]: value
      }
    })
  },

  //上传认证资料
  onUploadCert: async function (e) {
    const images = await wx.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ['album', 'camera']
    })
    const target = images.tempFilePaths[0];
    const userInfo = await userApi.getOpenId();
    console.info(userInfo);
    console.info("------------------");
    console.info(target);
    console.info("------------------");
      wx.showLoading({
        title: '上传中',
      })
      try {
        await requestApi.saveImage(target, userInfo.userId, 5, 1)
    
        wx.hideLoading()
      } catch (e) {console.info(e);
        wx.hideLoading()
        wx.showToast({
          title: '部分图片上传失败，请稍后重试',
          icon: 'none'
        })
      }
      this.setData({
      info: {
        ...this.data.info,
        path: target
      }
    })
  },
  onAgreeChange: function () {
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        isAgree: !this.data.userInfo.isAgree
      }
    })
  },

   //保存数据
  //  formSubmit: function (event) {
  //   const userInfo = await userApi.getOpenId();
  //   CONSOLOE
  //   var that = this;
  //   var post = event.detail.value;
  //  wx.request({
  //    url: 'http://localhost:8087/address/saveAddress',
  //    method:'POST',
  //    header: {"Content-Type": "application/x-www-form-urlencoded"},
  //    data: {
  //      id: that.data.address.id == undefined ? 0 : that.data.address.id,
  //      name: post.name,
  //      phone: post.phone,
  //      address: post.address,
  //      defaultAddress: that.data.defaultAddress
  //    },
  //    success: function (res) {
  //      console.info(res);
  //      if (res.data.code == 0)
  //        wx.navigateTo({
  //          url: '../shouhuoDD/shouhuoDD'
  //        })
  //    }
  //  })
  //},

  formSubmit: async function (event) {
    var selectedSexIndex=this.data.info.selectedSexIndex;
    var sex=this.data.sexList[selectedSexIndex].value;
    var communityIndex=this.data.info.communityIndex;
    var communityId=this.data.communityList[communityIndex].communityId
    var post = event.detail.value;
    var name=post.name;
    var phone=post.phone;
    var certification=this.data.info.path;
    const user = await userApi.getOpenId();
    console.info(user.userId);
    console.info(name);
    console.info(phone);
    console.info(certification);
    console.info(communityId);
    
    console.info(sex);
    if (!name) {
      return wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
    }

    // if (!sex) {
    //   return wx.showToast({
    //     title: '请选择性别',
    //     icon: 'none'
    //   })
    // }
  if (!phone) {
      return wx.showToast({
        title: '请输入联系方式',
        icon: 'none'
      })
    }

    if (!communityId) {
      return wx.showToast({
        title: '请选择社区',
        icon: 'none'
      })
    }

    if (!certification) {
      return wx.showToast({
        title: '请上传认证资料',
        icon: 'none'
      })
    }

     wx.request({
        url: 'https://testh5.server012.com/api/extension/user/becomeExtension',
         method:'POST',
         header: {"Content-Type": "application/x-www-form-urlencoded"},
         data: {
           id:user.userId,
           name:name,
           sex:sex,
           phone:phone,
           communityId:communityId,
           certification:certification
           },
           success: res=>{console.info(res);
                wx.showToast({
                      icon: 'none',
                      title: res.data.msg
                    });
              if(res.data.code==0){console.info("-------------------");
                         wx.navigateTo({
                          url: '/pages/promote/index/index'          
                        })
                       }
                      }
         });
    

  //   this.selectComponent('#form').validate((valid, errors) => {
  //     console.log(valid, errors);
  //     if (!valid) {
  //       const firstError = Object.keys(errors)
  //       if (firstError.length) {
  //         this.setData({
  //           error: errors[firstError[0]].message
  //         })
  //       }
  //     } else {
  //       wx.showToast({
  //         title: '校验通过'
  //       });
  //       wx.showNavigationBarLoading();
  //       setTimeout(() => {
  //         wx.hideNavigationBarLoading();
  //         getApp().globalData.isPromote = true;
  //         wx.redirectTo({
  //           url: '/pages/promote/index/index',
  //         })
  //         wx.showToast({
  //           title: '保存成功',
  //         })
  //       }, 2000)
  //     }
  //   })
   }
})