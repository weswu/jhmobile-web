<template>
  <div class='wu-infinite-container'>
    <div class="fixed-bar">
      <mu-appbar title='友情链接'>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
        <mu-icon-button icon='add' href='#/linkAdd' slot='right'/>
      </mu-appbar>
    </div>
    <mu-list>
      <template v-for='item in list'>
        <mu-list-item :title='item.name' @click='detail(item.id)'>
          <div class='subContent'>
            {{item.url}}
          </div>
          <mu-icon value='delete' slot='right' :size='36' color='#ccc' @click.stop='del(item)'/>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
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
  methods: {
    back () {
      this.$router.back()
    },
    get () {
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
    detail (id) {
      this.$router.push({path: '/link/' + id})
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
        })
      }
    }
  }
}
</script>
<style scoped>
.subContent{
  font-size: 12px;
  color: #999
}
.subContent span{
  padding-left:10px
}
</style>
