<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar :title='name'>
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
    </div>
    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab value="1" title="基本信息"/>
      <mu-tab value="2" title="新闻内容"/>
    </mu-tabs>
    <div class='p10 mbfixed' v-if="activeTab === '1'">
      <mu-text-field label='新闻标题' hintText='请输入新闻标题' v-model='news.title' fullWidth/>
      <mu-select-field v-model='news.category' :labelFocusClass="['label-foucs']" hintText='所属分类' label="新闻分类" :maxHeight="300">
        <mu-menu-item v-for='v in categoryList' :value='v.id' :title='v.cdesc'/>
      </mu-select-field>
      <mu-text-field label='来源' hintText='请输入来源' v-model='news.origin' fullWidth/>
      <mu-text-field label='作者' hintText='请输入作者' v-model='news.author' fullWidth/>
      <p>文章属性：</p>
      <mu-checkbox name="imagenews" v-model="imagenews" label="图片"/>
      <mu-checkbox name="topnews" v-model="topnews" label="置顶" style="margin-left:20px"/>
      <mu-flexbox v-show="imagenews">
        <mu-flexbox-item class='flex-demo'>
          <mu-paper class='demo-paper' :zDepth='2'>
            <img class='avatar' style="width:4.8rem" :src='$store.state.imgUrl + news.picPath' @error='setErrorImg'>
          </mu-paper>
        </mu-flexbox-item>
        <mu-flexbox-item class='flex-demo'>
          <upload :width='300' v-on:result='fileChange'></upload>
        </mu-flexbox-item>
        <mu-flexbox-item class='flex-demo'></mu-flexbox-item>
      </mu-flexbox>
    </div>
    <div class='p10 mbfixed' v-if="activeTab === '2'">
      <quill-editor ref="myTextEditor" v-model="news.content" :config="editorOption">
      </quill-editor>
    </div>
    <mu-raised-button label='提交' @click='submit' class='fixed' secondary fullWidth/>
  </div>
</template>
<script>
import Upload from '../../components/upload'
import qs from 'qs'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      name: '',
      activeTab: '1',
      categoryList: this.$store.state.newsCategoryList,
      news: {
        imagenews: '00'
      },
      imagenews: false,
      topnews: false,
      editorOption: {}
    }
  },
  created () {
    if (this.$route.params.id) {
      this.name = '新闻修改'
      this.get()
    } else {
      this.name = '新闻添加'
    }
    this.getCate()
  },
  components: {
    Upload,
    quillEditor
  },
  methods: {
    get () {
      this.$http.get('/rest/api/news/detail/' + this.$route.params.id).then((res) => {
        this.news = res.data.attributes.data
        this.imagenews = this.news.imagenews === '01' ? true : false
        this.topnews = this.news.topnews === '01' ? true : false
      })
    },
    getCate () {
      if (this.categoryList.length === 0)
      this.$http.get('/rest/api/news/categoryManage').then((res) => {
        this.categoryList = res.data.attributes.data
        this.$store.commit('setNewsCategoryList', this.categoryList)
      })
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    fileChange (text) {
      this.news.picPath = text.data
    },
    submit () {
      if (!this.news.title) { return window.alert('新闻标题不能为空') }
      if (!this.news.category) { return window.alert('新闻分类不能为空') }
      if (!this.news.content) { return window.alert('新闻内容不能为空') }
      if (this.topnews) {this.news.topnews = '01'} else {this.news.topnews = '00'}
      if (this.imagenews) {this.news.imagenews = '01'} else {this.news.imagenews = '00'}
      this.model = {
        id: this.news.id,
        title: this.news.title,
        categoryId: this.news.category,
        origin: this.news.origin,
        author: this.news.author,
        imagenews: this.news.imagenews,
        topnews: this.news.topnews,
        content: this.news.content
      }
      if (this.news.imagenews === '01') {
        this.model.picPath = this.news.picPath || ''
      }
      this.$parent.$refs.loading.show()
      if (this.news.id) {
        this.$http.post('/rest/api/news/update', qs.stringify(this.model)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('修改成功')
          this.$router.back()
        })
      } else {
        this.$http.post('/rest/api/news/add', qs.stringify(this.model)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('发布成功')
          this.$router.back()
        })
      }
    }
  }
}
</script>
