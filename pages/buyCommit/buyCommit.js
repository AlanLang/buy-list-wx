const app = getApp()
Page({
  data: {
    ID:0,
    arrType: [],
    arrLevel: [],
    arrPerson:[],
    user:'',
    formData:{},
    BuyType:'',
    BuyLevel:'',
    BuyPerson:'',
    BuyTime:'',
    BtnCommit:true,
    BtnGiveup:false,
    BtnSave:false,
    shouBack:false
  },bindTypeChange:function(e){
    this.setData({
      BuyType: this.data.arrType[e.detail.value].TypeName
    })
  },bindLevelChange:function(e){
    this.setData({
      BuyLevel: this.data.arrLevel[e.detail.value].BuyLevel
    })
  },bindPersonChange:function(e){
    this.setData({
      BuyPerson: this.data.arrPerson[e.detail.value].UserName
    })
  }
  ,
  bindDateChange:function(e){
    this.setData({
      BuyTime:e.detail.value,
    })
  }, bindSave:function(){
    let that = this
    wx.showModal({
      title: "提示",
      content: "确定完成购买吗？",
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
          url: 'https://www.langwenda.cn/api/UpdateBuyListType',
          data: {
            id:that.data.ID,
            status:5,
            imei:1
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          success: function (res) {
            console.log(res)
            if (res.data.code == 0) {
              wx.showModal({
                title: "提示",
                content: "成功完成购买",
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
      }
    })

  }, bindGiveup:function(){
    let that = this
    wx.showModal({
      title: "提示",
      content: "确定放弃购买吗？",
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
          url: 'https://www.langwenda.cn/api/UpdateBuyListType',
          data: {
            id: that.data.ID,
            status: 4,
            imei:1
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          success: function (res) {
            console.log(res)
            if (res.data.code == 0) {
              wx.showModal({
                title: "提示",
                content: "成功放弃购买",
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
      }
    })

  },
  commentSubmit:function(opt){
    let that = this
    let user = app.globalData.userInfo.nickName == 'Åℓαñ✐郎' ? "langwenda" : app.globalData.userInfo.nickName
    let data = opt.detail.value
    data.BuyAuthor = user
    data.ID = that.data.ID
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
  onLoad:function(opt){
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
    let id = opt.id
    if(id > 0){
      let buyList = app.globalData.buyList;
      let buyItem = buyList.find(function (x) {
        return x.ID == id;
      })
      console.log(buyItem.BuyTypeName)
      if(buyItem != undefined){
        that.setData({
          formData: buyItem,
          id:id,
          BuyTime: buyItem.BuyTime,
          BuyLevel:buyItem.BuyLevel,
          BuyPerson: buyItem.BuyCheckPerson,
          BuyType: buyItem.BuyTypeName,
          ID:buyItem.ID
        })
        if (buyItem.BuyState == 1){
          that.setData({
            BtnCommit:false
          })
        }
        if (buyItem.BuyState == 2 || buyItem.BuyState == 0) {
          that.setData({
            BtnGiveup:true
          })
        }
        if (buyItem.BuyState == 3) {
          that.setData({
            BtnCommit: false,
            BtnGiveup: true,
            BtnSave:true
          })
        }
        if(buyItem.BuyState == 2){
          wx.request({
            url: 'https://www.langwenda.cn/api/GetCheckMsg',
            data:{imei:0,id:that.data.ID},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
            success: function (res) {
              console.log(res)
              if (res.data.code == 0){
                that.setData({
                  BackMsg : res.data.data.LogMsg,
                  shouBack:true
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
    }
  }
})

