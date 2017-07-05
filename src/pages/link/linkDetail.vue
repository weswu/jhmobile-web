<template>
  <div>
    <mu-appbar :title='name'>
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
    </mu-appbar>
    <div class="p10">
      <mu-text-field label="链接名称" hintText="请输入链接名称" v-model="link.name"/>
      <mu-text-field label="链接地址" hintText="请输入链接地址" v-model="link.url"/>
      <mu-raised-button label="提交" @click="submit" class="submit-raised-button" secondary fullWidth/>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      name: '友情链接',
      link: {}
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
      this.$http.get('/rest/api/link/detail/' + this.$route.params.id).then((res) => {
        this.link = res.data.attributes.data
        this.name = this.link.name
      })
    },
    submit () {
      if (!this.link.name) {
        window.alert('链接名称不能为空')
        return
      }
      if (!this.link.url) {
        window.alert('链接地址不能为空')
        return
      }
      this.$http.post('/rest/api/link/detail?' + qs.stringify(this.link)).then((res) => {
        window.alert('修改成功')
      })
    }
  }
}
</script>
