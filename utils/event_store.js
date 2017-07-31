const STORAGE_KEY_PREFIX = 'SINCE:EVENT';
const STORAGE_KEY_IDS = `${STORAGE_KEY_PREFIX}:IDS`;
const STORAGE_KEY_ITEM = `${STORAGE_KEY_PREFIX}:ITEM`;

function uuid() {
  return ((Date.now() % 15e7 + Math.random()) * 10e9).toString('36');
}

export function list() {
  return (wx.getStorageSync(STORAGE_KEY_IDS) || []).map(function (id) {
    return wx.getStorageSync(`${STORAGE_KEY_ITEM}:${id}`);
  }).filter(function (item, a, b) {
    return !!item;
  });
}

export function push(item) {
  // 检查数据
  const id = uuid();
  const newItem = {
    id,
    stopTracking: !!item.stopTracking,
  };
  const copyProps = [ 'title', 'startDate' ];
  if (newItem.stopTracking) {
    copyProps.push('endDate');
  }
  copyProps.map(function (key) {
    newItem[key] = (item[key] || '').trim();
    if (!newItem[key]) {
      throw new Error(`${key} is Required!`);
    }
  });
  // 添加
  const ids = wx.getStorageSync(STORAGE_KEY_IDS) || [];
  wx.setStorageSync(`${STORAGE_KEY_ITEM}:${id}`, item);
  ids.push(id);
  wx.setStorageSync(STORAGE_KEY_IDS, ids);
  return id;
}
