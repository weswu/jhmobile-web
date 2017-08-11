<template>
  <mu-popup position="top" :overlay="false" :open="topPopup">
    <div class="wu-popup-top">{{text}}</div>
  </mu-popup>
</template>
<script>
export default {
  data () {
    return {
      text: '',
      topPopup: false,
      timer: null
    }
  },
  methods: {
    show (text, duration) {
      this.text = text || '更新成功'
      this.topPopup = true
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setTimeout(() => {
        this.topPopup = false
      }, duration || 2000)
    }
  }
}
</script>
<style scoped>
.wu-popup-top{width:100%;opacity:.8;height:48px;line-height:48px;display:flex;align-items:center;justify-content:center;max-width:375px;padding:0 30px}
</style>
