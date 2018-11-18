//logs.js

Page({
  data: {
    post:{},
    border_color: "borderorange",
    fontcolor: "fontorange",
    image_act: "",
    head_change: "",
    seen_num:0,
    like_num: 0,
    article_id:0,
    id:"",
    like_bool:false,
    titleImage:''
  },
  onLoad: function (options) {
    wx.likeNum = options.good*1
    wx.seenNum = options.seen*1+1

    wx.Pro = wx.Product.getWithoutData(options.id)
    wx.Pro.set('seen', options.seen*1+1)
    wx.Pro.update()
    /*传给转发的文章标识*/
    wx.Index = (options.index)*1;
    
    wx.showLoading({
      title: '疯狂加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    
    wx.Posts.getContent(options.article_id).then(({data}) => {
      var that = this
      that.setData({
        post : data,
        like_num: options.good,
        article_id: options.article_id,
        id:options.id,
        titleImage:data.cover
      })
      /*传给转发的页面题目*/
      wx.Title = data.title;
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  changecolor: function () {
   if (this.like_bool == true)
    {
      wx.showToast({
        title: '您已赞过了，兄dei',
        icon: 'none'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
      return
    }

    /*震动*/
    wx.vibrateShort()
    wx.likeNum = wx.likeNum*1+1
    var that = this
    that.setData({
      border_color: "bordergray",
      fontcolor: "fontgray",
      image_act: "imagemove",
      head_change: "headbig",
      like_num: wx.likeNum
    })
    this.like_bool = true

    // 点赞加一
    wx.Pro.set('like_number', wx.likeNum*1)
    wx.Pro.update()

  },
  onShareAppMessage: function (res) {
    return {
      title: wx.Title,
      path: '/pages/index/index?id='+wx.Index,
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
