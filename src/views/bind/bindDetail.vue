<template>
  <div>
    <mu-appbar title='域名添加'>
      <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
    </mu-appbar>
    <div class='p10'>
      <div>
        地址类型：
      </div>
      <mu-radio name='type' v-model='bind.type' v-for='item in typeList' :label='item.text' :nativeValue='item.value' class='wu-radio' labelClass='w-radio'/>
      <mu-text-field type='url' label='域名' hintText='请输入域名，不用填http://' v-model='bind.address' fullWidth/>
      <mu-text-field label='icp备案号' hintText='请输入备案号' v-model='bind.icp' fullWidth/>
      <mu-raised-button label='提交' @click='submit' secondary fullWidth/>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      typeList: [
        {text: '域名', value: 'D'},
        {text: '地址', value: 'A'},
        {text: '图片', value: 'I'},
        {text: '手机', value: 'M'}
      ],
      bind: {
        type: 'D',
        icp: this.$store.state.enterprise.icp || ''
      }
    }
  },
  methods: {
    submit () {
      if (!this.bind.address) { return window.alert('域名名称不能为空') }
      const reg = new RegExp('[0-9a-zA-Z]+[0-9a-zA-Z\\.-]*\\.[a-zA-Z]{2,4}')
      if (!reg.test(this.bind.address)) { return window.alert('域名格式不正确') }
      if (!this.bind.icp) { return window.alert('icp备案号不能为空') }
      this.$http.post('/rest/api/bind/detail?' + qs.stringify(this.bind)).then((res) => {
        this.$router.back()
      })
    }
  }
}
</script>
