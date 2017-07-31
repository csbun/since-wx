import { list } from '../../utils/event_store';

//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    eventList: [],
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo,
      });
    });
    this.setData({
      eventList: list(),
    });
  },

  //
  onTapAdd: function() {
    wx.navigateTo({
      url: '../detail/index'
    });
  },
})