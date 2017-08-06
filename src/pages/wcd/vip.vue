<template>
  <div class='gridlist-demo-container wrapper'>
    <mu-grid-list class='gridlist-demo'>
      <mu-grid-tile v-for='item, index in list'>
        <img :src='item.sharepic' @error='setErrorImg' @click='open(item)'/>
        <span slot='title'>{{item.seo_title}}</span>
        <span slot='subTitle'>
          <i class='iconfont icon-xianshi'></i>{{item.views}}
          <i class='iconfont icon-liuyan'></i>{{item.mviews}}
          <i class='iconfont icon-fenxiang'></i>{{item.rviews}}
        </span>
        <div v-if="item.vip" class="showVip" @click="vip(item)">快速生成专属页面</div>
      </mu-grid-tile>
    </mu-grid-list>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
    <div class="chaxun" v-if="chaxun">
       在电脑端输入网址<br/><span style="color:#999">http://wcd.jihui88.com/leaflet/index.html</span><br/>登录即可免费创建微传单
    </div>
    <div class="index_update" v-if="wcdUpdate">
      <p>信息完善<a href="javascript:;" class="icon icon-close"></a></p>
      <div class="content">
        <div v-for="v in vipList" class="vipList">
         <div class="title">{{v.label}}</div>
         <div v-if="v.type=='PhotoUnit'"><img :src="v.value" ng-click="vipImg" style="width: 3rem;"></div>
         <div v-if="v.type=='TextUnit'">
           <div v-if="v.key=='ent_name'"><input type="text" v-model="v.value"/></div>
           <div v-if="v.key!='ent_name'"><textarea>{{v.value}}</textarea></div>
         </div>
        </div>
      </div>
      <ul>
        <li><a href="javascript:;" @click="vipSub" style="text-align: center;">确定</a></li>
      </ul>
     </div>
  </div>
</template>
<script>
import jsonp from 'jsonp'
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      loading: false,
      scroller: null,
      refresh: true,
      chaxun: this.$store.state.user.wcdMember !== '01',
      wcdUpdate: false,
      searchData: {
        page: 1,
        pageSize: 10
      }
    }
  },
  created () {
    !this.chaxun && this.get()
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    get () {
      this.refresh = false
      this.loading = true
      this.$http.get('/rest/api/wcd/vip?' + qs.stringify(this.searchData)).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    loadMore () {
      !this.chaxun && this.refresh && this.get()
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.wcdImgUrl
    },
    open (item) {
      this.$router.push({path: '/wcd_open/' + item.id})
    },
    vip (wcd) {
      var ctx = this
      this.vipList = {
        enterpriseId: this.$store.state.user.enterpriseId,
        wcdId: wcd.id,
        fields: []
      }
      jsonp('http://wcd.jihui88.com/rest/comm/wcd/copyp?' + qs.stringify(this.vipList), null, function (err, data) {
        if (data.msgType === 'notLogin') {
          ctx.$router.push('/login')
        }
        if (data.attributes.shortage === true) {
          if (ctx.vipList.length > 0) {
            window.alert('请完善传单信息')
            return false
          }
          // 第一次提交,完善数据
          ctx.vipList = data.attributes.fields
          // ctx.wcdUpdate = true
        } else {
          if (confirm('传单生成成功,确定查看')) {
            ctx.$router.push('/wcd_open/' + data.attributes.data.wcdId)
          }
        }
        if (err) {
          console.error(err.message)
        } else {
          console.log(data)
        }
      })
    },
    vipSub () {
      this.vip()
    }
  }
}
</script>
<style scoped>
.showVip{left:0;z-index:4;width:100%;height:100%;display:block;position:absolute;top:0;text-align:center;line-height:5.733rem;color:#fff;background-color:rgba(0,0,0,.6)}
/*dialog*/
.index_update{top:5%;width: 80%;left: 10%;}
.index_update .content{padding:.5rem}
.vipList{border-bottom:1px solid #eee;padding-bottom:.2rem}
.vipList:last-child{border-bottom:none}
.index_update .title{padding-top:.2rem;padding-bottom:.3rem}
.index_update textarea{width:100%;padding:0.3rem;}
.index_update li,.index_update ul{padding-bottom:0;margin-bottom:0}
</style>
