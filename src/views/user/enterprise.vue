<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title="企业资料">
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
    </div>
    <div class="p10 mbfixed">
      <mu-flexbox>
        <mu-flexbox-item class="flex-demo">
          公司LOGO：
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <mu-paper class="demo-paper" :zDepth="2">
            <img class="avatar" width="80" :src="imgUrl + enterprise.logo" @error="setErrorImg" alt="公司LOGO">
          </mu-paper>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <upload :width="300" v-on:result="fileChange"></upload>
        </mu-flexbox-item>
      </mu-flexbox>

      <mu-text-field label="公司名称*" hintText="请输入公司名称" v-model="enterprise.name" fullWidth/>
      <mu-text-field label="主营产品*" hintText="请输入主营产品" v-model="enterprise.mainBusiness" fullWidth/>
      <mu-text-field label="法人代表*" hintText="请输入法人代表" v-model="enterprise.legalPre" fullWidth/>
      <mu-text-field label="员工数量*" hintText="请输入员工数量" v-model="enterprise.staffSum" fullWidth type="number"/>
      <mu-select-field v-model="enterprise.businessType" :labelFocusClass="['label-foucs']" label="经营模式" hintText="请选择">
        <mu-menu-item v-for="v,index in businessTypeSelect" :value="v.value" :title="v.text" />
      </mu-select-field>

      <mu-text-field label="icp备案号" hintText="请输入传真" v-model="enterprise.icp" fullWidth/>
      <mu-text-field label="年营业额" hintText="请输入地址" v-model="enterprise.annualTurnover" fullWidth/>
      <mu-text-field label="注册资本" hintText="请输入注册资本" v-model="enterprise.registeredCapital" fullWidth/>
      <mu-raised-button label="提交" @click="submit" class="fixed" secondary fullWidth/>
    </div>

  </div>
</template>
<script>
import Upload from '../../components/upload'
import qs from 'qs'
export default {
  data () {
    return {
      isloading: true,
      errorTextName: '',
      errorTextPosition: '',
      errorTextPhone: '',
      businessTypeSelect: [
        {text: '生产加工', value: '00'},
        {text: '经营批发', value: '01'},
        {text: '招商代理', value: '02'},
        {text: '商业服务', value: '03'},
        {text: '以上都不是', value: '04'}
      ],
      imgUrl: this.$store.state.imgUrl,
      enterprise: this.$store.state.enterprise
    }
  },
  created () {
    this.get()
  },
  components: {
    Upload
  },
  methods: {
    get () {
      if (!this.$store.state.enterprise.id) {
        this.$http.get('/rest/api/enterprise/detail').then((res) => {
          this.enterprise = res.data.attributes.data
          this.$store.commit('setEnterprise', this.enterprise)
        })
      }
    },
    submit () {
      this.$parent.$refs.loading.show()
      this.$http.put('/rest/api/enterprise/detail?' + qs.stringify(this.enterprise)).then((res) => {
        this.$parent.$refs.loading.hide()
        this.$store.commit('setEnterprise', this.enterprise)
        window.alert('操作成功')
      })
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    fileChange (text) {
      console.log('监听到子组件变化' + text)
      this.enterprise.logo = text.data
    }
  }
}
</script>
<style lang="less" scoped>

.demo-paper {
  display: inline-block;
  height: 80px;
  width: 80px;
  text-align: center;
}
</style>
