const app = getApp()
Page({
  data: {
    id:0,
    type:0,
    log:'',
    user:'',
    imei:0
  },
  commentSubmit: function (e) {
    let that = this
    let content = e.detail.value.content
    if(content == ""){
      wx.showModal({
        title: "提示",
        content: "请输入拒绝理由",
        showCancel: false,
        confirmText: "确定"
      })
    }else{
      let user = app.globalData.userInfo.nickName == 'Åℓαñ✐郎' ? "langwenda" : app.globalData.userInfo.nickName
      that.setData({
        log:content,
        user:user
      })
      wx.showToast({
        title: "加载中",
        icon: "loading",
        duration: 10000
      })
      wx.request({
        url: 'https://www.langwenda.cn/api/BuyCheckCommit',
        data: that.data,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
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
    }
  }
  ,
  onLoad:function(opt){
    let that = this
    let id = opt.id
    that.setData({
      id:id,
    })
  }
})

