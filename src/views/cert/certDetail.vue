<template>
  <div>
    <mu-appbar :title="name">
      <mu-icon-button icon='arrow_back' @click="$router.back()" slot="left"/>
    </mu-appbar>
    <div class="p10">
      <mu-text-field label="证书名称" hintText="请输入证书名称" v-model="cert.name" fullWidth/>
      <mu-select-field v-model='cert.type' :labelFocusClass="['label-foucs']" hintText='证书分类'>
        <mu-menu-item v-for='v,index in typeList' :value='v.value' :title='v.text' />
      </mu-select-field>
      <mu-text-field label="发证机构" hintText="请输入发证机构" v-model="cert.organize" fullWidth/>
      <mu-flexbox style="margin-bottom:50px">
        <mu-flexbox-item class="flex-demo">
          证书图片：
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <mu-paper class="demo-paper" :zDepth="2">
            <img class="avatar" style="width:4.8rem" :src="$store.state.imgUrl + cert.attaPic" @error="setErrorImg">
          </mu-paper>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <upload :width="300" v-on:result="fileChange"></upload>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-raised-button label="提交" @click="submit" secondary fullWidth/>
    </div>
  </div>
</template>
<script>
import Upload from '../../components/upload'
import qs from 'qs'
export default {
  data () {
    return {
      name: '',
      typeList: [
        {text: '基本证书', value: '01'},
        {text: '税务登记证', value: '07'},
        {text: '荣誉证书', value: '04'},
        {text: '营业执照', value: '06'},
        {text: '组织机构代码证', value: '08'},
        {text: '实地认证', value: '09'},
        {text: '其它证书', value: '05'}
      ],
      cert: {
        type: '01'
      }
    }
  },
  created () {
    if (this.$route.params.id) {
      this.name = '证书修改'
      this.get()
    } else {
      this.name = '证书添加'
    }
  },
  components: {
    Upload
  },
  methods: {
    get () {
      this.$http.get('/rest/api/cert/detail/' + this.$route.params.id).then((res) => {
        this.cert = res.data.attributes.data
      })
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    fileChange (text) {
      this.cert.attachmentId = text.attId
      this.cert.attaPic = text.data
    },
    submit () {
      if (!this.cert.name) { return window.alert('证书名称不能为空') }
      if (!this.cert.organize) { return window.alert('发证机构不能为空') }
      // if (!this.cert.attaPic) { return window.alert('证书图片不能为空') }
      this.model = {
        name: this.cert.name,
        type: this.cert.type,
        organize: this.cert.organize,
        attId: this.cert.attachmentId
      }
      this.$parent.$refs.loading.show()
      if (this.$route.params.id) {
        this.$http.put('/rest/api/cert/detail/' + this.$route.params.id + '?' + qs.stringify(this.model)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('修改成功')
          this.$router.back()
        })
      } else {
        this.$http.post('/rest/api/cert/detail', qs.stringify(this.model)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('添加成功')
          this.$router.back()
        })
      }
    }
  }
}
</script>
