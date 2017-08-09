<template>
  <div>
    <mu-list>
      <mu-list-item title="PC网站" v-if="grade !== '04' && grade !== '14'">
        <mu-badge content="展示版" primary slot="right" v-if="userType === '展示版'"/>
        <mu-badge content="营销版" primary slot="right" v-if="userType === '营销版'"/>
        <mu-badge content="电商版" primary slot="right" v-if="userType === '电商版'"/>
      </mu-list-item>
      <mu-divider v-if="grade !== '04' && grade !== '14'"/>

      <mu-list-item title="手机网站" v-if="mobileSite === '01' || mobileSite === '07' || mobileSite === '04' || mobileSite === '14'">
        <mu-badge content="展示版" primary slot="right" v-if="mobileSite === '01' || mobileSite === '04'"/>
        <mu-badge content="电商版" primary slot="right" v-if="mobileSite === '07' || mobileSite === '14'"/>
      </mu-list-item>
      <mu-divider v-if="mobileSite === '01' || mobileSite === '07'"/>

      <mu-list-item title="微传单" v-if="wcdMember === '00' || wcdMember === '01'">
        <mu-badge content="免费" slot="right" v-if="wcdMember === '00'"/>
        <mu-badge content="会员" primary slot="right" v-if="wcdMember === '01'"/>
      </mu-list-item>
      <mu-divider v-if="wcdMember === '00' || wcdMember === '01'"/>

      <mu-list-item title="微分销" v-if='distribution'>
        <mu-badge content="会员" primary slot="right"/>
      </mu-list-item>
      <mu-divider v-if='distribution'/>
    </mu-list>
  </div>
</template>
<script>
import jsonp from 'jsonp'
export default {
  data () {
    return {
      wcdMember: this.$store.state.user.wcdMember, // 01是微传单会员
      grade: this.$store.state.user.grade,
      userType: this.$store.state.user.userType,
      mobileSite: this.$store.state.enterprise.mobileSite, /** 00/01/07 未开通/展示版/电商版 **/
      distribution: false
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      var ctx = this
      jsonp('http://www.jihui88.com/wechat/cps/index.php/jihui_api/members/' + this.$store.state.enterprise.enterpriseId + '/1/1', null, function (err, data) {
        if (!data.success) {
          console.log(data.msg)
        } else {
          ctx.distribution = true
        }
        if (err) {
          console.error(err.message)
        } else {
          console.log(data)
        }
      })
    }
  }
}
</script>
