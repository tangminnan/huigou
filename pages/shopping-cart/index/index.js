const shoppingApi = require('../../../api/shopping-cart');

Page({

  /**
   * 页面的初始数据
   * 0: {
   *  checked: false,
   *  skus: {
   *      0: {
   *        checked: false,
   *        count: 1
   *      }
   *  }
   * }
   */
  data: {
    list: [],
    isAllChecked: false,
    total: 0
  },
  onShow: async function (options) {
    this.getCartList()
  },
  getCartList: async function () {
    const res = await shoppingApi.getShoppingCartList();
    const list = res.data;

    const shoppingList = list.map((item) => {

      const shopId = item.hgUserInfo.id;
      const shopName = item.hgUserInfo.shopName;
      const skuList = item.hgGoodsSpecificationDto.map(it => {
        return {
          img: it.hgSpecifications.pic,
          title: it.title,
          price: it.hgSpecifications.goodsPresentPrice,
          skuId: it.hgSpecifications.id,
          goodsId: it.hgSpecifications.goodsId,
          count: 1,
          expressFee: it.expressFee,
          hgCartId: it.hgCartId
        }
      })

      return {
        shopId,
        shopName,
        skuList
      }
    })
    this.setData({
      shoppingList
    }, () => {
      this.setData({
        total: this.getTotal()
      })
    })
  },
  onClickSubmit: function (e) {
    wx.navigateTo({
      url: `/pages/shopping-cart/order-submit/index`,
      success: (res) => {
        const list = this.data.shoppingList.map(shop => {
          const skuList = shop.skuList.filter(sku => sku.checked);
          if (skuList.length) {
            shop.skuList = skuList;
            return shop;
          }
          return null
        }).filter(shop => !!shop);
        console.log('send list', list);
        res.eventChannel.emit('shoppingList', list);
      }
    })
  },
  onCountChange: function (e) {
    const shopId = e.currentTarget.dataset.shopId;
    const skuId = e.currentTarget.dataset.skuId;
    let count = e.detail.value;
    count = Math.floor(count);
    console.log('count', count);
    this.modifyCount(shopId, skuId, 0, count);
  },
  decrease: function (e) {
    const shopId = e.currentTarget.dataset.shopId;
    const skuId = e.currentTarget.dataset.skuId;

    this.modifyCount(shopId, skuId, -1);
  },
  increase: function (e) {
    console.log(e);
    const shopId = e.currentTarget.dataset.shopId;
    const skuId = e.currentTarget.dataset.skuId;

    this.modifyCount(shopId, skuId, 1);
  },
  toggleMerchantChange: function (e) {
    const shouldIgnore = e.target.dataset.role === 'input' || e.target.dataset.role === 'decrease' || e.target.dataset.role === 'increase'
    if (!shouldIgnore) {
      const shopId = e.currentTarget.dataset.id;

      let list = this.data.shoppingList.map(it => {
        if (it.shopId == shopId) {
          it.checked = !it.checked;
          it.skuList = it.skuList.map(sku => {
            sku.checked = it.checked;
            return sku;
          })
        }
        return it;
      })
      this.setData({
        shoppingList: list,
        isAllChecked: list.every(shop => shop.checked),
      }, () => {
        this.setData({
          total: this.getTotal()
        })
      })
    }
  },
  toggleSkuChange: function (e) {
    const targetRole = e.target.dataset.role;
    const shouldIgnore = ['input', 'increase', 'decrease', 'del'].includes(targetRole)

    console.log('shouldIgnore', shouldIgnore);
    if (!shouldIgnore) {
      const shopId = e.currentTarget.dataset.shopId;
      const skuId = e.currentTarget.dataset.skuId;
      console.log('shopId', e, shopId, skuId);
      const list = this.data.shoppingList.map(shop => {
        if (shop.shopId == shopId) {
          shop.skuList = shop.skuList.map(sku => {
            if (sku.skuId == skuId) {
              sku.checked = !sku.checked
            }
            return sku;
          })
          shop.checked = shop.skuList.every(sku => sku.checked)
        }
        return shop;
      })
      this.setData({
        shoppingList: list,
        isAllChecked: list.every(shop => shop.checked),
      }, () => {
        this.setData({
          total: this.getTotal()
        })
      })
    }
  },
  toggleAllChange: function (e) {
    const isAllChecked = !this.data.isAllChecked;
    const list = this.data.shoppingList.map(shop => {
      shop.checked = isAllChecked;
      shop.skuList = shop.skuList.map(sku => {
        sku.checked = isAllChecked
        return sku;
      })
      shop.checked = isAllChecked;
      return shop;
    })
    this.setData({
      isAllChecked,
      shoppingList: list,
    }, () => {
      this.setData({
        total: this.getTotal()
      })
    })
  },
  modifyCount(shopId, skuId, increase, count) {
    const list = this.data.shoppingList.map(shop => {
      if (shop.shopId == shopId) {
        shop.skuList = shop.skuList.map(sku => {
          if (sku.skuId == skuId) {
            let newCount = count !== undefined ? count : sku.count + increase;
            newCount = newCount > 99 ? 99 : newCount;
            newCount = newCount < 1 ? 1 : newCount;
            sku.count = newCount;
          }
          return sku;
        })
      }
      return shop;
    })

    this.setData({
      shoppingList: list
    }, () => {
      this.setData({
        total: this.getTotal()
      })
    })
  },
  getTotal() {
    return this.data.shoppingList.reduce((sum, item) => {
      sum += item.skuList.filter(sku => sku.checked).reduce((s, sku) => {
        s += Math.floor(sku.price * sku.count * 100 + 0.5) / 100
        return s;
      }, 0)
      return sum;
    }, 0);
  },
  delCartItem: async function (e) {
    console.log('删除', e.currentTarget.dataset.cartId)
    try {
      await shoppingApi.removeShoppingCartItem(e.currentTarget.dataset.cartId)
      this.getCartList();
    } catch (e) {
      wx.showToast({
        title: '删除失败，请稍后重试',
        icon: 'none'
      })
    }
  }
})