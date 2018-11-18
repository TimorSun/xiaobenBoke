//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    posts:[],
    seen:0,
    good:0
  },
  onLoad: function (options) {
    wx.Product.find().then(res => {
      // success
      this.setData({
        posts: res.data.objects
      })
      if (options.id) {
        wx.navigateTo({
          url: "/pages/logs/logs?article_id=" + res.data.objects[options.id].article_id + "&id=" + res.data.objects[options.id].id + "&good=" + res.data.objects[options.id].like_number + "&seen=" + res.data.objects[options.id].seen + "&index=" + options.id
        })
      }
    }, err => {
      // err
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: "小本的博客",
      path: '/pages/index/index',
      /* imageUrl: '这个是显示的图片，不写就默认当前页面的截图',*/
      success: function (shareTickets) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      },
      complete: function (res) {
        // 不管成功失败都会执行
      }
    }
  }

})
