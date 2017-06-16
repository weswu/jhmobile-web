<template>
  <div id="app">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <Player v-show="songList.length > 0 && !showDetail"></Player>
    <Toast ref="alert"></Toast>
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
    computed: {
      ...mapGetters([
        'songList',
        'showDetail'
      ])
    }
  }
</script>
<style lang='css'>


.file-button{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}
.mu-appbar-title.center {
  text-align: center;
}
.wu-appbar{
  position: fixed;
}
.p20{
  padding: 20px
}
.p10{
  padding: 10px
}

.mu-raised-button.submit-raised-button{
  height: 40px;
  line-height: 40px;
}
.submit-raised-button .mu-raised-button-label{
  font-size: 16px
}
.mu-text-field.has-label{
  width: 100%;
}
.mu-text-field.mu-select-field{
  width: 50%;
}
</style>
