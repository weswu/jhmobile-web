<template>
  <div class='wu-infinite-container'>
    <mu-grid-list class='gridlist-demo'>
      <mu-grid-tile v-for='item, index in list'>
        <img :src='item.sharepic' @error='setErrorImg' @click='open(item)'/>
        <span slot='title'>{{item.seo_title}}</span>
        <span slot='subTitle'>
          <i class='iconfont icon-xianshi'></i>{{item.views}}
          <i class='iconfont icon-liuyan'></i>{{item.mviews}}
          <i class='iconfont icon-fenxiang'></i>{{item.rviews}}
        </span>
        <div v-if='item.vip' class='showVip' @click='vip(item)'>快速生成专属页面</div>
      </mu-grid-tile>
    </mu-grid-list>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
    <div class='chaxun' v-if='chaxun'>
       在电脑端输入网址<br/><span style='color:#999'>http://wcd.jihui88.com/leaflet/index.html</span><br/>登录即可免费创建微传单
    </div>
    <div class='index_update' v-if='wcdUpdate'>
      <mu-list>
        <mu-list-item title="信息完善">
          <div class="wu-item-right" @click="close">
            <a href='javascript:;' class='iconfont icon-close'></a>
          </div>
        </mu-list-item>
        <mu-divider/>
      </mu-list>
      <div class='p10'>
        <div v-for='v,index in fields'>
          <mu-flexbox v-if="v.type=='PhotoUnit'">
            <mu-flexbox-item class="flex-demo">
              {{v.label}}
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <mu-paper class="demo-paper" :zDepth="2">
                <img class="avatar" width="80" :src="v.value">
              </mu-paper>
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <div @click="uploadImg(index)">
                <upload :width="300" v-on:result="fileChange"></upload>
              </div>
            </mu-flexbox-item>
          </mu-flexbox>
          <div v-else-if="v.key=='ent_edesc'">
            <mu-text-field :label='v.label' v-model="v.value" fullWidth multiLine :rows="8" :rowsMax="10" fullWidth/>
          </div>
          <mu-text-field v-else :label='v.label' v-model='v.value' fullWidth/>
        </div>
      </div>
      <mu-raised-button label='提交' @click='vipSub' secondary fullWidth/>
     </div>
  </div>
</template>
<script>
import Upload from '../../components/upload'
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
      index: '',
      fields: [],
      searchData: {
        page: 1,
        pageSize: 10
      }
    }
  },
  created () {
    !this.chaxun && this.get()
  },
  components: {
    Upload
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
        fields: this.fields || []
      }
      this.$parent.$refs.loading.showLoading()
      jsonp('http://wcd.jihui88.com/rest/comm/wcd/copyp?' + qs.stringify(this.vipList), null, function (err, data) {
        ctx.$parent.$refs.loading.hideLoading()
        if (data.msgType === 'notLogin') {
          ctx.$router.push('/login')
        }
        if (data.attributes.shortage === true) {
          // 第一次提交,完善数据
          ctx.fields = data.attributes.fields
          ctx.wcdUpdate = true
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
      this.wcdUpdate = false
    },
    uploadImg (v) {
      this.index = v
    },
    fileChange (text) {
      console.log('监听到上传组件变化' + text)
      this.fields[this.index].value = 'http://img.jihui88.com/' + text.data
    },
    close () {
      this.wcdUpdate = false
    }
  }
}
</script>
<style scoped>
.showVip{left:0;z-index:4;width:100%;height:100%;display:block;position:absolute;top:0;text-align:center;line-height:5.733rem;color:#fff;background-color:rgba(0,0,0,.6)}
/*dialog*/
.index_update{top: 5%;
    width: 80%;
    left: 10%;
    position: fixed;
    z-index: 8;
    background: #fff;height: 80vh;
    overflow: hidden;
    overflow-y: scroll;
    border: 1px solid #eee;}
</style>
