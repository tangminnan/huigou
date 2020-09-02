const payApi = require('../../../api/order')
const userApi = require('../../../api/user')
const addressApi = require('../../../api/address');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressFee: 0,
    total: 0,
    shoppingList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const channel = this.getOpenerEventChannel();
    if (channel) {
      console.log('shoppingList', channel);
      channel.on('shoppingList', shoppingList => {
        console.log('shoppingList', shoppingList);
        this.setData({
          shoppingList
        }, () => {
          this.setData({
            total: this.getTotal(),
            expressFee: this.getTotalExpressFee()
          })
        })
      })
    }
    this.setDefaultAddress();
  },
  setDefaultAddress: async function () {
    let data;
    try {
      data = await addressApi.getAddressList();
      console.log('data', data);
    } catch (e) {
      console.log('ignore error')
      return;
    }
    if (!this.data.address && data.data && data.data.length) {
      let defaultAddress = data.data.find(item => item.isDefault);
      defaultAddress = defaultAddress || data.data[0];
      this.setData({
        address: defaultAddress
      })
    }
  },
  onClickSubmit: async function () {
    const userInfo = await userApi.getOpenId();

    const total = this.getTotal();
    const expressFee = this.getTotalExpressFee();

    if (!this.data.address) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      });
      return;
    }

    const orderInfo = {
      hgOrder: {
        addressId: this.data.address.id,
        payType: 1,
        userId: userInfo.userId,
        account: total + expressFee
      },
      hgOrderTables: []
    };

    this.data.shoppingList.forEach(shop => {
      shop.skuList.forEach(sku => {
        orderInfo.hgOrderTables.push({
          goodsId: sku.goodsId,
          merchantsId: shop.shopId,
          userId: userInfo.userId,
          goodsNum: sku.count,
          goodsPrices: sku.price
        })
      })
    })

    console.log('待提交订单数据', orderInfo);

    let data;
    try {
      data = await payApi.saveOrder(orderInfo);
    } catch (e) {
      console.log(e)
      wx.showToast({
        title: e && e.msg || '出错了，请稍后再试',
        icon: 'none'
      });
      return;
    }

    console.log('data', data);
    const orderId = data.data.orderId;

    wx.navigateTo({
      url: `/pages/shopping-cart/order-confirm/index?orderId=${orderId}`,
      success: (res) => {
        res.eventChannel.emit('orderList', {
          shoppingList: this.data.shoppingList,
          address: this.data.address,
          total: this.data.total,
          expressFee: this.data.expressFee
        });
      }
    })
  },
  onClickChooseAddress: function () {
    wx.navigateTo({
      url: '/pages/HGshouhuoDZ/HGshouhuoDZ',
      success: (res) => {
        res.eventChannel.on('choosed_address', address => {
          this.setData({
            address
          })
        })
      }
    })
  },
  getTotalExpressFee() {
    return this.data.shoppingList.reduce((sum, item) => {
      sum += item.skuList.reduce((s, sku) => {
        s += sku.expressFee
        return s;
      }, 0)
      return sum;
    }, 0);
  },
  getTotal() {
    return this.data.shoppingList.reduce((sum, item) => {
      sum += item.skuList.reduce((s, sku) => {
        s += Math.floor(sku.price * sku.count * 100 + 0.5) / 100
        return s;
      }, 0)
      return sum;
    }, 0);
  }
})