<template>
  <div class='wu-infinite-container'>
    <mu-appbar title='域名绑定' class='wu-appbar'>
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      <mu-icon-button icon='add' href='#/bindAdd' slot='right'/>
    </mu-appbar>

    <div class='pt56 demo-refresh-container'>
      <mu-list>
        <template v-for='item in list'>
          <mu-list-item :title="item.address">
            <div class="subContent">
              {{item.type | bindType}} <span v-html="bindState(item.state)"></span>
            </div>
            <mu-icon value="delete" slot="right" color="#ccc" @click="del(item)"/>
          </mu-list-item>
          <mu-divider/>
        </template>
      </mu-list>
      <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      num: 10,
      loading: false,
      scroller: null,
      refresh: true,
      searchData: {
        page: 1,
        pageSize: 16,
        category_id: ''
      }
    }
  },
  created () {
    this.get()
  },
  mounted () {
    this.scroller = this.$el
  },
  watch: {
    $route (to, from) {
      if (to.path === '/bind' && JSON.stringify(to.query).length > 10) {
        this.list.unshift(to.query)
      }
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/bind/list?page=' + this.searchData.page).then((res) => {
        this.scrollList(this, res.data)
        if (this.searchData.page === 1) {
          this.count = res.data.attributes.res.data
        }
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    bindState (v) {
      if (v === '00') { return '未审核' }
      if (v === '01') { return '未审核' }
      if (v === '02') { return '<span style="color:red">审核不通过</span>' }
    },
    del (entry) {
      if (window.confirm('确认删除吗？')) {
        this.$http.delete('/rest/api/bind/detail/' + entry.id).then((res) => {
          var data = this.list
          data.forEach(function (item, i) {
            if (item === entry) {
              data.splice(i, 1)
            }
          })
          this.$router.back()
        })
      }
    }
  },
  filters: {
    bindType (v) {
      if (v === 'D') { return '域名' }
      if (v === 'A') { return '地址' }
      if (v === 'I') { return '图片' }
      if (v === 'M') { return '手机' }
    }
  }
}
</script>

<style lang='css' scoped>
.subContent{
  font-size: 12px;
  color: #999
}
.subContent span{
  padding-left:10px
}

</style>
