<template>
<div>
  <div class="fixed-bar">
    <mu-appbar title="工商红盾">
      <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
    </mu-appbar>
  </div>
  <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
    <mu-tab value="1" title="工商红盾申请"/>
    <mu-tab value="2" title="输入代码"/>
    <mu-tab value="3" title="放置标识"/>
  </mu-tabs>
  <div class="p10">
      <div v-if="activeTab === '1'">
        <div style="color: #f60;">
          <div style="color: #36f;">【注】在PC上注册账号<br/>http://zjnet.zjaic.gov.cn/sign/addSignOnline.action</div>
          操作成功后请保存以下信息
        </div>
        <mu-text-field label="企业名称(个体工商户名称)" hintText="请输入企业名称" v-model="enterprise.name" fullWidth/>
        <mu-text-field label="注册号" hintText="请输入注册号" v-model="enterprise.certNumber" fullWidth/>
        <mu-text-field label="网址" hintText="请输入网址" v-model="user.url" fullWidth/>
        <mu-text-field label="管理员/联系人" hintText="请输入管理员/联系人" v-model="principal.name" fullWidth/>
        <mu-text-field label="管理员/联系人Email" hintText="请输入Email" v-model="principal.email" fullWidth/>
        <mu-raised-button label="提交" @click="submit('2')" secondary fullWidth/>
      </div>
      <div v-if="activeTab === '2'">
        <div style="color: #f60;">
          【注】本代码从工商红盾网站里的“获取代码”按钮处获取
        </div>
        <mu-text-field hintText="请输入获取到的代码" v-model="enterprise.gsbsZym" fullWidth multiLine :rows="8" :rowsMax="10"/>
        <mu-raised-button label="提交" @click="submit('3')" secondary fullWidth/>
      </div>
      <div v-if="activeTab === '3'">
        <div style="padding: 40px; text-align: center;">
          <mu-icon value="home" color="#5cb85c" :size="52"/><br>
          放置成功，
          <a href="http://zj.gsxt.gov.cn/client/entsearch/toEntSearch" class="" target="_blank" style="color: #999;">查看企业信用信息</a>
        </div>
      </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      activeTab: '1',
      user: {},
      enterprise: {},
      principal: {},
      bind: {},
      webinfo: {},
      emergency: {}
    }
  },
  created () {
    this.get()
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    get () {
      this.$http.get('/rest/api/profile/detail').then((res) => {
        this.user = res.data.attributes.data.user
        this.enterprise = res.data.attributes.data.enterprise
        this.principal = res.data.attributes.data.principal
        this.bind = res.data.attributes.data.bind
        this.webinfo = res.data.attributes.data.webinfo
        this.emergency = res.data.attributes.data.emergency
      })
    },
    submit (val) {
      this.$http.post('/rest/api/profile/detail/all', {
        user: this.user,
        enterprise: this.enterprise,
        principal: this.principal,
        bind: this.bind,
        webinfo: this.webinfo,
        emergency: this.emergency
      },
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        this.activeTab = val
        document.body.scrollTop = 0
        if (val) {
          this.$parent.$refs.topPopup.show()
        }
        this.principal.principalId = res.data.attributes.data.principal.principalId
        this.bind.bindId = res.data.attributes.data.bind.bindId
        this.webinfo.webinfoId = res.data.attributes.data.webinfo.webinfoId
        this.emergency.principalId = res.data.attributes.data.emergency.principalId
      })
    }
  }
}
</script>
