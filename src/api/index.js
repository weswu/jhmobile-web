const _baseUrl = 'http://musicapi.duapp.com/api.php'
const _baseUrl2 = 'https://api.imjad.cn/cloudmusic/'
const _websiteUrl = 'http://m1.jihui88.com'
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
    return _websiteUrl + '/rest/api/profile/detail'
  },
  setBeian () {
    return _websiteUrl + '/rest/api/profile/detail/all'
  },
  getAreaPath (path) {
    return _websiteUrl + '/rest/api/area/list?path=' + path
  }
}
