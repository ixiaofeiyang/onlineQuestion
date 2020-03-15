// pages/mode/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    images: ['http://file.xiaomutong.com.cn/20200228/img11.png','http://file.xiaomutong.com.cn/20200228/img12.png','http://file.xiaomutong.com.cn/20200228/img13.jpeg'],
    
    openid: '',
    subjects: [],
    items: [
      { name: '0', value: '单题模式', checked: 'true' },
      { name: '1', value: '列表模式' }
    ],
    examcode: '',
    _id: '0000'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let examcode = options.code;
    this.setData({
      examcode
    });    
    this.onQuery(examcode);
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
  toExamPage: function(e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let that = this;
    let url;
    wx.showActionSheet({
      itemList: ['随机测试', '固定练习'],
      success (res) {
        console.log(res.tapIndex);
        switch(res.tapIndex){
          case 0:
            url = '/pages/exam/exam?id='+id;
            that.query(id,url);
            break;
          case 1:
            url = '/pages/select/select?id='+id;
            that.query(id,url);
            break;
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
    
  },  
  query: function(id,url){
    const db = wx.cloud.database()
    db.collection('subject').doc(id)
    .get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res);
        wx.setStorageSync('subject', res.data);
        
        wx.navigateTo({
          url: url
        })
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
  onQuery: function (code) {

    const db = wx.cloud.database()
    db.collection('subject').where({
      examcode: code
    }).get({
      success: res => {
        wx.setStorageSync('subjects', res.data);
     
        this.setData({
          subjects: res.data
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
  }
})