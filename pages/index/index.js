import { list } from '../../utils/event_store';
import { daysSinceByItem } from '../../utils/calculator';

//获取应用实例
// var app = getApp();
Page({
  data: {
    // userInfo: {},
    eventList: [],
    selectItem: undefined,
    test: function() {
      return 'testttt';
    }
  },
  setEventList(eventList) {
    if (eventList) {
      const newData = {};
      const selectItemId = (this.data.selectItem || '').id;
      newData.eventList = eventList.map(eventItem => {
        eventItem.daysSince = daysSinceByItem(eventItem);
        if (eventItem.id === selectItemId) {
          newData.selectItem = eventItem;
        }
        return eventItem;
      });
      if (!newData.selectItem) {
        newData.selectItem = newData.eventList[0];
      }
      this.setData(newData);
    }
  },

  // onLoad() {
  //   var that = this
  //   //调用应用实例的方法获取全局数据
  //   app.getUserInfo(function(userInfo) {
  //     //更新数据
  //     that.setData({
  //       userInfo,
  //     });
  //   });
  // },

  onShow() {
    this.setEventList(list());
  },

  // 点击事件项目
  onTabEventItem(e) {
    this.setData({
      selectItem: e.currentTarget.dataset.item,
    });
  },
  
  // 点击添加按钮
  onTapEditItem(e) {
    console.log('to:', e.currentTarget.dataset.item.id);
    wx.navigateTo({
      url: `/pages/detail/index?id=${e.currentTarget.dataset.item.id}`,
    });
  },

  // 点击添加按钮
  onTapAdd() {
    wx.navigateTo({
      url: '/pages/detail/index',
    });
  },
})