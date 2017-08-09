<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player v-show="songList.length > 0 && !showDetail"></Player>

    <!--加载中...-->
    <div class="loading-wrapper" v-if="isloading" >
      <mu-circular-progress :size="50" :strokeWidth="5"/>
      <div class="loading-txt">加载中</div>
    </div>
    <!--更新成功...-->
    <mu-popup position="top" :overlay="false" :open="topPopup">
      <div class="demo-popup-top">更新成功</div>
    </mu-popup>
  </div>
</template>
<script>
  import Player from './components/playerBar'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      Player
    },
    // mapState是vuex的方法之一
    computed: {
      ...mapGetters([
        'isloading',
        'topPopup',
        'songList',
        'showDetail'
      ])
    }
  }
</script>
