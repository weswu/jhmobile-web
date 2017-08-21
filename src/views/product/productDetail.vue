<template>
  <div id="productDetail">
    <div class="fixed-bar">
      <mu-appbar :title='name'>
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
    </div>
    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab value="1" title="基本信息"/>
      <mu-tab value="2" title="产品内容"/>
      <mu-tab value="3" title="商城属性"/>
    </mu-tabs>
    <div class='p10 mbfixed' v-if="activeTab === '1'">
      <mu-text-field label='产品名称' hintText='请输入产品名称' v-model='product.name' fullWidth/>
      <mu-select-field v-model='product.category' :labelFocusClass="['label-foucs']" hintText='所属分类' label="产品分类" :maxHeight="300">
        <mu-menu-item v-for='v,index in categoryList' :value='v.categoryId' :title='v.name' />
      </mu-select-field>
      <mu-text-field label='产品型号' hintText='请输入产品型号' v-model='product.prodtype' fullWidth/>
      <p>基本设置：</p>
      <mu-checkbox name="loginView" v-model="loginView" label="登录后可见"/>
      <mu-checkbox name="ads" v-model="ads" label="广告产品" style="margin-left:20px"/>
      <mu-flexbox>
        <mu-flexbox-item class='flex-demo'>
          产品图片：
        </mu-flexbox-item>
        <mu-flexbox-item class='flex-demo'>
          <mu-paper class='demo-paper' :zDepth='2'>
            <img class='avatar' style="width:4.8rem" :src='$store.state.imgUrl + product.picPath' @error='setErrorImg'>
          </mu-paper>
        </mu-flexbox-item>
        <mu-flexbox-item class='flex-demo'>
          <upload :width='300' v-on:result='fileChange'></upload>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
    <div class='p10 mbfixed' v-if="activeTab === '2'">
      <quill-editor ref="myTextEditor"
        v-model="product.proddesc" :config="editorOption">
      </quill-editor>
    </div>
    <div class='p10 mbfixed' v-if="activeTab === '3'">
      <mu-text-field label='商品价格：' hintText='请输入商品价格：' v-model='product.price' type='number' style="width:70%"/><span class="wu-text-right">元</span>
      <mu-text-field label='市场价格' hintText='请输入市场价格' v-model='product.marketprice' type='number' style="width:70%"/><span class="wu-text-right">元</span>
      <mu-text-field label='商品重量' hintText='请输入商品重量' v-model='product.weight' style="width:70%"/>
      <mu-select-field v-model='product.weightunit' :labelFocusClass="['label-foucs']" hintText='请选择' class="wu-text-right">
        <mu-menu-item v-for='v,index in weightunits' :value='v.value' :title='v.name' />
      </mu-select-field>
      <mu-text-field label='剩余库存' hintText='请输入商品库存' v-model='product.store' type='number' style="width:70%"/><span class="wu-text-right">件</span>
      <mu-text-field label='商品积分' hintText='请输入商品积分' v-model='product.point' type='number'/>
      <p>商城设置：</p>
      <mu-checkbox name="isMarketable" v-model="isMarketable" label="上架"/>
      <mu-checkbox name="isNew" v-model="isNew" label="新品" style="margin-left:20px"/>
      <mu-checkbox name="isBest" v-model="isBest" label="精品" style="margin-left:20px"/><br>
      <mu-checkbox name="isHot" v-model="isHot" label="热销"/>
      <mu-checkbox name="isAgent" v-model="isAgent" label="加入分销" style="margin-left:20px"/><br>
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
      categoryList: [],
      product: {
        price: 0,
        marketprice: 0,
        weightunit: 'kg',
        isMarketable: '01',
        store: 999,
        point: 0,
        isNew: '00',
        isBest: '00',
        isHot: '00',
        isAgent: '01'
      },
      loginView: false,
      ads: false,
      // 商城
      isMarketable: true,
      isNew: false,
      isBest: false,
      isHot: false,
      isAgent: true,
      weightunits: [
        {value: 'g', name: '克'},
        {value: 'kg', name: '千克'},
        {value: 't', name: '吨'}
      ],
      editorOption: {}
    }
  },
  created () {
    if (this.$route.params.id) {
      this.name = '产品修改'
      this.get()
    } else {
      this.name = '产品添加'
      this.getCate()
    }
  },
  components: {
    Upload,
    quillEditor
  },
  methods: {
    get () {
      this.$http.get('/rest/api/product/updateList?id=' + this.$route.params.id).then((res) => {
        this.categoryList = res.data.attributes.categoryList
        this.product = res.data.attributes.data
        this.loginView = this.product.loginView === '1' ? true : false
        this.ads = this.product.ads === '1' ? true : false
        // 商城
        this.isMarketable = this.product.isMarketable === '01' ? true : false
        this.isNew = this.product.isNew === '01' ? true : false
        this.isBest = this.product.isBest === '01' ? true : false
        this.isHot = this.product.isHot === '01' ? true : false
        this.isAgent = this.product.isAgent === '01' ? true : false
      })
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
      // if (!this.product.picPath) { return window.alert('产品图片不能为空') }
      if (!this.product.proddesc) { return window.alert('产品内容不能为空') }
      if (this.product.productimageliststore === 'null' || !this.product.productimageliststore) {
        // this.product.productimageliststore = JSON.stringify([{id: this.product.attachmentId, sourceProductImagePath: this.product.picPath}])
      } else {
        this.server_pic_list = JSON.parse(this.product.productimageliststore)
        this.server_pic_list[0].id = this.product.attachmentId
        this.server_pic_list[0].sourceProductImagePath = this.product.picPath
        this.product.productimageliststore = JSON.stringify(this.server_pic_list)
      }
      if (this.loginView) {this.product.loginView = '1'} else {this.product.loginView = '0'}
      if (this.ads) {this.product.ads = '1'} else {this.product.ads = '0'}
      // 商城
      if (this.isMarketable) {this.product.isMarketable = '01'} else {this.product.isMarketable = '00'}
      if (this.isNew) {this.product.isNew = '01'} else {this.product.isNew = '00'}
      if (this.isBest) {this.product.isBest = '01'} else {this.product.isBest = '00'}
      if (this.isHot) {this.product.isHot = '01'} else {this.product.isHot = '00'}
      if (this.isAgent) {this.product.isAgent = '01'} else {this.product.isAgent = '00'}
      this.model = {
        name: this.product.name,
        prodtype: this.product.prodtype,
        categoryId: this.product.category,
        loginView: this.product.loginView,
        ads: this.product.ads,
        picPath: this.product.picPath,
        productimageliststore: this.product.productimageliststore,
        proddesc: this.product.proddesc,
        price: this.product.price,
        marketprice: this.product.marketprice,
        weight: this.product.weight,
        weightunit: this.product.weightunit,
        point: this.product.point,
        store: this.product.store,
        isMarketable: this.product.isMarketable,
        isNew: this.product.isNew,
        isBest: this.product.isBest,
        isHot: this.product.isHot,
        isAgent: this.product.isAgent,
        all: 1
      }
      this.$parent.$refs.loading.show()
      if (this.product.id) {
        this.$http.put('/rest/api/product/detail/' + this.product.id + '?' + qs.stringify(this.model)).then((res) => {
          this.$parent.$refs.loading.hide()
          window.alert('修改成功')
          this.$router.back()
        })
      } else {
        this.$http.post('/rest/api/product/detail', qs.stringify(this.model)).then((res) => {
          this.$parent.$refs.loading.hide()
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
