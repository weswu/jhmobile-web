const _baseUrl = 'http://musicapi.duapp.com/api.php'
const _baseUrl2 = 'https://api.imjad.cn/cloudmusic/'
window._host = 'http://m1.jihui88.com'
if (window.location.href.indexOf('app.jihui88.com') > -1) {
  window._host = 'http://app.jihui88.com'
}
export default {
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
    return window._host + '/rest/api/profile/detail'
  },
  setBeian () {
    return window._host + '/rest/api/profile/detail/all'
  },
  getAreaPath (path) {
    return window._host + '/rest/api/area/list?path=' + path
  }
}
