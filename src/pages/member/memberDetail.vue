<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title='会员修改'>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <div class='p10 mbfixed'>
      <mu-text-field label='新闻标题' hintText='请输入新闻标题' v-model='member.title' fullWidth/>
      <mu-select-field v-model='member.category' :labelFocusClass="['label-foucs']" hintText='所属分类' :maxHeight="300">
        <mu-menu-item v-for='v in categoryList' :value='v.categoryId' :title='v.name'/>
      </mu-select-field>
      <mu-text-field label='来源' hintText='请输入来源' v-model='member.origin' fullWidth/>
      <mu-text-field label='作者' hintText='请输入作者' v-model='member.author' fullWidth/>

      <mu-radio v-if="false" name="imagemember" nativeValue="01" v-model="member.imagemember" label="显示" class="wu-radio"/>
      <mu-radio v-if="false" name="imagemember" nativeValue="00" v-model="member.imagemember" label="隐藏" class="wu-radio"/>
    </div>
    <mu-raised-button label='提交' @click='submit' class='fixed' secondary fullWidth/>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      member: {},
      categoryList: []
    }
  },
  created () {
    this.get()
  },
  watch: {
    '$route': 'get'
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/member/detail?id=' + this.$route.params.id).then((res) => {
        this.member = res.data.attributes.data
      })
    },
    submit () {
      if (!this.member.name) { return window.alert('新闻标题不能为空') }
      this.model = {
        id: this.member.id,
        name: this.member.name
      }
      if (this.member.id) {
        this.$http.post('/rest/api/member/update', qs.stringify(this.model)).then((res) => {
          window.alert('修改成功')
          this.$router.back()
        })
      } else {
        this.$http.post('/rest/api/member/add', qs.stringify(this.model)).then((res) => {
          window.alert('发布成功')
          this.$router.back()
        })
      }
    }
  }
}
</script>
