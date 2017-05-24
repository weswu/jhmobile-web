<template>
<div>
  <mu-appbar>
    <mu-icon-button icon='arrow_back' @click="back" slot="left"/>
    <div class="play-title">
      <div class="play-name"><span>{{title}}</span></div>
    </div>
  </mu-appbar>
  <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
    更新成功
  </mu-popup>
  <mu-circular-progress :size="50" :strokeWidth="5" style="position: absolute;z-index: 999;left: 50%;margin-left: -25px;top:30%"  v-if="isloading"/>
  <div class="container">
    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab value="1" title="账号注册"/>
      <mu-tab value="2" title="填写备案信息"/>
      <mu-tab value="3" title="完善信息"/>
    </mu-tabs>
    <div class="activeTab">
      <div v-if="activeTab === '1'">
        <div style="color: #f60;">
          <div style="color: #36f;">ICP备案地址<br/>http://icp.sundns.com/login.php</div>
          操作成功后请保存以下信息
        </div>
        <p>
          <mu-text-field label="用户名称" hintText="请输入用户名称" v-model="webinfo.bizicbUsername"/>
          <mu-text-field label="用户邮箱" hintText="请输入用户邮箱" v-model="enterprise.email"/>
          <mu-text-field label="用户密码" hintText="请输入用户密码" v-model="webinfo.bizicbPassword"/>
        </p>
        <p>
          <mu-raised-button label="提交" @click="submit('2')" class="demo-raised-button" secondary fullWidth backgroundColor="#ff6000"/>
        </p>
      </div>

      <div v-if="activeTab === '2'">
        <p>
          <mu-text-field label="网站域名" hintText="请输入网站域名" v-model="bind.address"/>
          <mu-select-field v-model="enterprise.type" :labelFocusClass="['label-foucs']" label="主办单位性质">
            <mu-menu-item v-for="v,index in enterpriseTypeSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
          <mu-select-field v-model="enterprise.certType" :labelFocusClass="['label-foucs']" label="主办单位有效证件类型">
            <mu-menu-item v-for="v,index in enterpriseCertTypeSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
          <mu-text-field label="主办单位有效证件号码" hintText="请输入证件号码" v-model="enterprise.certNumber"/>
        </p>
        <p>
          <mu-raised-button label="提交" @click="submit('3')" class="demo-raised-button" secondary fullWidth backgroundColor="#ff6000"/>
        </p>
      </div>

      <div v-if="activeTab === '3'">
        <p>
          <mu-text-field label="公司名称" hintText="请输入公司名称" v-model="enterprise.name"/>
          <mu-text-field label="公司地址" hintText="请输入公司地址" v-model="enterprise.dist"/>
          <mu-text-field label="营业执照号" hintText="请输入营业执照号" v-model="enterprise.certNumber"/>
          <mu-text-field label="法人姓名" hintText="请输入法人姓名" v-model="enterprise.legalPre"/>
          <mu-text-field label="法人身份证号码" hintText="请输入法人身份证号码" v-model="enterprise.legalPersonIdNumber"/>
          <mu-text-field label="法人手机号码" hintText="请输入法人手机号码" v-model="enterprise.legalPersonCellphone"/>
          <mu-text-field label="网站域名" hintText="请输入网站域名" v-model="bind.address"/>
          <mu-text-field label="邮箱地址" hintText="请输入邮箱地址" v-model="enterprise.email"/>
          <mu-text-field label="电话" hintText="请输入电话" v-model="enterprise.phone"/>
          <mu-text-field label="备案IP" hintText="请输入备案IP" v-model="bind.ip"/>

          <mu-text-field label="营业执照副本彩色照片" hintText="营业执照副本彩色照片" v-model="enterprise.certPic" class="img-upload"/>
          <div @click="uploadImg(1)"">
          <vue-clip :options="options" class="upload-fl" :on-sending="sending" :on-complete="complete"">
            <template slot="clip-uploader-action">
              <div>
                <div class="dz-message"><mu-raised-button label="上传" class="demo-raised-button"/></div>
              </div>
            </template>
          </vue-clip>
          </div>
          <mu-text-field label="法人身份证正反面照片" hintText="法人身份证正反面照片" v-model="enterprise.legalPersonPhoto" class="img-upload"/>
          <div @click="uploadImg(2)"">
          <vue-clip :options="options" class="upload-fl">
            <template slot="clip-uploader-action">
              <div>
                <div class="dz-message"><mu-raised-button label="上传" class="demo-raised-button"/></div>
              </div>
            </template>
          </vue-clip>
          </div>
          <mu-text-field label="负责人身份证正反面照片" hintText="负责人身份证正反面照片" v-model="principal.certReversePic" class="img-upload"/>
          <div @click="uploadImg(3)"">
          <vue-clip :options="options" class="upload-fl">
            <template slot="clip-uploader-action">
              <div>
                <div class="dz-message"><mu-raised-button label="上传" class="demo-raised-button"/></div>
              </div>
            </template>
          </vue-clip>
          </div>
          <mu-text-field label="半身照" hintText="半身照" v-model="enterprise.legalPersonBust" class="img-upload"/>
          <div @click="uploadImg(4)"">
          <vue-clip :options="options" class="upload-fl">
            <template slot="clip-uploader-action">
              <div>
                <div class="dz-message"><mu-raised-button label="上传" class="demo-raised-button dz-message"/></div>
              </div>
            </template>
          </vue-clip>
          </div>
          <div style="color:#999;padding-bottom:10px;clear: both;">
            [注]: 请到指定的地点拍照, <a href="javascript:;" @click="open('bottom')">点击查看拍照地点</a><a href="http://icp.sundns.com/web/a/beianliucheng/2013/0703/134.html" target="_blank" style="color:#999;padding-left: 30px;">其它拍照地点</a><br/>
            其它说明： <a href="http://icp.sundns.com/web/a/ziliaoxiazai/2013/0701/133.html" target="_blank">背景打印</a>，<a href="http://icp.sundns.com/web/a/beianliucheng/2013/0711/137.html" target="_blank">拍照核验要求</a>
          </div>

          <mu-text-field label="核验单" hintText="核验单" v-model="webinfo.checkPic" class="img-upload"/>
          <div @click="uploadImg(5)"">
          <vue-clip :options="options" class="upload-fl">
            <template slot="clip-uploader-action">
              <div>
                <div class="dz-message"><mu-raised-button label="上传" class="demo-raised-button dz-message"/></div>
              </div>
            </template>
          </vue-clip>
          </div>
          <div style="color:#999;padding-bottom:10px;clear: both;">
            说明： <a href="http://icp.sundns.com/web/a/ziliaoxiazai/2010/0706/88.html" target="_blank">核验单要求</a>,<a href="http://cdn.jihui88.com/fujian/jihui/网站备案信息真实性核验单.doc" target="_blank" style="padding-left:5px;color: #999;">核验单模板下载</a>
          </div>

          <mu-text-field label="责任书" hintText="责任书" v-model="webinfo.dutyPic" class="img-upload"/>
          <div @click="uploadImg(6)"">
          <vue-clip :options="options" class="upload-fl">
            <template slot="clip-uploader-action">
              <div>
                <div class="dz-message"><mu-raised-button label="上传" class="demo-raised-button dz-message"/></div>
              </div>
            </template>
          </vue-clip>
          </div>
          <div style="color:#999;padding-bottom:10px;clear: both;">
            <a href="http://cdn.jihui88.com/fujian/jihui/信息安全保障协议责任书.doc" target="_blank" style="padding-left:5px;color: #999;">责任书模板下载</a>
          </div>

          <mu-text-field label="域名证书" hintText="域名证书" v-model="enterprise.domainCertPic" class="img-upload"/>
          <div @click="uploadImg(7)"">
          <vue-clip :options="options" class="upload-fl">
            <template slot="clip-uploader-action">
              <div>
                <div class="dz-message"><mu-raised-button label="上传" class="demo-raised-button dz-message"/></div>
              </div>
            </template>
          </vue-clip>
          </div>
          <div style="color:#999;padding-bottom:10px;clear: both;">
            [注]: 用户只域名注册代理商要，并需要注明，域名所有者需要跟主体公司名一样。以上营业执照、身份证、核验单、责任书、半身照都需要是原件照片，不能是复印件。
          </div>



          <hr style="clear:both;"/>
          <mu-text-field label="相关负责人" hintText="请输入相关负责人" v-model="principal.name" class="principal-inp-left"/>
          <mu-checkbox label="同法人" class="demo-checkbox" v-model="same1"/>
          <mu-text-field label="负责人身份证号码" hintText="请输入负责人身份证号码" v-model="principal.certNumber" class="principal-inp-left"/>
          <mu-checkbox label="同法人" class="demo-checkbox" v-model="same2"/>
          <mu-text-field label="负责人手机号码" hintText="请输入负责人手机号码" v-model="principal.cellphone" class="principal-inp-left"/>
          <mu-checkbox label="同法人" class="demo-checkbox" v-model="same3"/>
        </p>
        <p style="color:#999;font-size:12px">
          等待审核并邮寄。<br/>
          资料提交后，显示的状态是 等待阳光互联核实，等状态变成 真实性核验 状态的时候，需将 营业执照副本复印件、两张盖公章的核验单、两张盖公章的责任书、法人身份证正反面复印件（同一张纸上）、负责人身份证正反面复印件（同一张纸上） 邮寄到 上海市杨浦区国定路323号12楼 有孚网站股份有限公司 客服部收 4007200020。等待阳光互联电话审核（联系负责人）。
        </p>
        <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close('bottom')">
          <mu-appbar title="拍照地点">
            <mu-flat-button slot="right" label="关闭" color="white" @click="close('bottom')"/>
          </mu-appbar>
          <mu-content-block>
            <p>
              东方五金网:<br/>
              永康市总部中心金山大厦21层<br/>
              联系方式：13534934324<br/>
              机汇网:<br/>
              杭州聚光中心C1-205<br/>
              联系方式：0571-324234234
            </p>
            <p>
              来拍照前记得带纸质资料: 营业执照副本复印件(盖公章) + 法人身份证正反面复印件+负责人身份证正反面复印件 + 核验单2份 + 责任书2份。
            </p>
          </mu-content-block>
        </mu-popup>
        <p>
          <mu-raised-button label="提交" @click="submit('3')" class="demo-raised-button" secondary fullWidth backgroundColor="#ff6000"/>
        </p>
      </div>

    </div>

  </div>
</div>
</template>

<style lang="less" scoped>
  @import "../assets/theme.less";
  .view-tabs {
    background-color: #fff;
    color: rgba(0,0,0,.87);
    >.mu-tab-link {
      color: rgba(102,102,102,1);
    }
    >.mu-tab-active{
      color: @primaryColor;
    }
  }
  .demo-popup-top{
    width: 100%;
    opacity: .8;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
  }
  .activeTab{
    padding:10px;
  }
  .mu-text-field{
    width: 100%;
  }
  .principal-inp-left{
    width: 68%;margin-right:3%
  }
  .mu-text-field.mu-select-field{
    width: 50%;
  }
  .img-upload{
    width: 65%;margin-right:3%;    float: left;
  }
  .upload-fl{
    float: left;padding-top: 15px;
  }
</style>
<script>
export default {
  data () {
    return {
      options: {
        url: '/rest/api/album/fileupload',
        paramName: 'Filedata',
        acceptedFiles: 'image/*,application/pdf'
      },
      activeTab: '1',
      isloading: false,
      title: '工商红盾',
      topPopup: false,
      bottomPopup: false,
      same1: false,
      same2: false,
      same3: false,
      upload: 0,
      enterpriseTypeSelect: [
        {text: '军队', value: '04'},
        {text: '政府机关', value: '05'},
        {text: '事业单位', value: '03'},
        {text: '企业', value: '01'},
        {text: '个人', value: '00'},
        {text: '个体经营', value: '02'},
        {text: '社会团体', value: '06'},
        {text: '民办非企业', value: '07'},
        {text: '基金会', value: '08'},
        {text: '律师事务所', value: '09'}
      ],
      enterpriseCertTypeSelect: [
        {text: '统一社会信用代码证', value: '00'},
        {text: '营业执照证书', value: '01'},
        {text: '组织机构代码证', value: '02'},
        {text: '其他', value: '03'}
      ],
      user: {},
      enterprise: {},
      principal: {},
      bind: {},
      webinfo: {},
      emergency: {}
    }
  },
  created () {
    this.get()
  },
  watch: {
    same1: function () {
      if (this.same1) {
        this.principal.name = this.enterprise.legalPre
      }
    },
    same2: function () {
      if (this.same2) {
        this.principal.certNumber = this.enterprise.legalPersonIdNumber
      }
    },
    same3: function () {
      if (this.same3) {
        this.principal.cellphone = this.enterprise.legalPersonCellphone
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    sending (file, xhr, formData) {
      this.isloading = true
    },
    complete (file, status, xhr) {
      this.isloading = false
      if (status === 'success') {
        console.log('data:' + xhr.response)
        if (this.upload === 1) { this.enterprise.certPic = JSON.parse(xhr.response).attributes.data }
        if (this.upload === 2) { this.enterprise.legalPersonPhoto = JSON.parse(xhr.response).attributes.data }
        if (this.upload === 3) { this.principal.certReversePic = JSON.parse(xhr.response).attributes.data }
        if (this.upload === 4) { this.enterprise.legalPersonBust = JSON.parse(xhr.response).attributes.data }
        if (this.upload === 5) { this.webinfo.checkPic = JSON.parse(xhr.response).attributes.data }
        if (this.upload === 6) { this.webinfo.dutyPic = JSON.parse(xhr.response).attributes.data }
        if (this.upload === 7) { this.enterprise.domainCertPic = JSON.parse(xhr.response).attributes.data }
      }
    },
    open (position) {
      this[position + 'Popup'] = true
    },
    close (position) {
      this[position + 'Popup'] = false
    },
    uploadImg: function (val) {
      console.log('upload:' + val)
      this.upload = val
    },
    get () {
      this.$http.get('/rest/api/profile/detail').then((res) => {
        this.user = res.data.attributes.data.user
        this.enterprise = res.data.attributes.data.enterprise
        this.principal = res.data.attributes.data.principal
        this.bind = res.data.attributes.data.bind
        this.webinfo = res.data.attributes.data.webinfo
        this.emergency = res.data.attributes.data.emergency
        if (this.principal.name != null && this.principal.name === this.enterprise.legalPre) {
          this.same1 = true
        }
        if (this.principal.certNumber != null && this.principal.certNumber === this.enterprise.legalPersonIdNumber) {
          this.same2 = true
        }
        if (this.principal.cellphone != null && this.principal.cellphone === this.enterprise.legalPersonCellphone) {
          this.same3 = true
        }
      })
    },
    submit (val) {
      this.$http.post('/rest/api/profile/detail/all', {
        user: this.user,
        enterprise: this.enterprise,
        principal: this.principal,
        bind: this.bind,
        webinfo: this.webinfo,
        emergency: this.emergency
      },
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        this.activeTab = val
        if (val) {
          setTimeout(() => {
            this.topPopup = false
          }, 2000)
        }
        this.principal = res.data.attributes.data.principal
        this.bind = res.data.attributes.data.bind
        this.webinfo = res.data.attributes.data.webinfo
        this.emergency = res.data.attributes.data.emergency
      })
    }
  }
}
</script>
