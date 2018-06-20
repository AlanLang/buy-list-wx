const app = getApp()
Page({
  data: {
    formData:{},
    buyStatus:["新增","审核中","被驳回","已通过"]
  }, bindAdd:function(){
    wx.navigateTo({
      url: '../buyCommit/buyCommit'
    })
  },
  onLoad:function(){
    let that = this
    wx.showToast({
      title: "加载中",
      icon: "loading",
      duration: 5000
    })
    let user = app.globalData.userInfo.nickName == 'Åℓαñ✐郎' ? "langwenda" : app.globalData.userInfo.nickName
    wx.request({
      url: 'https://www.langwenda.cn/api/GetMyBuyList',
      data: {
        imei: 1,
        wxuser: user
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      success: function (res) {
        console.log(res)
        if (res.data.code == 0){
          that.setData({
            formData: res.data.data
          })
          app.globalData.buyList = res.data.data
        }else{
          wx.showModal({
            title: "提示",
            content: res.data.err,
            showCancel: false,
            confirmText: "确定",
            success: function () {
              wx.navigateBack();
            }
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

