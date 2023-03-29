/**
 * 拼接小程序路径
 * @param {*} url
 * @param {*} query
 */
function setUrl(url, query) {
  url = '/pages/' + url + '/main'
  if (query) {
    let q = []
    Object.keys(query).map(key => {
      q.push(`${key}=${query[key]}`)
    })
    url += '?' + q.join('&')
  }
  return url
}

/**
 * 模拟路由，包括
 * 添加、替换、回退、重新打开
 */
const $router = {
  // 打开另一个页面
  push: (url, query, { success, fail, complete, stay } = {}) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      url = setUrl(url, query)
      wx.navigateTo({ url, success, fail, complete })
    }, stay || 0)
  },
  // 跳转到另一个页面
  replace: (url, query, { success, fail, complete, stay } = {}) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      url = setUrl(url, query)
      wx.redirectTo({ url, success, fail, complete })
    }, stay || 0)
  },
  // 页面回退
  back: (delta = 1, { success, fail, complete, stay = 0 } = {}) => {
	  console.log(stay)
    const timer = setTimeout(() => {
      clearTimeout(timer)
      wx.navigateBack({ delta, success, fail, complete })
    }, stay)
  },
  // 关闭所有页面，重新打开一个页面
  reOpen: (url, query, { success, fail, complete, stay } = {}) => {
	  console.log(url)
    const timer = setTimeout(() => {
      clearTimeout(timer)
      url = setUrl(url, query)
      wx.reLaunch({ url, success, fail, complete })
    }, stay || 0)
  }
}

/**
 * 缓存操作
 */
const $storage = {
  get: key => {
    return wx.getStorageSync(key)
  },
  set: (key, value) => {
    wx.setStorageSync(key, value)
  },
  remove: key => {
    wx.removeStorageSync(key)
  }
}

/**
 * 消息弹出，模拟vue的消息弹窗
 */
const $message = {
  alert: (title, {stay = 1500, success = () => {}, mask = false, icon = 'none'} = {}) => {
    wx.showToast({
      title,
      icon,
      duration: stay,
      success,
      mask
    })
  },
  success: (title = '未设置内容', {stay = 1500, success = () => {}, mask = false} = {}) => {
    $message.alert(title, {stay, success, mask, icon: 'success'})
  },
  loading: (title = '加载中', mask = false) => {
    wx.showLoading({
      title, mask
    })
  },
  hide: () => {
    wx.hideLoading()
  }
}
// 设置标题
function setTitle(title) {
  wx.setNavigationBarTitle({
    title
  })
}

export { $router, $storage, $message, setTitle }
