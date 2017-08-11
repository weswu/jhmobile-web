<template>
  <div id="productDetail">
    <div class="fixed-bar">
      <mu-appbar :title='name'>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab value="1" title="基本信息"/>
      <mu-tab value="2" title="商城属性"/>
    </mu-tabs>
    <div class='p10 mbfixed' v-if="activeTab === '1'">
      <mu-text-field label='产品名称' hintText='请输入产品名称' v-model='product.name' fullWidth/>
      <mu-select-field v-model='product.category' :labelFocusClass="['label-foucs']" hintText='所属分类' :maxHeight="300">
        <mu-menu-item v-for='v,index in categoryList' :value='v.categoryId' :title='v.name' />
      </mu-select-field>
      <mu-text-field label='产品型号' hintText='请输入产品型号' v-model='product.prodtype' fullWidth/>
      <mu-flexbox>
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
    <div class='p10 mbfixed' v-if="activeTab === '2'">
      <mu-text-field label='商品重量' hintText='请输入商品重量' v-model='product.weight' style="width:70%"/>
      <mu-select-field v-model='product.weightunit' :labelFocusClass="['label-foucs']" hintText='请选择' class="wu-text-right">
        <mu-menu-item v-for='v,index in weightunits' :value='v.value' :title='v.name' />
      </mu-select-field>
      <mu-text-field label='商品价格' hintText='请输入商品价格' v-model='product.price' style="width:70%"/><span class="wu-text-right">元</span>
      <mu-text-field label='商品原价' hintText='请输入商品原价' v-model='product.marketprice' style="width:70%"/><span class="wu-text-right">元</span>
      <mu-text-field label='商品库存' hintText='请输入商品库存' v-model='product.store' style="width:70%"/><span class="wu-text-right">件</span>
    </div>
    <div class='p10' v-if="activeTab === '3'">
      <quill-editor ref="myTextEditor"
        v-model="product.content" :config="editorOption">
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
      name: '产品',
      activeTab: '1',
      imgUrl: this.$store.state.imgUrl,
      weightunits: [
        {value: 'g', name: '克'},
        {value: 'kg', name: '千克'},
        {value: 't', name: '吨'}
      ],
      categoryList: [],
      product: {},
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
    back () {
      this.$router.back()
    },
    get () {
      this.activeTab = '1'
      if (this.$route.params.id) {
        this.name = '产品修改'
        this.$http.get('/rest/api/product/updateList?id=' + this.$route.params.id).then((res) => {
          this.categoryList = res.data.attributes.categoryList
          this.product = res.data.attributes.data
        })
      } else {
        if (this.$route.path === '/productAdd') {
          this.name = '产品添加'
          this.getCate()
          this.product = {
            weightunit: 'kg'
          }
        }
      }
    },
    getCate () {
      this.$http.get('/rest/api/product/categoryManage').then((res) => {
        this.categoryList = res.data.attributes.categoryList
      })
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    fileChange (text) {
      this.product.attachmentId = text.attId
      this.product.picPath = text.data
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    submit () {
      if (!this.product.name) { return window.alert('产品名称不能为空') }
      if (!this.product.category) { return window.alert('产品分类不能为空') }
      if (!this.product.picPath) { return window.alert('产品图片不能为空') }
      if (this.product.productimageliststore === 'null' || this.product.productimageliststore === null) {
        this.product.productimageliststore = JSON.stringify([{id: this.product.attachmentId, sourceProductImagePath: this.product.picPath}])
      } else {
        this.server_pic_list = JSON.parse(this.product.productimageliststore)
        this.server_pic_list[0].id = this.product.attachmentId
        this.server_pic_list[0].sourceProductImagePath = this.product.picPath
        this.product.productimageliststore = JSON.stringify(this.server_pic_list)
      }
      this.model = {
        name: this.product.name,
        prodtype: this.product.prodtype,
        categoryId: this.product.category,
        picPath: this.product.picPath,
        weight: this.product.weight,
        productimageliststore: this.product.productimageliststore,
        weightunit: this.product.weightunit,
        price: this.product.price,
        marketprice: this.product.marketprice,
        store: this.product.store,
        all: 1
      }
      this.$parent.$refs.loading.showLoading()
      if (this.product.id) {
        this.$http.put('/rest/api/product/detail/' + this.product.id + '?' + qs.stringify(this.model)).then((res) => {
          this.$parent.$refs.loading.hideLoading()
          window.alert('修改成功')
          this.$router.back()
        })
      } else {
        this.$http.post('/rest/api/product/detail', qs.stringify(this.model)).then((res) => {
          this.$parent.$refs.loading.hideLoading()
          window.alert('发布成功')
          this.$router.back()
        })
      }
    }
  }
}
</script>
<style>
#productDetail .wu-text-right{
  width: 80px;
  float: right;
  padding-top: 24px;
  overflow: hidden;
  line-height: 36px;
  display: block;
  color: #999
}
</style>
