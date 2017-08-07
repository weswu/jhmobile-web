<template>
  <div>
    <mu-appbar title="新增分类">
      <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
    </mu-appbar>
    <div class="p10">
      <mu-select-field v-model="category.belongId" :labelFocusClass="['label-foucs']" label="所属分类">
        <mu-menu-item v-for="v,index in categorySelect" :value="v.categoryId" :title="v.name" />
      </mu-select-field>
      <p style="color: #ff6000;">注：未选择分类表示添加的是顶级分类</p>
      <mu-text-field label="分类名称" hintText="请输入分类名称" v-model="category.name" fullWidth/>
      <mu-raised-button label="提交" @click="submit" class="demo-raised-button" secondary fullWidth/>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      category: {},
      categorySelect: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    ...mapMutations(['showLoading', 'hideLoading']),
    back () {
      this.$router.back()
    },
    get () {
      this.category.type = this.$route.params.id
      this.$http.get('/rest/api/category/rank/?type=' + this.$route.params.id).then((res) => {
        this.categorySelect = res.data.attributes.data
      })
    },
    submit () {
      this.showLoading()
      this.$http.put('/rest/api/category/detail?' + qs.stringify(this.category)).then((res) => {
        this.hideLoading()
        window.alert('操作成功')
        this.$router.back()
      })
    }
  }
}
</script>
