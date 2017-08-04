<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player v-show="songList.length > 0 && !showDetail"></Player>
    <Toast ref="alert"></Toast>
    <!--加载中...-->
    <mu-circular-progress :size="50" :strokeWidth="5" style="position: fixed;z-index: 999;left: 50%;margin-left: -25px;top:30%"  v-if="isloading"/>
  </div>
</template>
<script>
  import Player from './components/playerBar'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        toast: false
      }
    },
    components: {
      Player
    },
    // mapState是vuex的方法之一
    computed: {
      ...mapGetters([
        'isloading',
        'songList',
        'showDetail'
      ])
    }
  }
</script>
