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
        <mu-menu-item v-for='v,index in categoryList' :value='v.categoryId' :title='v.cdesc' />
      </mu-select-field>
      <mu-text-field label='产品型号' hintText='请输入产品型号' v-model='product.prodtype' fullWidth/>
      <p>基本设置：</p>
      <mu-checkbox name="loginView" v-model="loginView" label="登录后可见"/>
      <mu-checkbox name="ads" v-model="ads" label="广告产品" style="margin-left:20px"/>
      <p style="padding-top:10px">产品图片：</p>
      <div class="Pu-img">
        <span v-for="value,index of imgArr">
           <a href="javascript:;" @click="uploadImg(index)">
             <img :src="$store.state.imgUrl + value.sourceProductImagePath" alt="img" @error='setErrorImg'>
             <mu-icon-button icon='close' @click.stop='remove(index)' class="imgRemove"/>
           </a>
        </span>
        <a href="javascript:;" class="Pu-Add-img">
          <div class="addImg">+</div>
          <input type="file" accept="image/*" @change="addImg($event)" id="uploadImg">
        </a>
      </div>
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
import lrz from 'lrz'
import qs from 'qs'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      name: '',
      activeTab: '1',
      categoryList: this.$store.state.productCategoryList,
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
      imgArr: [], //多图
      imgArrIndex: '',
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
    }
    this.getCate()
  },
  components: {
    quillEditor
  },
  methods: {
    get () {
      this.$http.get('/rest/api/product/detail/' + this.$route.params.id).then((res) => {
        this.product = res.data.attributes.data
        this.loginView = this.product.loginView === '1' ? true : false
        this.ads = this.product.ads === '1' ? true : false
        this.imgArr = JSON.parse(this.product.productimageliststore) || []
        // 商城
        this.isMarketable = this.product.isMarketable === '01' ? true : false
        this.isNew = this.product.isNew === '01' ? true : false
        this.isBest = this.product.isBest === '01' ? true : false
        this.isHot = this.product.isHot === '01' ? true : false
        this.isAgent = this.product.isAgent === '01' ? true : false
      })
    },
    getCate () {
      if (this.categoryList.length === 0)
      this.$http.get('/rest/api/product/categoryManage').then((res) => {
        this.categoryList = res.data.attributes.data
        this.$store.commit('setProductCategoryList', this.categoryList)
      })
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    submit () {
      if (!this.product.name) { return window.alert('产品名称不能为空') }
      if (!this.product.category) { return window.alert('产品分类不能为空') }
      if (this.imgArr.length === 0) { return window.alert('产品图片不能为空') }
      if (!this.product.proddesc) { return window.alert('产品内容不能为空') }
      this.product.productimageliststore = JSON.stringify(this.imgArr)
      this.product.picPath = this.imgArr[0].sourceProductImagePath
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
    },
    remove (val) {
      if (this.imgArr.length === 1) return
      this.imgArr.splice(val, 1)
    },
    uploadImg (val) {
      console.log('uploadImg:' + val)
      this.imgArrIndex = val
      document.querySelector('#uploadImg').click()
    },
    addImg (e) {
      let ctx = this
      lrz(e.target.files[0], {width: 500, fieldName: 'Filedata'})
        .then(function (rst) {
          /* ==================================================== */
          // 原生ajax上传代码，所以看起来特别多 ╮(╯_╰)╭，但绝对能用
          // 其他框架，例如jQuery处理formData略有不同，请自行google，baidu。
          let xhr = new XMLHttpRequest()
          xhr.open('POST', '/rest/api/album/fileupload')
          xhr.onload = function () {
            ctx.$parent.$refs.loading.hide()
            if (xhr.status === 200) {
              // 上传成功
              var text =JSON.parse(xhr.response).attributes
              debugger
              if (ctx.imgArrIndex === ''){
                ctx.imgArr.push({id: text.attId, sourceProductImagePath: text.data, 'type': 'pertain_pic'})
              } else {
                var type = 'pertain_pic'
                if (ctx.imgArrIndex === 0) {type = 'main_pic'}
                ctx.imgArr.splice(ctx.imgArrIndex, 1, {id: text.attId, sourceProductImagePath: text.data, 'type': type})
              }
              ctx.imgArrIndex = ''
            } else {
              // 处理其他情况
            }
          }
          xhr.onerror = function () {
            // 处理错误
            ctx.$parent.$refs.loading.hide()
          }
          xhr.upload.onprogress = function (e) {
            // 上传进度
            ctx.$parent.$refs.loading.show()
            // var percentComplete = ((e.loaded / e.total) || 0) * 100
          }
          // 添加参数
          rst.formData.append('fileLen', rst.fileLen)
          // 触发上传
          xhr.send(rst.formData)
          /* ==================================================== */
          return rst
        })
        .catch(function (err) {
          console.log(err)
          // 处理失败会执行
        })
        .always(function () {
          // 不管是成功失败，都会执行
        })
    }
  }
}
</script>
<style lang="less">
#productDetail .wu-text-right{
  width: 80px;
  float: right;
  padding-top: 24px;
  overflow: hidden;
  line-height: 36px;
  display: block;
  color: #999
}
.Pu-img {
  margin: 0.5rem 0px;
  overflow: hidden;
  .Pu-Add-img input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
  }
  a {
    position: relative;
    display: inline-block;
    width: 4rem;
    height: 4rem;
    overflow: hidden;
    float: left;
    margin: 0 1.9% .4rem 1.9%;
    .addImg {
      width: 3.888rem;
      height: 3.9rem;
      text-align: center;
      line-height: 3.3rem;
      font-size: 3.5rem;
      color: #ff6214;
      border: 1px solid #c7c7c7;
    }
    img {
      height: 4rem
    }
  }
  .imgRemove {
    position: absolute;
    top: 0;
    right: 0;
    width: 28px;
    height: 28px;
    padding: 0;
    background: rgba(0,0,0,.5);
    color: #fff
  }
  .mu-icon {
    font-size: 18px;
  }
}
</style>
