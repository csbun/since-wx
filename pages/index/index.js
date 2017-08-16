import { list, del } from '../../utils/event_store';
import { daysSinceByItem } from '../../utils/calculator';

const MAX_MX = 80;
let recordStartX, recordStartY, currentOffsetX;

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
  },

  onShow() {
    this.setEventList();
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
    recordStartY = e.touches[0].clientY;
    currentOffsetX = id == this.data.mi ? this.data.mx : 0;
    this.setData({
      moving: true,
      mi: id,
      mx: 0,
    });
  },
  recordMove: function (e) {
    if (!this.data.moving) {
      return;
    }
    // 如果大于 45° 就取消滑动
    const dx = recordStartX - e.touches[0].clientX;
    const dy = recordStartY - e.touches[0].clientY;
    if (Math.abs(dy) > Math.abs(dx)) {
      this.recordEnd();
      return;
    }
    // 滑动
    let mx = currentOffsetX + dx;
    if (mx < 0) {
      mx = 0;
    }
    if (mx > MAX_MX) {
      mx = MAX_MX;
    }
    this.setData({ mx });
  },
  recordEnd: function () {
    let { mx } = this.data;
    if (mx < MAX_MX*2/3) {
      mx = 0;
    } else {
      mx = MAX_MX;
    }
    this.setData({
      moving: false,
      mx,
    });
  },
});
