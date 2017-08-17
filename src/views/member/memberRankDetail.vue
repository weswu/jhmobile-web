<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar :title='name'>
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
    </div>
    <div class='p10 mbfixed'>
      <mu-text-field label='等级名称' hintText='请输入名称' v-model='rank.name' fullWidth/>
      <mu-text-field label='折扣(%)' hintText='请输入折扣' v-model='rank.preferentialScale' type="number" fullWidth/>
      <mu-text-field label='所需积分' hintText='请输入积分' v-model='rank.point' type="number" fullWidth/>
      <p>是否默认</p>
      <mu-radio name="isDefault" nativeValue="00" v-model="rank.isDefault" label="否" class="wu-radio"/>
      <mu-radio name="isDefault" nativeValue="01" v-model="rank.isDefault" label="是" class="wu-radio"/>
      <mu-text-field label='等级说明' hintText='请输入内容' v-model='rank.rdesc' fullWidth multiLine :rows="3"/>
    </div>
    <mu-raised-button label='提交' @click='submit' class='fixed' secondary fullWidth/>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      name: '',
      rank: {
        preferentialScale: 100,
        isDefault: '00'
      }
    }
  },
  created () {
    if (this.$route.params.id) {
      this.name = '会员等级修改'
      this.get()
    } else {
      this.name = '会员等级添加'
    }
  },
  methods: {
    get () {
      this.$http.get('/rest/api/member/rank/detail/' + this.$route.params.id).then((res) => {
        this.rank = res.data.attributes.data
      })
    },
    submit () {
      if (!this.rank.name) { return window.alert('名称不能为空') }
      if (!this.rank.preferentialScale) { return window.alert('折扣不能为空') }
      if (!this.rank.point) { return window.alert('积分不能为空') }
      if (!this.rank.isDefault) { this.rank.isDefault = '00' }
      this.$parent.$refs.loading.show()
      if (this.$route.params.id) {
        this.$http.put('/rest/api/member/rank/detail/' + this.$route.params.id + '?' + qs.stringify(this.rank)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('修改成功')
          this.$router.back()
        })
      } else {
        this.$http.post('/rest/api/member/rank/detail', qs.stringify(this.rank)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('添加成功')
          this.$router.back()
        })
      }
    }
  }
}
</script>
