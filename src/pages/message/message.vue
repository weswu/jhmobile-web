<template>
  <div>
    <mu-appbar title="网站询盘">
      <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
      <mu-flat-button href="#/login" label="绑定邮箱" slot="right"/>
    </mu-appbar>

    <mu-list-item  v-for="item, index in list" :title="item.title">
      <span slot="left">{{index + 1}}</span>
      <span slot="describe">
        {{item.addTime}}
      </span>
      <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
        <mu-menu-item title="查看" :to="{name: 'messageDetail',params: { id: item.id}}"/>
        <mu-menu-item title="删除"/>
      </mu-icon-menu>
    </mu-list-item>
     <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isloading: true,
      list: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/message/list').then((res) => {
        this.list = res.data.attributes.data
      })
    },
    back () {
      this.$router.back()
    },
    loadMore () {
      this.get()
    }
  }
}
</script>
<style lang="less" scoped>
.mu-td-left{
  width: 65px;
}
.mu-td-right{
  width: 120px;
}
</style>
