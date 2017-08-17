<template>
  <div>
    <mu-appbar title='绑定邮箱'>
      <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
    </mu-appbar>
    <div class='p10'>
      <div>邮箱提醒：</div>
      <mu-radio name='state' v-model='message.state' v-for='item in typeList' :label='item.text' :nativeValue='item.value' class='wu-radio' labelClass='w-radio'/>
      <mu-text-field label='电子邮箱：' hintText='请输入邮箱' v-model='message.key' fullWidth/>
      <mu-raised-button label='提交' @click='submit' secondary fullWidth/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      typeList: [
        {text: '是', value: '01'},
        {text: '否', value: '00'}
      ],
      message: {
        state: '01'
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/message/bind/detail').then((res) => {
        this.message = res.data.attributes.data[0] || {}
      })
    },
    submit () {
      var RegUrl = /^[a-zA-Z0-9_\\.]+@[a-zA-Z0-9-]+[\\.a-zA-Z]+$/
      if (!RegUrl.test(this.message.key)) {
        window.alert('Email格式不正确')
        return false
      }
      if (this.message.id === null) {
        this.$http.post('/rest/api/message/bind/detail?state=' + this.message.state + '&key=' + this.message.key).then((res) => {
          window.alert('添加成功')
        })
      } else {
        this.$http.put('/rest/api/message/bind/detail/' + this.message.enterpriseId + '?state=' + this.message.state + '&key=' + this.message.key).then((res) => {
          window.alert('修改成功')
        })
      }
    }
  }
}
</script>
