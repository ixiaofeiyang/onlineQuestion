// miniprogram/pages/wechat/wechat.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onGetOpenid();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onGotUserInfo: function(e) {
    let that = this;
    console.log(e);
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        //拒绝
        wx.showModal({
          showCancel: false,
          title: '提示',
          confirmText: '我知道了',
          content: '为了更好的体验，请您先通过',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })        

    } else if (e.detail.errMsg === 'getUserInfo:ok') {
        //允许
        
        let openid = this.data.openid;
        let userInfo = e.detail.userInfo;
        that.setData({
          flag: true,
          userInfo
        })

        const db = wx.cloud.database();
        db.collection('profiles').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            _id: that.data.openid,
            userInfo: userInfo
          }
        })
        .then(res => {
          console.log(res)
          console.log('[数据库] [查询记录] 成功: ', res);
          that.goMe();
        })
        .catch((err)=>{
          console.log(err)
          that.goMe();
        })

    }

  },
  goMe: function(){
    wx.switchTab({
      url: '../me/index',
    })
  },
  onGetOpenid: function() {
    let that = this;
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login]: ', res)
        app.globalData.openid = res.result.openid
        that.setData({
          openid: res.result.openid
        })
        // wx.navigateTo({
        //   url: '../userConsole/userConsole',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  }
})