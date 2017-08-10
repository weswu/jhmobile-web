<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title='会员修改'>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <div class='p10'>
      <mu-list>
        <mu-list-item title="账号">
          <div class="wu-item-right">
            {{member.username}}
          </div>
        </mu-list-item>
        <mu-divider/>
      </mu-list>
      <mu-text-field label='昵称' hintText='请输入昵称' v-model='member.name' fullWidth/>
      <mu-text-field label='密码' v-model='member.password' fullWidth/>
      <mu-text-field label='E-mail' hintText='请输入E-mail' v-model='member.email' fullWidth/>
      <mu-text-field label='积分' hintText='请输入积分' v-model='member.point' fullWidth/>
      <mu-text-field label='预存款' hintText='请输入预存款' v-model='member.deposit' fullWidth/>
      <p>是否启用</p>
      <mu-radio name="isaccountEnabled" nativeValue="00" v-model="member.isaccountEnabledisaccountEnabled" label="启用" class="wu-radio"/>
      <mu-radio name="isaccountEnabled" nativeValue="01" v-model="member.isaccountEnabled" label="关闭" class="wu-radio"/>
    </div>
    <div class="hr"></div>
    <mu-list class="mbfixed">
      <mu-list-item title="注册时间">
        <div class="wu-item-right">
          {{member.addTime}}
        </div>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="注册IP">
        <div class="wu-item-right">
          {{member.registerIp}}
        </div>
      </mu-list-item>
      <mu-divider/>
    </mu-list>
    <mu-raised-button label='提交' @click='submit' class='fixed' secondary fullWidth/>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      member: {},
      categoryList: []
    }
  },
  created () {
    this.get()
  },
  watch: {
    '$route': 'get'
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      if (this.$route.params.id) {
        this.$http.get('/rest/api/member/detail/' + this.$route.params.id).then((res) => {
          this.member = res.data.attributes.data
          this.member.password = ''
        })
      }
    },
    submit () {
      if (!this.member.name) { return window.alert('昵称不能为空') }
      this.model = {
        name: this.member.name,
        password: this.member.password,
        email: this.member.email,
        point: this.member.point,
        deposit: this.member.deposit,
        memberrankId: this.member.memberrankId,
        isaccountEnabled: this.member.isaccountEnabled
      }
      this.$http.put('/rest/api/member/detail/' + this.member.id + '?' + qs.stringify(this.model)).then((res) => {
        window.alert('修改成功')
        this.$router.back()
      })
    }
  }
}
</script>
