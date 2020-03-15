const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    openid: '',
    nickName: '',
    avatarUrl: '/images/header.png',
    grade: '',
    name: '',
    userInfo: {
      nickName: ' 请先授权',
      avatarUrl: '/images/header.png',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo);
    this.onGetOpenid();
  },
  
  bindMyHuodong: function(){
    let url = '/pages/activity/index';
    wx.navigateTo({
      url: url
    })
  },
  bindMyHistory: function(){
    let url = '/pages/history/index';
    wx.navigateTo({
      url: url
    })
  },  
  bindMyStudy: function(){
    let url = '/pages/study/index';
    wx.navigateTo({
      url: url
    })
  },    
  bindgoname: function(){
    let url = '/pages/name/index';
    wx.navigateTo({
      url: url
    })
  },
  bindmyinfo: function(){
    let url = '/pages/notice/index';
    wx.navigateTo({
      url: url
    })
  },
  bindgopay: function(){
    let url = '/pages/pay/index';
    wx.navigateTo({
      url: url
    })
  },
  bindgosend: function(){
    let url = '/pages/send/index';
    wx.navigateTo({
      url: url
    })
  },
  bindgoabout: function(){
    let url = '/pages/about/index';
    wx.navigateTo({
      url: url
    })
  },
  bindgorule: function(){
    let url = '/pages/rule/index';
    wx.navigateTo({
      url: url
    })
  }, 
  bindgomode: function(){
    let url = '/pages/mode/index';
    wx.navigateTo({
      url: url
    })
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
    this.onGetOpenid();
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
  tapWechat: function(){
    wx.navigateTo({
      url: '../wechat/wechat',
    })
  },
  queryProfile: function(openid){
    const db = wx.cloud.database()
    db.collection('profiles').doc(openid)
    .get({
      success: res => {
        this.setData({
          grade: res.data.grade || '',
          name: res.data.name || '',
          userInfo: res.data.userInfo
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
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
        let openid = res.result.openid
        that.queryProfile(openid);
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