// pages/start/start.js
var app = getApp();
let md5 = require('../../utils/md5.js').md5
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    angle: 0,
    status: false, //是否通过审核
    remind: true,
    checkUser: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(md5([1,2,3].join()));
    this.onQuery();
    this.onGetOpenid();
    
  },
  onQuery: function(){
    let that = this;
    const db = wx.cloud.database()
    db.collection('profiles')
    .get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res);
        let items = res.data;
        let userInfoMap = app.globalData.userInfoMap;
        items.forEach(item => {
          userInfoMap[item._openid] = item.userInfo
        });
        console.log(userInfoMap);
        app.globalData.userInfoMap = userInfoMap;
        this.setData({
          user: res.data
        });
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      remind: false
    })
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
  goHome: function(){
    wx.switchTab({
      url: '../home/index'
    });
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        let openid = res.result.openid;
        app.globalData.openid = res.result.openid;
        app.globalData.userInfoMap = {
          openid: {
            
          }
        }
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