<template>
<div>
  <div class='fixed-bar'>
    <mu-appbar title='参与推广'>
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
    </mu-appbar>
  </div>
  <div class='extend_tip'>
    <span class='tip'>你可以把以下专属于你的推广海报保存到相册，并转发到朋友圈和微信群，即可获取积分和现金优惠卷。</span><br>
    <a href='#/spreadRank' class='extend_tip_a'>点击查看由我推广的会员</a>
  </div>
  <mu-tabs :value='activeTab' @change='handleTabChange' class='view-tabs'>
    <mu-tab v-for="item in tabs" :value="item.value" :title="item.title"/>
  </mu-tabs>
  <template v-for='item in list'>
    <div class='extend' v-if='item.posterCate === activeTab'>
      <img class='extend_img' :src="'http://img.jihui88.com/'+item.pic">
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
    <mu-text-field hintText="说明..." v-model="m.content" fullWidth multiLine :rows="8" :rowsMax="10" fullWidth/>
    <mu-raised-button label="推荐朋友" @click="submit" secondary fullWidth/>
  </div>
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
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/poster/list?pageSize=72').then((res) => {
        this.list = res.data.attributes.data
      })
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    saveImg (p) {
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
      this.$http.post('https://api.jihui88.net/qrcode_poster/api/poster', qs.stringify(data)).then((res) => {
        p.pic = 'https://api.jihui88.net/qrcode_poster/posters/' + p.posterId + '.jpg'
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
.extend_tip {
    background: #f5f5f5;
    padding: 10px;
    text-indent: 25px;
    color: #666;
    line-height: 1.5;
    font-size: 0.5rem;
    font-family: 'Microsoft YaHei',Helvetica,Arial,'WenQuanYi Micro Hei';
}
.extend_tip_a {
    color: #ff7300;
    padding: 10px 0 5px 0;
    display: block;
    font-family: 'Microsoft YaHei',Helvetica,Arial,'WenQuanYi Micro Hei';
    font-size: 0.6rem;
}
.extend{
    padding: 15px;
}
.extend_img {
    width: 100%;
}
.extend_desc {
    color: #666;
    padding: 15px 5px;
}
</style>
