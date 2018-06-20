const app = getApp()
Page({
  data: {
    formData:{}
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
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
      url: 'https://www.langwenda.cn/api/GetBuyList',
      data: {
        imei: 1,
        user: user
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

