const app = getApp()
Page({
  data: {
    formData: {}
  },
  bindAgree:function(){
    wx.showModal({
      title: "提示",
      content: "功能开发中，敬请期待。",
      showCancel: false,
      confirmText: "确定"
    })
  },
  bindDisagree: function () {
    wx.showModal({
      title: "提示",
      content: "功能开发中，敬请期待。",
      showCancel: false,
      confirmText: "确定"
    })
  },
  onLoad: function (option) {
    let that = this
    let id = option.id
    console.log(id);
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
        formData: buyItem
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