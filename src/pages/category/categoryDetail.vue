<template>
  <div>
    <mu-appbar title="新增分类">
      <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
    </mu-appbar>

    <mu-circular-progress :size="40" :strokeWidth="5" style="position: fixed;z-index: 999;left: 50%;margin-left: -25px;top:30%"  v-if="isloading"/>

    <div class="container p10">
      <mu-select-field v-model="category.belongId" :labelFocusClass="['label-foucs']" label="所属分类">
        <mu-menu-item v-for="v,index in categorySelect" :value="v.categoryId" :title="v.name" />
      </mu-select-field>
      <p style="color: #ff6000;">注：未选择分类表示添加的是顶级分类</p>
      <mu-text-field label="分类名称" hintText="请输入分类名称" v-model="category.name"/>

      <mu-raised-button label="提交" @click="submit" class="demo-raised-button" secondary fullWidth/>
    </div>

  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      isloading: false,
      category: {},
      categorySelect: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.category.type = this.$route.params.id
      this.$http.get('http://app.jihui88.com/rest/api/category/rank/?type=' + this.$route.params.id).then((res) => {
        this.categorySelect = res.data.attributes.data
      })
    },
    submit () {
      this.isloading = true
      this.$http.put('/rest/api/category/detail?' + qs.stringify(this.category)).then((res) => {
        this.isloading = false
        window.alert('操作成功')
        this.$router.back()
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
