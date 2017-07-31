import { formatDate } from '../../utils/calculator';
import { push } from '../../utils/event_store';

let LAST_ERROR_TIMEOUT = null;

//获取应用实例
// const app = getApp();
Page({
  data: {
    today: formatDate(new Date()),
    // title: '',
    startDate: formatDate(new Date()),
    // endDate: '',
    stopTracking: false,
    error: '',
  },
  onLoad: function () {
    // init data
  },

  //
  onTapSave: function(e) {
    try {
      const data = Object.assign({}, this.data, e.detail.value);
      push(data);
      wx.navigateTo({
        url: '../index/index'
      });
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
  onChangeStartDate: function(e) {
    const startDate = e.detail.value || formatDate(new Date());
    this.setData({ startDate });
  },
  // change end date
  onChangeEndDate: function(e) {
    const endDate = e.detail.value || formatDate(new Date());
    this.setData({ endDate });
  },

  onChangeStopTracking: function(e) {
    const stopTracking = e.detail.value.indexOf('stopTracking') >= 0;
    this.setData({ stopTracking });
  },


})