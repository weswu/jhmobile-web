<template>
  <div class='wu-infinite-container'>
    <mu-appbar title='域名添加' class='wu-appbar'>
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      <mu-icon-button icon='add' href='#/bindAdd' slot='right'/>
    </mu-appbar>
    <div class='pt56 demo-refresh-container'>

      <mu-list>
        <template v-for='item in list'>
          <mu-list-item data-type="pc" :title="item.address">
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
      list: [
        {
          bindId: 'Bind_000000000000000000000000224',
          username: 'ggggfj',
          address: 'tttt.cn',
          icp: null,
          applyTime: 1333084010179,
          approveTime: null,
          denyReason: null,
          fileName: 'ggggfj.conf',
          state: '00',
          type: 'D',
          addTime: null,
          updateTime: null,
          ip: null,
          id: 'Bind_000000000000000000000000224'
        },
        {
          bindId: 'Bind_000000000000000000000000221',
          username: 'ggggfj',
          address: 'google.com',
          icp: null,
          applyTime: 1333073572474,
          approveTime: 1333082211299,
          denyReason: '555',
          fileName: 'ggggfj.conf',
          state: '02',
          type: 'D',
          addTime: null,
          updateTime: null,
          ip: null,
          id: 'Bind_000000000000000000000000221'
        }
      ],
      page: 1,
      num: 10,
      loading: false,
      scroller: null
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
      this.loading = true
      this.$http.get('/rest/api/bind/list?page=' + this.page).then((res) => {
        var list = res.data.attributes.data
        for (let i = 0; i < list.length; i++) {
          this.list.push(list[i])
        }
        this.page = this.page + 1
        this.loading = false
      })
    },
    loadMore () {
      this.get()
    },
    bindState (v) {
      if (v === '00') { return '未审核' }
      if (v === '01') { return '未审核' }
      if (v === '02') { return '<span style="color:red">审核不通过</span>' }
    },
    del (entry) {
      if (window.confirm('确认删除吗？')) {
        var data = this.list
        data.forEach(function (item, i) {
          if (item === entry) {
            data.splice(i, 1)
          }
        })
        this.$http.delete('/rest/api/bind/detail/' + entry.id)
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
