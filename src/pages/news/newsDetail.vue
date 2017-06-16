<template>
  <div>
    <mu-appbar title="新闻添加">
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      <mu-flat-button href="#/signup" label="注册" slot="right"/>
    </mu-appbar>
    <div class="container p20">
      <mu-text-field label="帐号" hintText="请输入登录帐号" v-model="username" labelClass="indent" hintTextClass="indent" inputClass="indent" fullWidth labelFloat/><br/>
      <mu-text-field label="登录密码" hintText="请输入密码" v-model="password" labelClass="indent" hintTextClass="indent" inputClass="indent" type="password" fullWidth labelFloat/><br/>
      <mu-raised-button label="登录" @click="submit" class="submit-raised-button" fullWidth primary/>

    </div>


  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      news: {}
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
      this.$http.get('/rest/api/news/detail').then((res) => {
        this.news = res.data.attributes.data
      })
    },
    submit () {
      this.$http.post('/rest/api/news/detail', qs.stringify(this.news)).then((res) => {
        this.$router.back()
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
