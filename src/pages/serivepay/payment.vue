<template>
  <div class="gridlist-demo-container wrapper">


    <mu-list>
      <template v-for='item in list'>
        <mu-list-item disableRipple @click="handleToggle('notifications')" title="item.name" describeText="item.so_date">
          <mu-checkbox v-model="notifications" slot="left"/>
          <span class="red">￥{{item.price}}</span>元<br>
          {{item.tip}}
          <mu-avatar :src="'css/img/'+item.type+'paid.gif'" slot="right"/>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>


    <mu-grid-list class="gridlist-demo">
      <mu-grid-tile v-for="item, index in list">
        <img :src="item.sharepic" @error="setErrorImg" @click="open(item)"/>
        <span slot="title">{{item.seo_title}}</span>
        <span slot="subTitle">
          <i class="iconfont icon-xianshi"></i>{{item.views}}
          <i class="iconfont icon-liuyan"></i>{{item.mviews}}
          <i class="iconfont icon-fenxiang"></i>{{item.rviews}}
        </span>
      </mu-grid-tile>
    </mu-grid-list>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
  </div>

</template>

<script>
export default {
  data () {
    return {
      list: [],
      videoSounds: false
    }
  },
  created () {
    this.get()
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    get () {
      this.loading = true
      this.$http.get('http://app.jihui88.com/rest/api/crm/receipt/list').then((res) => {
        this.scrollList(this, res.data)
      })
    },
    handleToggle (key) {
      this[key] = !this[key]
    }
  }
}
</script>
