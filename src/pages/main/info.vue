<template>
    <div>
        <div>排行榜-尚未开发2</div>

        <mu-circular-progress :size="50" :strokeWidth="5" style="position: fixed;z-index: 999;left: 50%;margin-left: -25px;top:30%"  v-if="isloading"/>

        <mu-text-field label="用户名称" hintText="请输入用户名称" v-model="enterprise.name"/>
        <img v-bind:src="enterprise.logo" alt="">

        <mu-raised-button label="提交" @click="submit" class="submit-raised-button" primary fullWidth/>
    </div>
</template>
<script>
import api from '../../api'
import qs from 'qs'
export default {
  data () {
    return {
      isloading: false,
      enterprise: {}
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get(api.getEnterprise()).then((res) => {
        this.enterprise = res.data.attributes.data
      })
    },
    submit () {
      this.$http.put('/rest/api/enterprise/detail?' + qs.stringify(this.enterprise)).then((res) => {
        window.alert('操作成功')
      })
    }
  }
}
</script>
<style>
</style>
