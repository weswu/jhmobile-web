<template>
  <div>
    <mu-appbar title='分类管理' class="wu-appbar">
      <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
      <mu-flat-button label="保存修改" @click="change" slot="right"/>
      <mu-icon-button href='#/categoryAdd/11' icon='add' slot='right'/>
    </mu-appbar>

    <mu-list class="pt56">
      <mu-list-item v-for='item, index in categoryList' v-if="item.isroot === '01'">
        <mu-icon slot="left" value="chevron_right"/>
        <span slot="title"  style="color: #777">
          <input type="text" name="" :value="item.name">
        </span>
        <mu-icon slot="right" value="delete" @click="del(item)"/>


        <mu-list-item slot="nested" v-for='item1, index1 in item.sonCate' >
          <mu-icon slot="left" value="chevron_right"/>
          <span slot="title"  style="color: #777">
            <input type="text" name="" :value="item1.name">
          </span>
          <mu-icon slot="right" value="delete" @click="del(item1)"/>

          <mu-list-item slot="nested" v-for='item2, index2 in item1.sonCate'>
            <mu-icon slot="left" value="chevron_right"/>
            <span slot="title"  style="color: #777">
              <input type="text" name="" :value="item2.name">
            </span>
            <mu-icon slot="right" value="delete" @click="del(item2)"/>
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
      isloading: false,
      categoryList: []
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
      this.$http.get('/rest/api/' + this.$route.params.id + '/categoryManage').then((res) => {
        this.categoryList = res.data.attributes.data
      })
    },
    change (item) {
      this.isloading = true
      var list = ''
      this.categoryList.forEach(function (item, i) {
        if (i === 0) { list = 'id=' + item.id + ',name=' + item.name }
        if (i !== 0) { list = list + ';id=' + item.id + ',name=' + item.name }
        item.sonCate.forEach(function (item1, j) {
          if (i !== 0) { list = list + ';id=' + item1.id + ',name=' + item1.name }
          item1.sonCate.forEach(function (item2, x) {
            if (i !== 0) { list = list + ';id=' + item2.id + ',name=' + item2.name }
          })
        })
      })
      this.$http.put('/rest/api/category/update?list=' + list).then((res) => {
        this.isloading = false
        console.log('news category update success')
      })
    },
    del (entry) {
      if (window.confirm('确认删除吗？')) {
        this.$http.delete('/rest/api/category/detail/' + entry.id + '?type=11').then((res) => {
          var data = this.categoryList
          data.forEach(function (item, i) {
            item.sonCate.forEach(function (item1, j) {
              item1.sonCate.forEach(function (item2, x) {
                if (item2 === entry) {
                  item1.sonCate.splice(x, 1)
                  return false
                }
              })
              if (item1 === entry) {
                item.sonCate.splice(j, 1)
                return false
              }
            })
            if (item === entry) {
              data.splice(i, 1)
              return false
            }
          })
        })
      }
    }
  }
}
</script>
<style lang='less' scoped>
input{
  width: 100%;
  border: 1px solid #ddd;
  padding: 0.3rem;
}
</style>
