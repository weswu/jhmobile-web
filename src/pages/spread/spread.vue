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
    <mu-tab value='1' title='促销类'/>
    <mu-tab value='2' title='产品类'/>
    <mu-tab value='3' title='人物类'/>
    <mu-tab value='4' title='知识类'/>
  </mu-tabs>
  <template v-for='item in list'>
    <div class='extend' v-if='item.posterCate === activeTab'>
      <img class='extend_img' :src="'http://img.jihui88.com/'+item.pic">
      <p class='extend_desc'>{{item.posterDesc}}</p>
      <mu-raised-button label='点击生成,截屏保存图片' @click='submit' class='submit-raised-button' secondary fullWidth/>
    </div>
  </template>
</div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          posterId: 'poster_0000000000000000000000521',
          enterpriseId: 'Admin_00000000000000000000000005',
          addTime: '2017-06-01 08:51:34',
          updateTime: '2017-07-06 09:07:35',
          pic: 'upload/a/a1/admin/picture/2017/07/06/9ae40c98-2129-47a3-897b-f788b3c23568.jpg',
          qrcodeHeight: '132',
          qrcodeWidth: '132',
          qrcodeLeft: '53',
          qrcodeTop: '1174',
          posterCate: '1',
          posterDesc: '全网营销云平台（机汇网）',
          state: '01',
          id: null
        },
        {
          posterId: 'poster_0000000000000000000000161',
          enterpriseId: 'Admin_00000000000000000000000005',
          addTime: '2017-01-20 10:42:13',
          updateTime: '2017-03-06 13:09:43',
          pic: 'upload/a/a1/admin/picture/2017/03/06/6340cc0e-234d-424d-9507-c6581b59fe60.jpg',
          qrcodeHeight: '140',
          qrcodeWidth: '140',
          qrcodeLeft: '314',
          qrcodeTop: '1022',
          posterCate: '3',
          posterDesc: '全网营销系统',
          state: '01',
          id: null
        }
      ],
      activeTab: '1'
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
        this.link = res.data.attributes.data
        this.name = this.link.name
      })
    },
    handleTabChange (val) {
      this.activeTab = val
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
