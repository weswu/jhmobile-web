<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar :title='name'>
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
    </div>
    <div class='p10' :class="$route.params.id != null ? '' : 'mbfixed'">
      <mu-list v-if="$route.params.id != null">
        <mu-list-item title="账号">
          <div class="wu-item-right">
            {{member.username}}
          </div>
        </mu-list-item>
        <mu-divider/>
      </mu-list>
      <mu-text-field v-else label='账号' hintText='请输入账号' v-model='member.username' fullWidth/>
      <mu-text-field label='昵称' hintText='请输入昵称' v-model='member.name' fullWidth/>
      <mu-text-field label='密码' v-model='member.password' type="password" fullWidth/>
      <mu-select-field v-model='member.memberrankId' :labelFocusClass="['label-foucs']" hintText='所属分类' label="会员分类" :maxHeight="300">
        <mu-menu-item v-for='v in categoryList' :value='v.rankId' :title='v.name'/>
      </mu-select-field>
      <p>是否启用</p>
      <mu-radio name="isaccountEnabled" nativeValue="00" v-model="member.isaccountEnabled" label="启用" class="wu-radio"/>
      <mu-radio name="isaccountEnabled" nativeValue="01" v-model="member.isaccountEnabled" label="关闭" class="wu-radio"/>

      <mu-text-field label='E-mail' hintText='请输入E-mail' v-model='member.email' fullWidth/>
      <mu-text-field label='积分' hintText='请输入积分' v-model='member.point' type="number" fullWidth/>
      <mu-text-field label='预存款' hintText='请输入预存款' v-model='member.deposit' type="number" fullWidth/>
    </div>
    <div class="hr"></div>
    <mu-list class="mbfixed" v-if="$route.params.id != null">
      <mu-list-item title="注册时间">
        <div class="wu-item-right">
          {{member.addTime}}
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
      name: '',
      member: {
        isaccountEnabled: '00'
      },
      categoryList: []
    }
  },
  created () {
    if (this.$route.params.id) {
      this.name = '会员修改'
      this.get()
    } else {
      this.name = '会员添加'
    }
    this.getCate()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/member/detail/' + this.$route.params.id).then((res) => {
        this.member = res.data.attributes.data
        this.member.password = ''
      })
    },
    getCate () {
      var ctx = this
      if (this.$store.state.memberRankList.length === 0) {
        this.$http.get('/rest/api/member/rank/list').then((res) => {
          ctx.categoryList = res.data.attributes.data
          ctx.$store.commit('setMemberRankList', ctx.categoryList)
          ctx.ifDefaultCate()
        })
      } else {
        this.categoryList = this.$store.state.memberRankList
        this.ifDefaultCate()
      }
    },
    ifDefaultCate () {
      this.categoryList.forEach((item, index, arr) => {
        if (item.isDefault === '01') {
          this.member.memberrankId = item.id
        }
      })
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
      if (this.$route.params.id) {
        this.$parent.$refs.loading.show()
        this.$http.put('/rest/api/member/detail/' + this.member.id + '?' + qs.stringify(this.model)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('修改成功')
          this.$router.back()
        })
      } else {
        if (!this.member.password) { return window.alert('密码不能为空') }
        if (!this.member.point) { this.member.point = 0 }
        if (!this.member.deposit) { this.member.deposit = 0 }
        this.$parent.$refs.loading.show()
        this.$http.post('/rest/api/member/detail', qs.stringify(this.member)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('添加成功')
          this.$router.back()
        }).catch((result) => {
          this.$parent.$refs.loading.hide()
        })
      }
    }
  }
}
</script>
