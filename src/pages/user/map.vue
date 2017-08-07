<template>
  <div>
    <mu-appbar title="地图定位">
      <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
    </mu-appbar>
    <mu-popup position="top" :overlay="false" :open="topPopup">
      <div class="demo-popup-top">更新成功</div>
    </mu-popup>
    <baidu-map class="map" :center="{lng: lng, lat: lat}" :zoom="15" ak="YOUR_APP_KEY" @click="clickMap($event)">
      <bm-marker :position="{lng: lng, lat: lat}" :dragging="true" :clicking="true" animation="BMAP_ANIMATION_BOUNCE" @dragend="dragend($event)">
      </bm-marker>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-local-search :keyword="keyword" :auto-viewport="true" :panel="false"></bm-local-search>
    </baidu-map>
    <div class="p10">
      <label>关键词：<input v-model="keyword"></label>
      <mu-raised-button label="提交" @click="submit" secondary fullWidth style="margin: 10px 0"/>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import {BaiduMap, BmMarker, BmNavigation, BmLocalSearch} from 'vue-baidu-map'
export default {
  data () {
    return {
      topPopup: false,
      keyword: '',
      lng: 120.229355,
      lat: 30.2145,
      enterprise: {}
    }
  },
  created () {
    this.get()
  },
  components: {
    BaiduMap,
    BmMarker,
    BmNavigation,
    BmLocalSearch
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/enterprise/detail').then((res) => {
        this.enterprise = res.data.attributes.data
        var r = /^[a-zA-Z]+$/
        if (this.enterprise.mapaddress && !r.test(this.enterprise.mapaddress)) {
          this.lng = this.enterprise.mapaddress.split(',')[0]
          this.lat = this.enterprise.mapaddress.split(',')[1]
        }
      })
    },
    submit () {
      this.enterprise.mapaddress = this.lng + ',' + this.lat
      this.$http.put('/rest/api/enterprise/detail?' + qs.stringify(this.enterprise)).then((res) => {
        this.topPopup = true
        setTimeout(() => {
          this.topPopup = false
        }, 2000)
      })
    },
    dragend (e) {
      this.lng = e.point.lng
      this.lat = e.point.lat
    },
    clickMap (e) {
      this.lng = e.point.lng
      this.lat = e.point.lat
    }
  }
}
</script>
<style scoped>
.map{width:100%;height:300px}
.demo-popup-top{width:100%;opacity:.8;height:48px;line-height:48px;display:flex;align-items:center;justify-content:center;max-width:375px;padding:0 30px}
</style>
