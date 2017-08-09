<template>
  <div>
    <mu-appbar title="地图定位">
      <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
    </mu-appbar>
    <baidu-map class="map" :center="{lng: lng, lat: lat}" :zoom="15" ak="YOUR_APP_KEY" @click="clickMap($event)" style="width:100vw;height:60vh">
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
      keyword: '',
      lng: (this.$store.state.enterprise.mapaddress && this.$store.state.enterprise.mapaddress.split(',')[0]) || 120.229355,
      lat: (this.$store.state.enterprise.mapaddress && this.$store.state.enterprise.mapaddress.split(',')[1]) || 30.2145,
      enterprise: {}
    }
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
    submit () {
      this.$store.commit('showLoading')
      this.$store.state.enterprise.mapaddress = this.lng + ',' + this.lat
      this.$http.put('/rest/api/enterprise/detail?' + qs.stringify(this.$store.state.enterprise)).then((res) => {
        this.$store.commit('hideLoading')
        this.$store.commit('topPopup')
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
