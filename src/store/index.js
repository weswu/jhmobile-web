import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import api from '../api'
Vue.use(Vuex)

window.ua = navigator.userAgent.toLowerCase()
const store = new Vuex.Store({
  // 存储数据
  state: {
    // 加载中...
    isloading: false,
    // 微信浏览器
    isWeixin: !!window.ua.match(/MicroMessenger/i),
    // 破图
    errImgUrl: 'http://img.easthardware.com/upload/j/j2/jihui/picture/2015/12/04/cb46a5be-9960-4c96-a463-895e7948c415.png',
    imgUrl: 'http://img.jihui88.com/',
    wcdImgUrl: 'http://wcd.jihui88.com/leaflet/images/nopic.png',
    search: false, // 搜索
    user: {},
    enterprise: {},
    point: {},
    audio: {
      'id': 0,
      'name': '歌曲名称',
      'singer': '演唱者',
      'albumPic': '/static/player-bar.png',
      'location': '',
      'album': ''
    },
    lyric: '',
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
    loading: false, // 是否正在加载中
    showDetail: false,
    songList: [],    // 播放列表
    currentTime: 0,
    tmpCurrentTime: 0,
    durationTime: 0,
    bufferedTime: 0,
    change: false   // 判断是更改的时间还是播放的时间
  },
  getters: {
    isloading: state => state.isloading,
    audio: state => state.audio,
    playing: state => state.playing,
    loading: state => state.loading,
    showDetail: state => state.showDetail,
    durationTime: state => state.durationTime,
    currentIndex: state => state.currentIndex,
    bufferedTime: state => state.bufferedTime,
    tmpCurrentTime: state => state.tmpCurrentTime,
    songList: state => state.songList,
    change: state => state.change,
    currentTime: state => state.currentTime,
    prCurrentTime: state => {
      return state.currentTime / state.durationTime * 100
    },
    prBufferedTime: state => {
      return state.bufferedTime / state.durationTime * 100
    },
    search: state => state.search
  },
  mutations: {
    // 加载中...
    showLoading (state) {
      state.isloading = true
      setTimeout(() => {
        state.isloading = false
      }, 10000)
    },
    hideLoading (state) {
      state.isloading = false
    },
    play (state) {
      state.playing = true
    },
    pause (state) {
      state.playing = false
    },
    toggleDetail (state) {
      state.showDetail = !state.showDetail
    },
    setAudio (state) {
      state.audio = state.songList[state.currentIndex - 1]
    },
    setAudioIndex (state, index) {
      state.audio = state.songList[index]
      state.currentIndex = index + 1
    },
    removeAudio (state, index) {
      state.songList.splice(index, 1)
      if (index === state.songList.length) {
        index--
      }
      state.audio = state.songList[index]
      state.currentIndex = index + 1
      if (state.songList.length === 0) {
        state.audio = {
          'id': 0,
          'name': '歌曲名称',
          'singer': '演唱者',
          'albumPic': '/static/player-bar.png',
          'location': '',
          'album': ''
        }
        state.playing = false
      }
    },
    setChange (state, flag) {
      state.change = flag
    },
    setLocation (state, location) {
      state.audio.location = location
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    updateDurationTime (state, time) {
      state.durationTime = time
    },
    updateBufferedTime (state, time) {
      state.bufferedTime = time
    },
    changeTime (state, time) {
      state.tmpCurrentTime = time
    },
    openLoading (state) {
      state.loading = true
    },
    closeLoading (state) {
      state.loading = false
    },
    resetAudio (state) {
      state.currentTime = 0
    },
    playNext (state) { // 播放下一曲
      state.currentIndex++
      if (state.currentIndex > state.songList.length) {
        state.currentIndex = 1
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    playPrev (state) { // 播放上一曲
      state.currentIndex--
      if (state.currentIndex < 1) {
        state.currentIndex = state.songList.length
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    addToList (state, songs) {
      var items = Array.prototype.concat.call(songs)
      items.forEach(item => {
        var flag = false
        state.songList.forEach(function (element, index) { // 检测歌曲重复
          if (element.id === item.id) {
            flag = true
            state.currentIndex = index + 1
          }
        })
        if (!flag) {
          state.songList.push(item)
          state.currentIndex = state.songList.length
        }
      })
    },
    setLrc (state, lrc) {
      state.lyric = lrc
    }
  },
  // 异步的数据操作
  actions: {
    getSong ({commit, state}, id) {
      commit('openLoading')
      Axios.get(api.getSong(id)).then(res => {
        // 统一数据模型，方便后台接口的改变
        var url = res.data.data[0].url
        commit('setAudio')
        commit('setLocation', url)
      })
      .catch((error) => {     // 错误处理
        console.log(error)
        window.alert('获取歌曲信息出错！')
      })
    }
  }
})
export default store
