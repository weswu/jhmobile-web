<template>
  <div>
    <mu-appbar title='Seo修改'>
      <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
    </mu-appbar>
    <div class="p10 mbfixed">
      <mu-text-field label="Seo标题" hintText="请输入标题" v-model="seo.title" :maxLength="100" fullWidth/>
      <mu-text-field label="Seo关键字" hintText="请输入关键字" v-model="seo.keywords" :maxLength="100" fullWidth/>
      <mu-text-field label="Seo描述" hintText="请输入描述" v-model="seo.description" :maxLength="250" multiLine :rows="5" :rowsMax="10" fullWidth/>
    </div>
    <mu-raised-button label="提交" @click="submit" class="fixed" secondary fullWidth/>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      seo: {}
    }
  },
  created () {
    if (this.$route.params.id.indexOf('Product_') > -1) {
      this.product = this.$route.params
      this.seo.title = this.$route.params.seoTitle
      this.seo.keywords = this.$route.params.pkey
      this.seo.description = this.$route.params.seoDescription
    } else if (this.$route.params.id.indexOf('News_') > -1) {
      this.seo.title = this.$route.params.seoTitle
      this.seo.keywords = this.$route.params.nkey
      this.seo.description = this.$route.params.seoDescription
    } else {
      this.get()
    }
  },
  methods: {
    get () {
      this.$http.get('/rest/api/seo/detail/' + this.$route.params.id).then((res) => {
        this.seo = res.data.attributes.data || {}
      })
    },
    submit () {
      if (!this.seo.title) { return window.alert('Seo标题不能为空') }
      if (!this.seo.keywords) { return window.alert('Seo关键字不能为空') }
      if (!this.seo.description) { return window.alert('Seo描述不能为空') }
      this.$parent.$refs.loading.show()
      if (this.$route.params.id.indexOf('Product_') > -1) {
        this.product.seoTitle = this.seo.title
        this.product.pkey = this.seo.keywords
        this.product.seoDescription = this.seo.description
        this.$http.put('/rest/api/product/detail/' + this.$route.params.id + '?' + qs.stringify(this.product)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('修改成功')
          this.$router.back()
        })
      } else if (this.$route.params.id.indexOf('News_') > -1) {
        this.model = {
          seoTitle: this.seo.title,
          nkey: this.seo.keywords,
          seoDescription: this.seo.description
        }
        this.$http.put('/rest/api/news/detail/' + this.$route.params.id + '?' + qs.stringify(this.model)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('修改成功')
          this.$router.back()
        })

      } else if (this.seo.seoId) {
        this.$http.put('/rest/api/seo/detail/' + this.$route.params.id + '?' + qs.stringify(this.seo)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('修改成功')
          this.$router.back()
        })
      } else {
        this.seo.belongPage = this.$route.params.id
        this.$http.post('/rest/api/seo/detail', qs.stringify(this.seo)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('添加成功')
          this.$router.back()
        })
      }
    }
  }
}
</script>
