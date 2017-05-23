<template>
<div>
  <mu-appbar>
    <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
    <div class="play-title">
      <div class="play-name"><span>{{title}}</span></div>
    </div>
  </mu-appbar>
  <div class="container">
    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab value="1" title="账号信息"/>
      <mu-tab value="2" title="填写开办主体"/>
      <mu-tab value="3" title="网站基本信息"/>
      <mu-tab value="4" title="网站负责人信息"/>
      <mu-tab value="5" title="截图并邮寄"/>
    </mu-tabs>
    <div class="activeTab">
      <div v-if="activeTab === '1'">
        <div>
        <div style="color: #f60;">【注】在PC上注册账号http://beian.gov.cn/user/registerurl</div>
          操作成功后请保存以下信息
        </div>
        <p>
          <mu-text-field label="用户名" hintText="请输入用户名" v-model="webinfo.securityUsername"/>
          <mu-text-field label="密码" hintText="请输入密码" v-model="webinfo.securityPassword"/>
          <mu-text-field label="邮箱" hintText="请输入邮箱" v-model="enterprise.email"/>
          <mu-text-field label="手机号码" hintText="请输入手机号码" v-model="principal.cellphone"/>
        </p>
        <p>
          <mu-raised-button label="确定" class="demo-raised-button" secondary fullWidth backgroundColor="#ff6000"/>
        </p>
      </div>

      <div v-if="activeTab === '2'">
        <p>
          <mu-select-field v-model="enterprise.type" :labelFocusClass="['label-foucs']" label="开办主体性质">
            <mu-menu-item v-for="v,index in enterpriseTypeSelect" :key="v.value" :value="index" :title="v.text" />
          </mu-select-field>
        </p>
        <h3>主办单位信息</h3>
        <p>
          <mu-text-field label="主办单位名称" hintText="请输入内容"/>
        </p>
      </div>


    </div>

  </div>
</div>
</template>

<style lang="less" scoped>
  @import "../assets/theme.less";
  .view-tabs {
    background-color: #fff;
    color: rgba(0,0,0,.87);
    >.mu-tab-link {
      color: rgba(102,102,102,1);
    }
    >.mu-tab-active{
      color: @primaryColor;
    }
  }
  .activeTab{
    padding:10px;
  }
  .mu-text-field{
    width: 100%;
  }
  .mu-text-field.mu-select-field{
    width: 50%;
  }
</style>
<script>
import api from '../api'
export default {
  data () {
    return {
      activeTab: '1',
      title: '工信备案',
      enterpriseTypeSelect: [{text: '军队', value: '04'},
        {text: '政府机关', value: '05'},
        {text: '事业单位', value: '03'},
        {text: '企业', value: '01'},
        {text: '个人', value: '00'},
        {text: '个体经营', value: '02'},
        {text: '社会团体', value: '06'},
        {text: '民办非企业', value: '07'},
        {text: '基金会', value: '08'},
        {text: '律师事务所', value: '09'}
      ],
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
    back () {
      this.$router.go(-1)
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    get () {
      this.$http.get(api.getBeian()).then((res) => {
        console.log('获取数据')
        this.user = res.data.attributes.data.user
        this.enterprise = res.data.attributes.data.enterprise
        this.principal = res.data.attributes.data.principal
        this.bind = res.data.attributes.data.bind
        this.webinfo = res.data.attributes.data.webinfo
        this.emergency = res.data.attributes.data.emergency
      })
    }
  }
}
</script>
