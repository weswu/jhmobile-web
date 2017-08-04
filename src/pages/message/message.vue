<template>
  <div class='wu-infinite-container'>
    <div class="fixed-bar">
      <mu-appbar title="网站询盘">
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
        <mu-flat-button href="#/messageBind" label="邮箱绑定" slot="right"/>
        <div class='play-title'>
          <div class='play-name'>网站询盘<span style='font-size:16px;padding-left:5px' v-if='count != 0'>({{count}})</span></div>
        </div>
      </mu-appbar>
    </div>
    <mu-list>
      <div v-for='item,index in list' :class="[{swipeleft: isSwipe[index]},'wrap']" ref="child">
        <mu-list-item :title='item.title' :to="{name: 'messageDetail',params: { id: item.id}}" class="list-item">
          <div class="subContent">
            {{item.addTime}}
            <span class="recvState">{{item.recvState === '00' ? '未读' : ''}}</span>
          </div>
          <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
        </mu-list-item>
        <!--阻止时间冒泡-->
        <div class="delete" @click.stop="del(item.id)">删除</div>
        <mu-divider/>
      </div>
    </mu-list>
    <div v-if="busy" style="text-align: center;padding: .5rem 0;">暂无数据</div>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      count: 0,
      busy: false,
      loading: false,
      scroller: null,
      refresh: true,
      searchData: {
        page: 1,
        recvState: this.$route.params.recvState || ''
      },
      isSwipe: [false, false, false]
    }
  },
  created () {
    setTimeout(() => {
      // 判断是否存在信息列表
      if (this.$refs.child) {
        this.$refs.child.forEach((element, index) => {
          let x, y, X, Y, swipeX, swipeY
          // 监听touchstart
          element.addEventListener('touchstart', e => {
            x = e.changedTouches[0].pageX
            y = e.changedTouches[0].pageY
            swipeX = true
            swipeY = true
            this.isSwipe = [false, false, false]
          })
          element.addEventListener('touchmove', e => {
            X = event.changedTouches[0].pageX
            Y = event.changedTouches[0].pageY
            if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
              // 阻止默认事件
              e.stopPropagation()
              // 右滑
              if (X - x > 10) {
                e.preventDefault()
                this.isSwipe.splice(index, 1, false)
              }
              if (x - X > 10) {
                e.preventDefault()
                this.isSwipe.splice(index, 1, true)
              }
              swipeY = false
            }
            if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
              swipeX = false
            }
          })
        })
      }
    }, 1000)
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.list = []
      vm.searchData.page = 1
      vm.get()
    })
  },
  methods: {
    get () {
      this.loading = true
      this.$http.get('/rest/api/message/list?' + qs.stringify(this.searchData)).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    back () {
      this.$router.back()
    },
    loadMore () {
      this.get()
    },
    // 删除信息
    del (id) {
      this.$http.delete('/rest/api/message/detail/' + id).then((res) => {})
      // 判断信息列表中id与正在删除的信息id是否相同，如果相同，就删除信息
      this.list.forEach((item, index, arr) => {
        if (item.id === id) {
          arr.splice(index, 1)
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.mu-td-left{
  width: 65px;
}
.mu-td-right{
  width: 120px;
}
.recvState{
  color: #ff7300;padding-left: 10px
}
</style>
