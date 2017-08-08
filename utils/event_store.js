const STORAGE_KEY_PREFIX = 'SINCE:EVENT';
const STORAGE_KEY_IDS = `${STORAGE_KEY_PREFIX}:IDS`;
const STORAGE_KEY_ITEM = `${STORAGE_KEY_PREFIX}:ITEM`;

function uuid() {
  return Math.floor((Date.now() % 15e8 + Math.random()) * 10e9).toString('36');
}

function getItemIds() {
  return wx.getStorageSync(STORAGE_KEY_IDS) || [];
}

export function get(id) {
  return wx.getStorageSync(`${STORAGE_KEY_ITEM}:${id}`);
}

export function list() {
  // // Test data
  // return [{
  //   id: 'abc',
  //   title: 'abcdefg',
  //   date: '2017-07-20',
  //   stopTracking: true,
  //   endDate: '2017-07-30',
  // }, {
  //   id: 'efg',
  //   title: 'abcdefg',
  //   date: '2017-07-01',
  //   stopTracking: false,
  //   endDate: '2017-07-30',
  // }];
  return (getItemIds()).map(get).filter(function (item) {
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
  const copyProps = [ 'title', 'date' ];
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
  const ids = getItemIds();
  wx.setStorageSync(`${STORAGE_KEY_ITEM}:${id}`, newItem);
  ids.push(id);
  wx.setStorageSync(STORAGE_KEY_IDS, ids);
  return id;
}


export function update(item) {
  // TODO
}
