Page({
  data: {
    model: 0,//弹框状态
    orderId:'',
    orderde:[],
    ifdingdan:0
  },

  orderIdInput:function(e){
    this.setData({
      orderId: e.detail.value
    })
  },

  showview:function(){
    wx.request({
      method:'Get',
      url: 'http://182.92.118.35:8098/api/order/selectOrderByOrderId',
      data: { orderId:this.data.orderId},
      success:res=>{
        console.info(res.data);
        if (res.data.code == 0){
          if (res.data.data.length>0){
              this.setData({
                orderde:res.data.data,
                model: 1,
                ifdingdan:1
              })
            }else{
            this.setData({
              model: 1,
              ifdingdan: 0
            })
            }
        }
      }

    })
  },

  // showview: function () {//弹框显示
  //   this.setData({
  //     model: 1
  //   })
  //   console.log("111")
  // },
   model1: function () {//弹框消失
     this.setData({
       model: 0
     })
   },

})