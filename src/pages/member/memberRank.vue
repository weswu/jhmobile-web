<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title='会员等级'>
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
        <mu-icon-button icon='add' href='#/memberRankAdd' slot='right'/>
      </mu-appbar>
    </div>
    <mu-list>
      <div v-for='item,index in list' class="wrap" :class="{swipeleft: isSwipe === index}"
      @touchstart="touchstart($event, item)" @touchmove="touchmove($event, item, index)">
        <mu-list-item @click='detail(item.id)' class="list-item">
          <div slot="title" class="title" :title="item.isDefault">{{item.name}}</div>
          <div class="subContent">
            折扣:{{item.preferentialScale}}% <span>所需积分:{{item.point}}</span>
          </div>
          <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
        </mu-list-item>
        <!--阻止时间冒泡-->
        <div class="delete" @click.stop="del(item.id)">删除</div>
        <mu-divider/>
      </div>
    </mu-list>
    <div v-if="busy" style="text-align: center;padding: .5rem 0;">暂无数据</div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      isSwipe: '',
      busy: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.list = []
      vm.get()
    })
  },
  methods: {
    get () {
      this.refresh = false
      this.loading = true
      this.$http.get('/rest/api/member/rank/list').then((res) => {
        this.list = res.data.attributes.data
        this.$store.commit('setMemberRankList', this.list)
        if (this.list.length === 0) {
          this.busy = true
        }
      })
    },
    // 左侧删除
    touchstart (e, item) {
      item.x = e.changedTouches[0].pageX
      item.y = e.changedTouches[0].pageY
    },
    touchmove (e, item, index) {
      e.preventDefault()
      item.X = e.changedTouches[0].pageX
      item.Y = e.changedTouches[0].pageY
      if (item.X - item.x > 10) {
        this.isSwipe = ''
      }
      if (item.x - item.X > 10) {
        this.isSwipe = index
      }
    },
    detail (id) {
      this.$router.push({path: '/memberRank/' + id})
    },
    // 删除信息
    del (id) {
      this.$http.delete('/rest/api/member/rank/detail/' + id).then((res) => {})
      // 判断信息列表中id与正在删除的信息id是否相同，如果相同，就删除信息
      this.$parent.$refs.toast.show('删除成功')
      this.isSwipe = ''
      this.list.forEach((item, index, arr) => {
        if (item.id === id) {
          arr.splice(index, 1)
        }
      })
      this.$store.commit('setMemberRankList', this.list)
    }
  }
}
</script>
<style scoped>
.title{
  height: 20px;
}
.title:before {
  content: attr(title);
  margin-right: 10px;
  margin-top: -3px;
  padding: 4px 6px;
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  border-radius: 4px;
  background-color: #e7e7e7;
  text-align: center;
  vertical-align: middle;
}
[title='00']:before{
  background: #E74C3C;
  content: '否';
}
[title='01']:before{
  background: #159951;
  content: '默认';
}
.wrap .delete {
  line-height: 70px;
  height: 70px;
}
</style>
