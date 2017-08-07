<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar :title='name'>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab value="1" title="基本信息"/>
      <mu-tab value="2" title="新闻内容"/>
    </mu-tabs>
    <div class='p10 mbfixed' v-if="activeTab === '1'">
      <mu-text-field label='新闻标题' hintText='请输入新闻标题' v-model='news.title' fullWidth/>
      <mu-select-field v-model='news.category' :labelFocusClass="['label-foucs']" hintText='所属分类' :maxHeight="300">
        <mu-menu-item v-for='v in categoryList' :value='v.categoryId' :title='v.name'/>
      </mu-select-field>
      <mu-text-field label='来源' hintText='请输入来源' v-model='news.origin' fullWidth/>
      <mu-text-field label='作者' hintText='请输入作者' v-model='news.author' fullWidth/>
      <p v-if="false">新闻图片：</p>
      <mu-radio v-if="false" name="imagenews" nativeValue="01" v-model="news.imagenews" label="显示" class="wu-radio"/>
      <mu-radio v-if="false" name="imagenews" nativeValue="00" v-model="news.imagenews" label="隐藏" class="wu-radio"/>
      <mu-flexbox v-if="news.imagenews === '01'">
        <mu-flexbox-item class='flex-demo'>
          <mu-paper class='demo-paper' :zDepth='2'>
            <img class='avatar' style="width:4.8rem" :src='imgUrl + news.picPath' @error='setErrorImg'>
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
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      name: '新闻',
      activeTab: '1',
      categoryList: [],
      news: {},
      imgUrl: this.$store.state.imgUrl,
      editorOption: {}
    }
  },
  created () {
    this.get()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'get'
  },
  components: {
    Upload,
    quillEditor
  },
  methods: {
    ...mapMutations(['showLoading', 'hideLoading']),
    back () {
      this.$router.back()
    },
    get () {
      this.activeTab = '1'
      if (this.$route.params.id) {
        this.name = '新闻修改'
        this.$http.get('/rest/api/news/updateList?id=' + this.$route.params.id).then((res) => {
          this.categoryList = res.data.attributes.categoryList
          this.news = res.data.attributes.data
        })
      } else {
        if (this.$route.path === '/newsAdd') {
          this.name = '新闻添加'
          this.getCate()
          this.news = {
            imagenews: '00'
          }
        }
      }
    },
    getCate () {
      this.$http.get('/rest/api/news/updateList?id=0').then((res) => {
        this.categoryList = res.data.attributes.categoryList
      })
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    fileChange (text) {
      this.news.picPath = text.data
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    submit () {
      if (!this.news.title) { return window.alert('新闻标题不能为空') }
      if (!this.news.category) { return window.alert('新闻分类不能为空') }
      if (!this.news.content) { return window.alert('新闻内容不能为空') }
      this.model = {
        id: this.news.id,
        title: this.news.title,
        categoryId: this.news.category,
        origin: this.news.origin,
        author: this.news.author,
        imagenews: this.news.imagenews,
        content: this.news.content
      }
      if (this.news.imagenews === '01') {
        this.model.picPath = this.news.picPath
      }
      this.showLoading()
      if (this.news.id) {
        this.$http.post('/rest/api/news/update', qs.stringify(this.model)).then((res) => {
          this.hideLoading()
          window.alert('修改成功')
          this.$router.back()
        })
      } else {
        this.$http.post('/rest/api/news/add', qs.stringify(this.model)).then((res) => {
          this.hideLoading()
          window.alert('发布成功')
          this.$router.back()
        })
      }
    }
  }
}
</script>
