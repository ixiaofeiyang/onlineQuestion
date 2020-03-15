// miniprogram/pages/study/study.js
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightoption: '',
    selectedoption: '',
    percent: 0,
    btnText: '下一题',
    rightNum: 0,
    idx: 0,
    length: 0,
    question: {

    },
    errNum: 0,
    rightNum: 0,
    score_arr: [],
    options_arr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let ordernum = options.ordernum;

    this.onQuery(ordernum);
    this.onGetOpenid();
    this.setData({
      ordernum
    })
  },
  onQuery: function(ordernum){
    let that = this;
    const db = wx.cloud.database();

    db.collection('notes').where({
      ordernum: ordernum
    })
    .get()
    .then(res => {
      console.log('[数据库] [查询记录] 成功: ', res)
      let notes = res.data;
      that.setData({
        notes,
        length: notes.length
      },()=>{
        that.queryQues(0);
      })
    })
  },
  queryQues: function(idx){
    let notes = this.data.notes;
    let note = notes[idx];
    let question = note.question;
    let options = note.options;
    let rightoption = '';
    let selectedoption = '';
    options.forEach((option)=>{
      if(option.value == 1){
        rightoption += option.code;
      }
      if(option.selected){
        selectedoption += option.code;
      }
    })
    this.setData({
      rightoption,
      selectedoption,
      question,
      options
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
  generate: function(){
    return util.formatTime(new Date());
  },
  selectOption: function(e){
    console.log(e.currentTarget.dataset);

  },
  goHome: function(){
      let url = '/pages/home/index';
      wx.switchTab({
        url: url
      })
  },
  generate: function(){
    return util.formatTime(new Date());
  },
  doNext: function(){
    console.log('doNext')
    
    
    
    let idx = this.data.idx;
    let length = this.data.length;
    idx++;

    let options = this.data.options;
    let isRight = true;
    for (const option of options) {
      console.log(option);
      if(option.selected == true && option.value == 0){
        isRight = false;
        break;
      }
    }
    let rightNum = this.data.rightNum;
    let errNum = this.data.errNum;
    if(isRight){
      rightNum++;
    }else{
      errNum++;
    }
    let score_arr = this.data.score_arr;
    let options_arr = this.data.options_arr;
    score_arr[this.data.idx] = isRight;
    options_arr[this.data.idx] = options;

    let items = this.data.items;
    
    let percent = ((idx+1)/length)*100;
    if(idx == length){
      this.setData({
        rightNum,
        errNum,
        score_arr,
        options_arr
      },()=>{
        this.goHome();
      })
      return;

    }

    if(length-idx == 1){
      this.setData({
        btnText: '完成'
      })
      wx.showToast({
        icon: 'none',
        title: '已经是最后一题了'
      })
    }


    this.queryQues(idx);

    this.setData({
      rightNum,
      errNum,
      score_arr,
      options_arr,
      idx,
      percent
    },()=>{
      
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