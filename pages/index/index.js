import { list, del } from '../../utils/event_store';
import { daysSinceByItem } from '../../utils/calculator';

const MAX_MX = 160;
let recordStartX, currentOffsetX;

//获取应用实例
// var app = getApp();
Page({
  data: {
    // userInfo: {},
    moving: false,
    mi: undefined, // movetable-item index
    mx: 0,         // movetable-item translateX
    eventList: [],
    selectItem: undefined,
    test: function() {
      return 'testttt';
    }
  },
  setEventList() {
    const eventList = list();
    const newData = {
      moving: false,
      mi: undefined,
      mx: 0,
    };
    const selectItemId = (this.data.selectItem || '').id;
    newData.eventList = eventList.map(eventItem => {
      eventItem.daysSince = daysSinceByItem(eventItem);
      if (eventItem.id === selectItemId) {
        newData.selectItem = eventItem;
      }
      return eventItem;
    });
    if (!newData.selectItem) {
      newData.selectItem = newData.eventList[0] || {};
    }
    this.setData(newData);
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
    this.setEventList();
  },

  // 点击 item
  onTapSelectItem(e) {
    const { item } = e.currentTarget.dataset;
    this.setData({
      selectItem: item,
    });
  },

  // 点击添加按钮
  onTapEditItem(e) {
    wx.navigateTo({
      url: `/pages/detail/index?id=${e.currentTarget.dataset.id}`,
    });
  },

  // 点击删除按钮
  onTapDelItem(e) {
    del(e.currentTarget.dataset.id);
    this.setEventList();
  },

  // 点击添加按钮
  onTapAdd() {
    wx.navigateTo({
      url: '/pages/detail/index',
    });
  },

  // 左滑菜单
  recordStart: function (e) {
    const { id } = e.currentTarget.dataset;
    // 记录 touch 事件
    recordStartX = e.touches[0].clientX;
    currentOffsetX = id == this.data.mi ? this.data.mx : 0;
    this.setData({
      moving: true,
      mi: id,
      mx: 0,
    });
  },
  recordMove: function (e) {
    let mx = currentOffsetX + recordStartX - e.touches[0].clientX;
    if (mx < 0) {
      mx = 0;
    }
    if (mx > MAX_MX) {
      mx = MAX_MX;
    }
    this.setData({ mx });
  },
  recordEnd: function (e) {
    let { mx } = this.data;
    if (mx <= MAX_MX/4) {
      mx = 0;
    } else if (mx <= 3 * MAX_MX/5) {
      mx = MAX_MX/2;
    } else {
      mx = MAX_MX;
    }
    this.setData({
      moving: false,
      mx,
    });
  },
});
