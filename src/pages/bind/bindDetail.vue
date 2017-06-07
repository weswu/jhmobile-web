<template>
  <div>
    <mu-appbar title="域名添加">
      <mu-icon-button icon='arrow_back' @click="back" slot="left"/>
    </mu-appbar>
    <div class="container p10">
      <p>
        <div>
          地址类型：
        </div>
        <mu-radio name="type" nativeValue="checkbox1" v-model="bind.type" label="域名" class="demo-radio" labelClass="w-radio"/>
        <mu-radio name="type" nativeValue="checkbox2" v-model="bind.type" label="地址" class="demo-radio" labelClass="w-radio"/>
        <mu-radio name="type" nativeValue="checkbox3" v-model="bind.type" label="图片" class="demo-radio" labelClass="w-radio"/>
        <mu-radio name="type" nativeValue="checkbox3" v-model="bind.type" label="手机" class="demo-radio" labelClass="w-radio"/>


        <mu-text-field label="域名" hintText="请输入域名" v-model="bind.address" />
        <mu-text-field label="icp备案号" hintText="请输入备案号" v-model="bind.icp"/>
      </p>
      <mu-raised-button label="提交" @click="submit" class="submit-raised-button" secondary fullWidth/>
    </div>

  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      isloading: true,
      bind: {}
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/bind/detail').then((res) => {
        this.bind = res.data.attributes.data
      })
    },
    back () {
      this.$router.back()
    },
    submit () {
      let _this = this
      this.$http.put('/rest/api/bind/detail?' + qs.stringify(this.bind)).then((res) => {
        _this.$router.back()
      })
    }
  }
}
</script>
<style lang="less">
.demo-radio{}
.demo-radio .mu-radio-icon {
    margin-right: 5px;
}
.demo-radio .w-radio{
  font-size: 14px;padding-right: 10px;
}
</style>
