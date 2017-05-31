const _baseUrl = 'http://musicapi.duapp.com/api.php'
const _baseUrl2 = 'https://api.imjad.cn/cloudmusic/'
let _host = 'http://m1.jihui88.com'
if (window.location.href.indexOf('app.jihui88.com') > -1) {
  _host = 'http://app.jihui88.com'
}
const _api = _host + '/rest/api/'
export default {
  getUser () { return _api + 'user/detail' }, // 用户
  getOrderInfo () { return _api + 'order/home/list' }, // 账号数据
  getLogId () { return _api + 'log/id' }, // 用户 logId
  getPlayListByWhere (cat, order, offset, total, limit) {
    return _baseUrl + '?type=topPlayList&cat=' + cat + '&offset=' + offset + '&limit=' + limit
  },
  getLrc (id) {
    return _baseUrl2 + '?type=lyric&id=' + id
  },
  getSong (id) {
    return _baseUrl + '?type=url&id=' + id
  },
  getPlayListDetail (id) {
    return _baseUrl2 + '?type=playlist&id=' + id
  },
  getMv (id) {
    return _baseUrl2 + '?type=mv&id=' + id
  },
  search (words) {
    return _baseUrl2 + '?type=search&s=' + words
  },
  getBeian () {
    return _api + 'profile/detail'
  },
  setBeian () {
    return _api + 'profile/detail/all'
  },
  getAreaPath (path) {
    return _api + 'area/list?path=' + path
  }
}
