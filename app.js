//app.js
App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo,
      wx.requestPayment)

    wx.BaaS.init('20ee5f635805f0954124')
    wx.Posts = new wx.BaaS.ContentGroup(1540219566931579)

    // 实例化查询对象
    let query = new wx.BaaS.Query()
    // 应用查询对象
    wx.Product = new wx.BaaS.TableObject(55844)
   
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
  },
  globalData: {
    userInfo: null
  }
})