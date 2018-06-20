const app = getApp()
Page({
  data: {
    arrType: [],
    arrLevel: [],
    arrPerson:[],
    user:'',
    formData:{},
    typeIndex:0,
    levelIndex:0,
    personIndex:0,
    BuyTime:''
  },bindTypeChange:function(e){
    console.log(e)
    this.setData({
        typeIndex:e.detail.value
    })
  },bindLevelChange:function(e){
    this.setData({
      levelIndex:e.detail.value
    })
  },bindDateChange:function(e){
    this.setData({
      BuyTime:e.detail.value
    })
  },
  commentSubmit:function(opt){
    let that = this
    let user = app.globalData.userInfo.nickName == 'Åℓαñ✐郎' ? "langwenda" : app.globalData.userInfo.nickName
    let data = opt.detail.value
    data.BuyAuthor = user

    wx.showToast({
        title: "加载中",
        icon: "loading",
        duration: 10000
    })
    wx.request({
        url: 'https://www.langwenda.cn/api/BuyCommit',
        data: data,
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
          wx.showModal({
            title: "提示",
            content: "无法连接到服务器",
            showCancel: false,
            confirmText: "确定"
          })
        },
        complete: function () {
          // complete  
        }
    })
  },
  onLoad:function(){
    let that = this
    let user = app.globalData.userInfo.nickName == 'Åℓαñ✐郎' ? "langwenda" : app.globalData.userInfo.nickName
    wx.request({
      url: 'https://www.langwenda.cn/api/GetTypes',
      data:{imei:0},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      success: function (res) {
        console.log(res)
        if (res.data.code == 0){
          that.setData({
            arrType : res.data.data
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
      complete: function () {
        // complete  
      }
    })
    wx.request({
      url: 'https://www.langwenda.cn/api/GetLevels',
      data:{imei:0},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      success: function (res) {
        console.log(res)
        if (res.data.code == 0){
          that.setData({
            arrLevel : res.data.data
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
      complete: function () {
        // complete  
      }
    })
    wx.request({
      url: 'https://www.langwenda.cn/api/GetPersons',
      data:{user:user,imei:0},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      success: function (res) {
        console.log(res)
        if (res.data.code == 0){
          that.setData({
            arrPerson : res.data.data
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
      complete: function () {
        // complete  
      }
    })
  }
})

