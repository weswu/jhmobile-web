<template>
  <div>
    <mu-appbar :title="name">
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
    </mu-appbar>
    <div class="p10">
      <mu-text-field label="新闻标题" hintText="请输入新闻标题" v-model="news.name"/>
      <mu-select-field v-model='news.type' :labelFocusClass="['label-foucs']" hintText='所属分类'>
        <mu-menu-item v-for='v,index in typeList' :value='v.value' :title='v.text' />
      </mu-select-field>
      <mu-text-field label="来源" hintText="请输入来源" v-model="news.organize"/>
      <mu-text-field label="作者" hintText="请输入作者" v-model="news.organize"/>
      <mu-flexbox style="margin-bottom:50px">
        <mu-flexbox-item class="flex-demo">
          新闻图片：
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <mu-paper class="demo-paper" :zDepth="2">
            <img class="avatar" width="80" :src="imgUrl + news.attaPic" @error="setErrorImg">
          </mu-paper>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <upload :width="300" v-on:result="fileChange"></upload>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-raised-button label="提交" @click="submit" class="submit-raised-button" secondary fullWidth/>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      name: '新闻',
      typeList: [
        {text: '基本证书', value: '01'},
        {text: '税务登记证', value: '07'},
        {text: '荣誉证书', value: '04'},
        {text: '营业执照', value: '06'},
        {text: '组织机构代码证', value: '08'},
        {text: '实地认证', value: '09'},
        {text: '其它证书', value: '05'}
      ],
      imgUrl: this.$store.state.imgUrl,
      news: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get()
    })
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.name = '新闻修改'
      this.$http.get('/rest/api/news/detail/' + this.$route.params.id).then((res) => {
        this.news = res.data.attributes.data
      })
    },
    submit () {
      this.$http.post('/rest/api/news/detail?', qs.stringify(this.news)).then((res) => {
        this.$router.back()
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
