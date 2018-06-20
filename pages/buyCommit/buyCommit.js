const app = getApp()
Page({
  data: {
    user:''
  },
  commentSubmit:function(opt){
    let that = this
    let user = app.globalData.userInfo.nickName == 'Åℓαñ✐郎' ? "langwenda" : app.globalData.userInfo.nickName
    opt.BuyCheckPerson = user

    wx.showToast({
        title: "加载中",
        icon: "loading",
        duration: 10000
    })

    wx.request({
        url: 'https://www.langwenda.cn/api/BuyCommit',
        data: opt,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        success: function (res) {
          console.log(res)
          if (res.data.code == 0){
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
          }else{
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
  },
  onLoad:function(){
    let that = this
  }
})

