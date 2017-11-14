<template>
<div>
  <div class='fixed-bar'>
    <mu-appbar title='参与推广'>
      <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
    </mu-appbar>
  </div>
  <div v-if="false" @click="wxShare">
    wxShare
  </div>
  <div class='extend_tip'>
    <span class='tip'>你可以把以下专属于你的推广海报保存到相册，并转发到朋友圈和微信群，即可获取积分和现金优惠卷。</span><br>
    <a href='#/spreadRank' class='extend_tip_a'>点击查看由我推广的会员</a>
  </div>
  <mu-tabs :value='activeTab' @change='handleTabChange' class='view-tabs'>
    <mu-tab v-for="item in tabs" :value="item.value" :title="item.title"/>
  </mu-tabs>
  <template v-for='item in list'>
    <div class='p10' v-if='item.posterCate === activeTab'>
      <img class='extend_img' :src="item.pic">
      <p class='extend_desc'>{{item.posterDesc}}</p>
      <mu-raised-button label='点击生成,截屏保存图片' @click='saveImg(item)' secondary fullWidth/>
    </div>
  </template>
  <div class="p10">
    <div style="text-align: center;font-size: 0.7rem;padding: 0.5rem 0;">
      我有朋友要购买
    </div>
    <mu-text-field label="朋友姓名" hintText="请输入朋友姓名" v-model="m.name" fullWidth/>
    <mu-text-field label="朋友公司" hintText="请输入朋友公司" v-model="m.company" fullWidth/>
    <mu-text-field label="朋友电话" hintText="请输入朋友电话" v-model="m.phone" fullWidth/>
    <mu-text-field label="推荐人" hintText="请输入推荐人" v-model="m.referee" fullWidth/>
    <mu-text-field hintText="说明..." v-model="m.content" fullWidth multiLine :rows="3" :rowsMax="10" fullWidth/>
    <mu-raised-button label="推荐朋友" @click="submit" secondary fullWidth/>
  </div>
  <img v-if="pic !== ''" :src="pic" class="downPic" @click="downPic" alt="">
</div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      activeTab: '0',
      tabs: [
        {value: '0', title: '促销类'},
        {value: '1', title: '产品类'},
        {value: '2', title: '人物类'},
        {value: '3', title: '知识类'}
      ],
      pic: '',
      m: {},
      sf: {
        card_no: this.$store.state.user.username,
        fdbk_subject64: '朋友介绍[APP]',
        fdbk_type: '5'
      }
    }
  },
  created () {
    this.get()
    this.wxConfig()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/poster/list?pageSize=72').then((res) => {
        for (var item of res.data.attributes.data) {
          item.pic = 'http://img.jihui88.com/' + item.pic
          this.list.push(item)
        }
      })
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    downPic () {
      this.pic = ''
    },
    saveImg (p) {
      var ctx = this
      var data = {
        pic: p.pic,
        qrcodeWidth: p.qrcodeWidth,
        qrcodeHeight: p.qrcodeHeight,
        username: 'ggggfj',
        qrcodeLeft: p.qrcodeLeft,
        qrcodeTop: p.qrcodeTop,
        posterId: p.posterId,
        qrcode: 'http://wcd.jihui88.com/rest/comm/qrbar/create?w=' + p.qrcodeWidth + '&text=http://www.jihui88.com/member/reg_m.html?d=' + this.sf.card_no
      }
      setTimeout(function () {
        ctx.pic = 'https://api.jihui88.net/qrcode_poster/posters/' + p.posterId + '.jpg'
      }, 3000)
      this.$http.post('http://api.jihui88.net/qrcode_poster/api/poster', qs.stringify(data)).then((res) => {
        ctx.pic = 'https://api.jihui88.net/qrcode_poster/posters/' + p.posterId + '.jpg'
      }).catch((result) => {
        ctx.pic = 'https://api.jihui88.net/qrcode_poster/posters/' + p.posterId + '.jpg'
      })

    },
    wxConfig () {
      this.$http.get(this.$store.state.nodeApiUrl + '/api/wechatShare?url=' + window.location.href.split('#')[0]).then((res) => {
        var data = res.data.rows
        // 配置
        wx.config({
          debug: false,
          appId: data.appid,
          timestamp:data.timestamp,
          nonceStr:data.nonceStr,
          signature:data.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ]
        })
        wx.ready(function(){
          // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
          wx.onMenuShareTimeline({
              title: '分享标题', // 分享标题
              link:"分享的url,以http或https开头",
              imgUrl: "分享图标的url,以http或https开头" // 分享图标
          });
          // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
          wx.onMenuShareAppMessage({
              title: '分享标题', // 分享标题
              desc: "分享描述", // 分享描述
              link:"分享的url,以http或https开头",
              imgUrl: "分享图标的url,以http或https开头", // 分享图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
          });

          // 异常
          wx.error(function (res) {
            window.alert('异常'+res.errMsg)
          })
        })
      })
    },
    wxShare () {
      // 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
      wx.onMenuShareTimeline({
        title: '刮刮乐',
        desc: '刮刮乐开始啦',
        link: 'http://app.jihui88.com',
        imgUrl: 'src="http://img.jihui88.com/upload/a/a1/admin/picture/2017/01/13/fc4bd4dc-6a9e-4670-9933-9ed4ccc7d510.jpg"',
        trigger: function (res) {
          window.alert('用户点击分享到朋友圈');
        },
        success: function (res) {
          window.alert('您已获得抽奖机会，赶紧去赢大奖吧～～')
        },
        cancel: function (res) {
          window.alert('已取消');
        },
        fail: function (res) {
          window.alert(res.errMsg);
        }
      })
    },
    submit () {
      if (!this.m.name) { return window.alert('朋友姓名不能为空') }
      if (!this.m.company) { return window.alert('朋友公司不能为空') }
      if (!this.m.phone) { return window.alert('朋友电话不能为空') }
      if (!this.m.referee) { return window.alert('推荐人不能为空') }
      this.sf.fdbk_intro1k = '姓名:' + this.m.name + '\n公司:' + this.m.company + '\n电话:' + this.m.phone +
      '\n推荐人:' + this.m.referee + '\n说明:' + this.m.content
      this.$http.post('http://crmyun.jihui88.com:9500/api/jihuifeedback.php', qs.stringify(this.sf)).then((res) => {
        window.alert('感谢推荐')
        this.m = {}
      })
    }
  }
}
</script>
<style scoped>
.extend_tip{background:#f5f5f5;padding:10px;text-indent:25px;color:#666;line-height:1.5;font-size:.5rem;font-family:'Microsoft YaHei',Helvetica,Arial,'WenQuanYi Micro Hei'}
.extend_tip_a{color:#ff7300;padding:10px 0 5px 0;display:block;font-family:'Microsoft YaHei',Helvetica,Arial,'WenQuanYi Micro Hei';font-size:.6rem}
.extend_img{width:100%}
.extend_desc{color:#666;padding:15px 5px}
.downPic{width:100vw;position:absolute;left:0;top:0;z-index:9}
</style>
