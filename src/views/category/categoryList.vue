<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title='分类管理'>
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
        <mu-flat-button label="保存修改" @click="change" slot="right"/>
        <mu-icon-button :to="'/categoryAdd/'+$route.params.id" icon='add' slot='right'/>
      </mu-appbar>
    </div>
    <mu-list>
      <mu-list-item v-for='item, index in categoryList' v-if="item.isroot === '01'">
        <mu-icon slot="left" value="chevron_right"/>
        <span slot="title"  style="color: #777">
          <input type="text" name="" :value="item.name">
        </span>
        <mu-icon slot="right" value="delete" @click="del(item.id)"/>

        <mu-list-item slot="nested" v-for='item1, index1 in item.sonCate' >
          <mu-icon slot="left" value="chevron_right"/>
          <span slot="title"  style="color: #777">
            <input type="text" name="" :value="item1.name">
          </span>
          <mu-icon slot="right" value="delete" @click="del(item1.id)"/>

          <mu-list-item slot="nested" v-for='item2, index2 in item1.sonCate'>
            <mu-icon slot="left" value="chevron_right"/>
            <span slot="title"  style="color: #777">
              <input type="text" name="" :value="item2.name">
            </span>
            <mu-icon slot="right" value="delete" @click="del(item2.id)"/>
          </mu-list-item>
        </mu-list-item>

      </mu-list-item>
    </mu-list>
  </div>
</template>
<script>
export default {
  data () {
    return {
      type: this.$route.params.id === 'product' ? '10' : '11',
      categoryList: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$parent.$refs.loading.show()
      this.$http.get('/rest/api/' + this.$route.params.id + '/categoryManage').then((res) => {
        this.categoryList = res.data.attributes.data
        if (this.$route.params.id === 'product') {
          this.$store.commit('setProductCategoryList', this.categoryList)
        } else {
          this.$store.commit('setNewsCategoryList', this.categoryList)
        }
        this.$parent.$refs.loading.hide()
      })
    },
    change (item) {
      this.$parent.$refs.loading.show()
      var list = ''
      this.categoryList.forEach(function (item, i) {
        if (i === 0) { list = 'id=' + item.id + ',name=' + item.name }
        if (i !== 0) { list = list + ';id=' + item.id + ',name=' + item.name }
        item.sonCate && item.sonCate.forEach(function (item1, j) {
          if (i !== 0) { list = list + ';id=' + item1.id + ',name=' + item1.name }
          item1.sonCate && item1.sonCate.forEach(function (item2, x) {
            if (i !== 0) { list = list + ';id=' + item2.id + ',name=' + item2.name }
          })
        })
      })
      this.$http.put('/rest/api/category/update?list=' + list).then((res) => {
        this.$parent.$refs.loading.hide()
        if (this.$route.params.id === 'news') {
          this.$store.commit('setNewsCategoryList', [])
        } else {
          this.$store.commit('setProductCategoryList', [])
        }
        window.alert('保存成功')
      })
    },
    del (id) {
      if (window.confirm('确认删除吗？')) {
        this.$http.delete('/rest/api/category/detail/' + id + '?type=' + this.type).then((res) => {
          this.$parent.$refs.toast.show('删除成功')
          this.categoryList.forEach((item, index, arr) => {
            if (item.id === id) {
              arr.splice(index, 1)
            }
            item.sonCate && item.sonCate.forEach((item2, index2, arr2) => {
              if (item2.id === id) {
                arr2.splice(index2, 1)
              }
              item2.sonCate && item2.sonCate.forEach((item3, index3, arr3) => {
                if (item3.id === id) {
                  arr3.splice(index3, 1)
                }
              })
            })
          })
        })
        if (this.$route.params.id === 'news') {
          this.$store.commit('setNewsCategoryList', [])
        } else {
          this.$store.commit('setProductCategoryList', [])
        }
      }
    }
  }
}
</script>
<style scoped>
input{width:100%;border:1px solid #ddd;padding:.3rem;border-radius:4px}
</style>
