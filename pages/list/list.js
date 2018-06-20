const app = getApp()
Page({
  data: {
    id:0,
    formData: {}
  },
  bindAgree:function(){//点击同意按钮
    let that = this
    let user = app.globalData.userInfo.nickName == 'Åℓαñ✐郎' ? "langwenda" : app.globalData.userInfo.nickName
    let data = {
      id: that.data.id,
      type: 1,
      log: '同意',
      user: user,
      imei: 0
    }
    wx.showModal({
      title: "提示",
      content: "确定同意购买吗？",
      showCancel: true,
      confirmText: "确定",
      success: function (res) {
        if (res.cancel){
          return
        }
        wx.showToast({
          title: "加载中",
          icon: "loading",
          duration: 10000
        })

        wx.request({
          url: 'https://www.langwenda.cn/api/BuyCheckCommit',
          data: data,
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          success: function (res) {
            console.log(res)
            if (res.data.code == 0) {
              wx.showModal({
                title: "提示",
                content: res.data.msg,
                showCancel: false,
                confirmText: "确定",
                success: function () {
                  wx.reLaunch({
                    url: '../index/index'
                  })
                }
              })
            } else {
              wx.showModal({
                title: "提示",
                content: res.data.err,
                showCancel: false,
                confirmText: "确定"
              })
            }
            wx.hideToast()
          },
          fail: function () {
            // fail  
          },
          complete: function () {
            // complete  
          }
        })
      }
    })

  },
  bindDisagree: function () {//点击不同意按钮
    wx.navigateTo({
      url: '../disagree/disagree?id='+this.data.id
    })
  },
  onLoad: function (option) {
    let that = this
    let id = option.id
    wx.showToast({
      title: "加载中",
      icon: "loading",
      duration: 5000
    })
    let buyList = app.globalData.buyList;
    let buyItem = buyList.find(function (x) {
      return x.ID == id;
    })
    if(buyItem != undefined){
      that.setData({
        formData: buyItem,
        id:id
      })
    }else{
      wx.showModal({
        title: "提示",
        content: "无数据，点击确定按钮关闭本页面",
        showCancel: false,
        confirmText: "确定",
        success:function(){
          wx.navigateBack();
        }
      })
    }
    wx.hideToast()
  }
})