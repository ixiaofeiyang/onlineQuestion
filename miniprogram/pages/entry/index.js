// pages/mode/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    name: '',
    modes: [
      { id: '0', title: '单题模式' },
      { id: '1', title: '列表模式'}
    ],
    mode: '0'
  },

  goExam: function(e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    switch(id){
      case '0':
        this.goExam();
        break;
      case '1':
        this.bindListModeTap();
        break;
      default:
        console.log('异常');
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let id = options.id;
    this.setData({
      id
    });
    // this.generate(code);
    this.onQuery(id);
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
  goExam: function () {
    let url = '/pages/exam/exam';
    wx.navigateTo({
      url: url
    })
  },
  bindSimpleModeTap: function () {
    let url = '/pages/simple/index';
    wx.navigateTo({
      url: url
    })
  },
  bindListModeTap: function () {
    let code = this.data.code;
    let url = '/pages/question/index?code=' + code;
    wx.navigateTo({
      url: url
    })
  },
  onQuery: function (id) {

    const db = wx.cloud.database()
    db.collection('subject').doc(id).get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res)
        wx.setStorageSync('subject', res.data);
        let code = res.data.code;
        this.generate(code);
        this.setData({
          code,
          name: res.data.name
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
  generate: function (code) {

    const db = wx.cloud.database()
    db.collection('question').where({
      subjectcode: code
    }).get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res)
        let items = res.data;
        let arr = [];
        items.forEach(element => {
          arr.push(element._id);
        });
        wx.setStorageSync('arr', arr);
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