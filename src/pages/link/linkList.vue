<template>
  <div class='wu-infinite-container'>
    <mu-appbar title='友情链接' class='wu-appbar'>
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      <mu-icon-button icon='add' href='#/linkAdd' slot='right'/>
    </mu-appbar>
    <div class='pt56 demo-refresh-container'>

      <mu-list>
        <template v-for='item in list'>
          <mu-list-item :title='item.name' :to="{name: 'linkDetail',params: { id: item.id}}">
            <div class='subContent'>
              {{item.url}}
            </div>
            <mu-icon value='delete' slot='right' color='#ccc' @click='del(item)'/>
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
      list: [
        {
          linkId: 'Link_000000000000000000000052278',
          enterpriseId: null,
          name: '机汇网',
          url: 'http://www.jihui88.com',
          state: null,
          lorder: null,
          userId: null,
          addTime: null,
          updateTime: null,
          id: 'Link_000000000000000000000052278'
        }
      ],
      num: 10,
      loading: false,
      scroller: null,
      refresh: true,
      searchData: {
        page: 1
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
      this.$router.go(-1)
    },
    get () {
      this.loading = true
      this.$http.get('/rest/api/link/list?page=' + this.searchData.page).then((res) => {
        this.scrollList(this, res.data)
        if (this.searchData.page === 1) {
          this.count = res.data.attributes.res.data
        }
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    del (entry) {
      if (window.confirm('确认删除吗？')) {
        this.$http.delete('/rest/api/link/detail/' + entry.id).then((res) => {
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
