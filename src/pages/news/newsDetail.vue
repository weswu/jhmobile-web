<template>
  <div>
    <mu-appbar :title='name'>
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
    </mu-appbar>
    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab value="1" title="基本信息"/>
      <mu-tab value="2" title="新闻内容"/>
    </mu-tabs>
    <div class='p10' v-if="activeTab === '1'">
      <mu-text-field label='新闻标题' hintText='请输入新闻标题' v-model='news.title'/>
      <mu-select-field v-model='news.type' :labelFocusClass="['label-foucs']" hintText='所属分类'>
        <mu-menu-item v-for='v,index in categoryList' :value='v.categoryId' :title='v.name' />
      </mu-select-field>
      <mu-text-field label='来源' hintText='请输入来源' v-model='news.origin'/>
      <mu-text-field label='作者' hintText='请输入作者' v-model='news.author'/>
      <mu-flexbox style='margin-bottom:50px'>
        <mu-flexbox-item class='flex-demo'>
          新闻图片：
        </mu-flexbox-item>
        <mu-flexbox-item class='flex-demo'>
          <mu-paper class='demo-paper' :zDepth='2'>
            <img class='avatar' style="width:4.8rem" :src='imgUrl + news.picPath' @error='setErrorImg'>
          </mu-paper>
        </mu-flexbox-item>
        <mu-flexbox-item class='flex-demo'>
          <upload :width='300' v-on:result='fileChange'></upload>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>

    <div class='p10' v-if="activeTab === '2'">
      <quill-editor ref="myTextEditor"
        v-model="news.content" :config="editorOption">
      </quill-editor>
    </div>
    <mu-raised-button label='提交' @click='submit' class='submit-raised-button' secondary fullWidth/>
  </div>
</template>
<script>
import Upload from '../../components/upload'
import qs from 'qs'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      name: '新闻',
      activeTab: '1',
      categoryList: [
        {
          categoryId: 'Category_00000000000000000314414',
          enterpriseId: null,
          type: null,
          adduserId: null,
          belongId: null,
          name: '午间新闻',
          cdesc: '午间新闻',
          grade: '00',
          isroot: '01',
          addTime: null,
          isdisplay: null,
          state: '01',
          sort: 0,
          image: null,
          key: null,
          hunkdisplay: null,
          alias: null,
          updateTime: null,
          sonCate: [],
          id: 'Category_00000000000000000314414'
        },
        {
          categoryId: 'Category_00000000000000000320569',
          enterpriseId: null,
          type: null,
          adduserId: null,
          belongId: 'Category_00000000000000000314414',
          name: '------aa',
          cdesc: 'aa',
          grade: '01',
          isroot: '00',
          addTime: null,
          isdisplay: null,
          state: '01',
          sort: 0,
          image: null,
          key: null,
          hunkdisplay: null,
          alias: null,
          updateTime: null,
          sonCate: [ ],
          id: 'Category_00000000000000000320569'
        }
      ],
      imgUrl: this.$store.state.imgUrl,
      news: {},
      editorOption: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.params.id) {
        vm.name = '新闻修改'
        vm.get()
      } else {
        vm.name = '新闻添加'
      }
    })
  },
  components: {
    Upload,
    quillEditor
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/news/updateList?id=' + this.$route.params.id).then((res) => {
        this.news = res.data.attributes.data
      })
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    fileChange (text) {
      this.news.picPath = text
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    submit () {
      this.$http.post('/rest/api/news/update?', qs.stringify(this.news)).then((res) => {
        this.$router.back()
      })
    }
  }
}
</script>
