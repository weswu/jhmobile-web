<template>
  <div>
    <mu-appbar :title='name'>
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
    </mu-appbar>
    <div class="p10">
      <mu-text-field label="链接名称" hintText="请输入链接名称" v-model="link.name" fullWidth/>
      <mu-text-field label="链接地址" hintText="请输入链接地址" v-model="link.url" fullWidth/>
      <mu-raised-button label="提交" @click="submit" secondary fullWidth/>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      name: '链接',
      link: {}
    }
  },
  created () {
    this.get()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'get'
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      if (this.$route.params.id) {
        this.name = '链接修改'
        this.$http.get('/rest/api/link/updateList/' + this.$route.params.id).then((res) => {
          this.link = res.data.attributes.data
        })
      } else {
        this.name = '链接添加'
        this.link = {}
      }
    },
    submit () {
      if (!this.link.name) { return window.alert('链接名称不能为空') }
      if (!this.link.url) { return window.alert('链接地址不能为空') }
      this.$parent.$refs.loading.showLoading()
      if (this.$route.params.id) {
        this.$http.put('/rest/api/link/detail/' + this.$route.params.id + '?' + qs.stringify(this.link)).then((res) => {
          this.$parent.$refs.loading.hideLoading()
          window.alert('修改成功')
          this.$router.back()
        })
      } else {
        this.$http.post('/rest/api/link/detail', qs.stringify(this.link)).then((res) => {
          this.$parent.$refs.loading.hideLoading()
          window.alert('发布成功')
          this.$router.back()
        })
      }
    }
  }
}
</script>
