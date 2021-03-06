import { formatDate } from '../../utils/calculator';
import { get, update, push } from '../../utils/event_store';

let LAST_ERROR_TIMEOUT = null;

//获取应用实例
// const app = getApp();
Page({
  data: {
    today: formatDate(new Date()),
    // title: '',
    date: formatDate(new Date()),
    // endDate: '',
    stopTracking: false,
    error: '',
  },
  onLoad: function (option) {
    const id = option.id;
    const eventItem = get(id);
    if (eventItem) {
      this.setData(eventItem);
    }
  },

  // 点击保存
  onTapSave: function(e) {
    try {
      const data = Object.assign({}, this.data, e.detail.value);
      if (data.id) {
        update(data);
      } else {
        push(data);
      }
      wx.navigateBack();
    } catch (e) {
      clearTimeout(LAST_ERROR_TIMEOUT);
      this.setData({
        error: e.message,
      });
      LAST_ERROR_TIMEOUT = setTimeout(() => {
        this.setData({
          error: '',
        });
      }, 2000);
    }
  },
  // change start date
  onChangeDate: function(e) {
    const date = e.detail.value || formatDate(new Date());
    this.setData({ date });
  },
  // change end date
  onChangeEndDate: function(e) {
    const endDate = e.detail.value || formatDate(new Date());
    this.setData({ endDate });
  },
  // change stopTracking
  onChangeStopTracking: function(e) {
    const stopTracking = e.detail.value.indexOf('stopTracking') >= 0;
    const endDate = stopTracking ? formatDate(new Date()) : '';
    this.setData({ stopTracking, endDate });
  },
});
