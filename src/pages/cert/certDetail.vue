<template>
  <div>
    <mu-appbar :title="name">
      <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
    </mu-appbar>
    <div class="p10">
      <mu-text-field label="证书名称" hintText="请输入证书名称" v-model="cert.name"/>
      <mu-select-field v-model='cert.type' :labelFocusClass="['label-foucs']" hintText='证书分类'>
        <mu-menu-item v-for='v,index in typeList' :value='v.value' :title='v.text' />
      </mu-select-field>
      <mu-text-field label="发证机构" hintText="请输入发证机构" v-model="cert.organize"/>
      <mu-flexbox style="margin-bottom:50px">
        <mu-flexbox-item class="flex-demo">
          证书图片：
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <mu-paper class="demo-paper" :zDepth="2">
            <img class="avatar" width="80" :src="imgUrl + cert.attaPic" @error="setErrorImg">
          </mu-paper>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <upload :width="300" v-on:result="fileChange"></upload>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-raised-button label="提交" @click="submit" class="submit-raised-button" secondary fullWidth/>
    </div>

  </div>
</template>
<script>
import Upload from '../../components/upload'
import qs from 'qs'
export default {
  data () {
    return {
      name: '证书',
      typeList: [
        {text: '基本证书', value: '01'},
        {text: '税务登记证', value: '07'},
        {text: '荣誉证书', value: '04'},
        {text: '营业执照', value: '06'},
        {text: '组织机构代码证', value: '08'},
        {text: '实地认证', value: '09'},
        {text: '其它证书', value: '05'}
      ],
      imgUrl: this.$store.state.imgUrl,
      cert: {
        type: '01'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get()
    })
  },
  components: {
    Upload
  },
  methods: {
    get () {
      this.name = '证书修改'
      this.$http.get('/rest/api/cert/detail/' + this.$route.params.id).then((res) => {
        this.cert = res.data.attributes.data
      })
    },
    back () {
      this.$router.back()
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    fileChange (text) {
      this.cert.attaPic = text
    },
    submit () {
      if (!this.link.name) {
        window.alert('链接名称不能为空')
        return
      }
      if (!this.link.url) {
        window.alert('链接地址不能为空')
        return
      }
      this.$http.post('/rest/api/link/detail?' + qs.stringify(this.link)).then((res) => {
        window.alert('修改成功')
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
