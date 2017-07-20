<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar :title='name'>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>

    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab value="1" title="基本信息"/>
      <mu-tab value="2" title="产品内容"/>
    </mu-tabs>
    <div class='p10' v-if="activeTab === '1'">
      <mu-text-field label='产品名称' hintText='请输入产品名称' v-model='product.name'/>
      <mu-text-field label='产品型号' hintText='请输入产品型号' v-model='product.prodtype'/>
      <mu-select-field v-model='product.categoryId' :labelFocusClass="['label-foucs']" hintText='所属分类'>
        <mu-menu-item v-for='v,index in categoryList' :value='v.categoryId' :title='v.name' />
      </mu-select-field>
      <mu-flexbox style='margin-bottom:50px'>
        <mu-flexbox-item class='flex-demo'>
          产品图片：
        </mu-flexbox-item>
        <mu-flexbox-item class='flex-demo'>
          <mu-paper class='demo-paper' :zDepth='2'>
            <img class='avatar' style="width:4.8rem" :src='imgUrl + product.picPath' @error='setErrorImg'>
          </mu-paper>
        </mu-flexbox-item>
        <mu-flexbox-item class='flex-demo'>
          <upload :width='300' v-on:result='fileChange'></upload>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
    <div class='p10' v-if="activeTab === '2'">
      <mu-text-field label='商品重量' hintText='请输入商品重量' v-model='product.weight' style="width:80%"/> 千克
      <mu-text-field label='商品价格' hintText='请输入商品价格' v-model='product.price' style="width:80%"/> 元
      <mu-text-field label='商品原价' hintText='请输入商品原价' v-model='product.marketprice' style="width:80%"/> 元
      <mu-text-field label='商品库存' hintText='请输入商品库存' v-model='product.store' style="width:80%"/> 件
    </div>

    <div class='p10' v-if="activeTab === '3'">
      <quill-editor ref="myTextEditor"
        v-model="product.content" :config="editorOption">
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
      name: '产品',
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
      product: {},
      editorOption: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.params.id) {
        vm.name = '产品修改'
        vm.get()
      } else {
        vm.name = '产品添加'
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
      this.$http.get('/rest/api/product/updateList?id=' + this.$route.params.id).then((res) => {
        this.product = res.data.attributes.data
      })
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    fileChange (text) {
      this.product.picPath = text
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    submit () {
      this.$http.post('/rest/api/product/update?', qs.stringify(this.product)).then((res) => {
        this.$router.back()
      })
    }
  }
}
</script>
