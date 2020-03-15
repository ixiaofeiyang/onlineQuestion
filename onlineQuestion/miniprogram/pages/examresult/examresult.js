Page({

  data: {

  },

  onLoad: function (e) {
    this.setData({
      md5: e.md5,
      ordernum: e.ordernum,
      rightNum: e.rightNum,
      errNum: e.errNum,
      unAnswerNum: parseInt(e.length) - (parseInt(e.rightNum) + parseInt(e.errNum) )
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  examBack: function () {
    wx.redirectTo({
      url: "../note/note?ordernum="+this.data.ordernum
    });
  },
  goRank: function(){
    wx.navigateTo({
      url: "../rank/rank?md5="+this.data.md5
    });
  },

  exam_repeat: function () {
    wx.switchTab({
      url: "../home/index"
    });
  }
})