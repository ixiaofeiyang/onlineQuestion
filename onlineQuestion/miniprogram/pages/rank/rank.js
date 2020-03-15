var app = getApp();
Page({

  data: {
    cateid:'',
    moreData:true,
    markShow: !1,
    page:1,
    limit:50,
    rankList:[],
  },

  onLoad: function (options) {
    console.log(app.globalData.userInfoMap);
    let md5 = options.md5;
    this.onQuery(md5);
  },
  onQuery: function(md5){
    let that = this;
    const db = wx.cloud.database()
    db.collection('historys').where({
      md5: md5
    })
    .orderBy('rightNum', 'desc')
    .get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res);
        let items = res.data;
        items.map((it)=>{
          if(app.globalData.userInfoMap[it._openid]){
            it.avatarUrl =  app.globalData.userInfoMap[it._openid].avatarUrl || '/images/header.png';
            it.nickName = app.globalData.userInfoMap[it._openid].nickName || '未命名';
          }else{
            it.avatarUrl = '/images/header.png';
            it.nickName = '未命名';
          }

        })
        this.setData({
          rankList: items
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
  onReady: function () {

  },

  onShow: function () {
    
    
  },

  goBack: function () {
    wx.navigateBack({

    })
  },

  
  
  onShareAppMessage: function () {
    return {
      title: "快来看看我的答题成绩吧！",
      path: "pages/start/start",
      imageUrl: "http://file.xiaomutong.com.cn/9353ef0240fb00bc800956b373ee92e5.png"
    }
  },

  go_show_mark: function () {
    this.setData({
      markShow: !this.data.markShow
    });

  },

  onMyEvent: function (t) {
    console.log(this.data.saveImgUrl)
    1 == t.detail.code && this.go_show_mark(), 2 == t.detail.code && (wx.showLoading({
      title: "图片生成中"
    }), this.go_show_mark(), a.handelShowShareImg(this, this.data.saveImgUrl));
  },
})