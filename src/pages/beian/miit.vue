<template>
<div>
  <div class="fixed-bar">
    <mu-appbar title="工信备案">
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
    </mu-appbar>
  </div>

  <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
    <mu-tab value="1" title="账号注册"/>
    <mu-tab value="2" title="填写备案信息"/>
    <mu-tab value="3" title="完善信息"/>
  </mu-tabs>
  <mu-popup position="top" :overlay="false" :open="topPopup" >
    <div class="demo-popup-top">更新成功</div>
  </mu-popup>
  <mu-circular-progress :size="50" :strokeWidth="5" style="position: fixed;z-index: 999;left: 50%;margin-left: -25px;top:30%"  v-if="isloading"/>

  <div class="container p10">
      <div v-if="activeTab === '1'">
        <div style="color: #f60;">
          <div style="color: #36f;">ICP备案地址<br/>http://icp.sundns.com/login.php</div>
          操作成功后请保存以下信息
        </div>

        <p>
          <mu-text-field label="用户名称" hintText="请输入用户名称" v-model="webinfo.bizicbUsername" fullWidth/>
          <mu-text-field label="用户邮箱" hintText="请输入用户邮箱" v-model="enterprise.email" fullWidth/>
          <mu-text-field label="用户密码" hintText="请输入用户密码" v-model="webinfo.bizicbPassword" fullWidth/>
        </p>
        <p>
          <mu-raised-button label="提交" @click="submit('2')" class="demo-raised-button" secondary fullWidth/>
        </p>
      </div>

      <div v-if="activeTab === '2'">
        <p>
          <mu-text-field label="网站域名" hintText="请输入网站域名" v-model="bind.address" fullWidth/>
          <mu-select-field v-model="enterprise.type" :labelFocusClass="['label-foucs']" label="主办单位性质">
            <mu-menu-item v-for="v,index in enterpriseTypeSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
          <mu-select-field v-model="enterprise.certType" :labelFocusClass="['label-foucs']" label="主办单位有效证件类型">
            <mu-menu-item v-for="v,index in enterpriseCertTypeSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
          <mu-text-field label="主办单位有效证件号码" hintText="请输入证件号码" v-model="enterprise.certNumber" fullWidth/>
        </p>
        <p>
          <mu-raised-button label="提交" @click="submit('3')" class="demo-raised-button" secondary fullWidth/>
        </p>
      </div>

      <div v-if="activeTab === '3'">
        <p>
          <mu-text-field label="公司名称" hintText="请输入公司名称" v-model="enterprise.name" fullWidth/>
          <mu-text-field label="公司地址" hintText="请输入公司地址" v-model="enterprise.dist" fullWidth/>
          <mu-text-field label="营业执照号" hintText="请输入营业执照号" v-model="enterprise.certNumber" fullWidth/>
          <mu-text-field label="法人姓名" hintText="请输入法人姓名" v-model="enterprise.legalPre" fullWidth/>
          <mu-text-field label="法人身份证号码" hintText="请输入法人身份证号码" v-model="enterprise.legalPersonIdNumber" fullWidth/>
          <mu-text-field label="法人手机号码" hintText="请输入法人手机号码" v-model="enterprise.legalPersonCellphone" fullWidth/>
          <mu-text-field label="网站域名" hintText="请输入网站域名" v-model="bind.address" fullWidth/>
          <mu-text-field label="邮箱地址" hintText="请输入邮箱地址" v-model="enterprise.email" fullWidth/>
          <mu-text-field label="电话" hintText="请输入电话" v-model="enterprise.phone" fullWidth/>
          <mu-text-field label="备案IP" hintText="请输入备案IP" v-model="bind.ip" fullWidth/>

          <input type="file" accept="image/*" @change="uploadImage($event)" style="display:none" id="uploadImage">
          <mu-text-field label="营业执照副本彩色照片" hintText="营业执照副本彩色照片" v-model="enterprise.certPic" fullWidth class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(1)"/>

          <mu-text-field label="法人身份证正反面照片" hintText="法人身份证正反面照片" v-model="enterprise.legalPersonPhoto" fullWidth class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(2)"/>

          <mu-text-field label="负责人身份证正反面照片" hintText="负责人身份证正反面照片" v-model="principal.certReversePic" fullWidth class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(3)"/>

          <mu-text-field label="半身照" hintText="半身照" v-model="enterprise.legalPersonBust" fullWidth class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(4)"/>

          <div style="color:#999;padding-bottom:10px;clear: both;">
            [注]: 请到指定的地点拍照, <a href="javascript:;" @click="open('bottom')">点击查看拍照地点</a><a href="http://icp.sundns.com/web/a/beianliucheng/2013/0703/134.html" target="_blank" style="color:#999;padding-left: 30px;">其它拍照地点</a><br/>
            其它说明： <a href="http://icp.sundns.com/web/a/ziliaoxiazai/2013/0701/133.html" target="_blank">背景打印</a>，<a href="http://icp.sundns.com/web/a/beianliucheng/2013/0711/137.html" target="_blank">拍照核验要求</a>
          </div>

          <mu-text-field label="核验单" hintText="核验单" v-model="webinfo.checkPic" fullWidth class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(5)"/>

          <div style="color:#999;padding-bottom:10px;clear: both;">
            说明： <a href="http://icp.sundns.com/web/a/ziliaoxiazai/2010/0706/88.html" target="_blank">核验单要求</a>,<a href="http://cdn.jihui88.com/fujian/jihui/网站备案信息真实性核验单.doc" target="_blank" style="padding-left:5px;color: #999;">核验单模板下载</a>
          </div>

          <mu-text-field label="责任书" hintText="责任书" v-model="webinfo.dutyPic" fullWidth class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(6)"/>

          <div style="color:#999;padding-bottom:10px;clear: both;">
            <a href="http://cdn.jihui88.com/fujian/jihui/信息安全保障协议责任书.doc" target="_blank" style="padding-left:5px;color: #999;">责任书模板下载</a>
          </div>

          <mu-text-field label="域名证书" hintText="域名证书" v-model="enterprise.domainCertPic" fullWidth class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(7)"/>

          <div style="color:#999;padding-bottom:10px;clear: both;">
            [注]: 用户只域名注册代理商要，并需要注明，域名所有者需要跟主体公司名一样。以上营业执照、身份证、核验单、责任书、半身照都需要是原件照片，不能是复印件。
          </div>



          <hr style="clear:both;"/>
          <mu-text-field label="相关负责人" hintText="请输入相关负责人" v-model="principal.name" fullWidth class="principal-inp-left"/>
          <mu-checkbox label="同法人" class="demo-checkbox" v-model="same1"/>
          <mu-text-field label="负责人身份证号码" hintText="请输入负责人身份证号码" v-model="principal.certNumber" fullWidth class="principal-inp-left"/>
          <mu-checkbox label="同法人" class="demo-checkbox" v-model="same2"/>
          <mu-text-field label="负责人手机号码" hintText="请输入负责人手机号码" v-model="principal.cellphone" fullWidth class="principal-inp-left"/>
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
          <mu-raised-button label="提交" @click="submit('3')" class="demo-raised-button" secondary fullWidth/>
        </p>
      </div>


  </div>
</div>
</template>

<style lang="less" scoped>
  .demo-popup-top{
    width: 100%;
    opacity: .8;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
    padding: 0 30px;
  }
  .principal-inp-left{
    width: 68%;margin-right:3%
  }
  .img-upload{
    width: 65%;margin-right:3%;    float: left;
  }
  .upload-fl{
    float: left;margin-top: 15px;
  }
</style>
<script>
import lrz from 'lrz'
export default {
  data () {
    return {
      activeTab: '1',
      isloading: false,
      topPopup: false,
      bottomPopup: false,
      dialog: false,
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
      this.$router.back()
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    uploadImage (e) {
      let _this = this
      lrz(e.target.files[0], {width: 800, fieldName: 'Filedata'})
        .then(function (rst) {
          /* ==================================================== */
          // 原生ajax上传代码，所以看起来特别多 ╮(╯_╰)╭，但绝对能用
          // 其他框架，例如jQuery处理formData略有不同，请自行google，baidu。
          let xhr = new XMLHttpRequest()
          xhr.open('POST', '/rest/api/album/fileupload')
          xhr.onload = function () {
            _this.isloading = false
            if (xhr.status === 200) {
              // 上传成功
              if (_this.upload === 1) { _this.enterprise.certPic = JSON.parse(xhr.response).attributes.data }
              if (_this.upload === 2) { _this.enterprise.legalPersonPhoto = JSON.parse(xhr.response).attributes.data }
              if (_this.upload === 3) { _this.principal.certReversePic = JSON.parse(xhr.response).attributes.data }
              if (_this.upload === 4) { _this.enterprise.legalPersonBust = JSON.parse(xhr.response).attributes.data }
              if (_this.upload === 5) { _this.webinfo.checkPic = JSON.parse(xhr.response).attributes.data }
              if (_this.upload === 6) { _this.webinfo.dutyPic = JSON.parse(xhr.response).attributes.data }
              if (_this.upload === 7) { _this.enterprise.domainCertPic = JSON.parse(xhr.response).attributes.data }
            } else {
              // 处理其他情况
            }
          }
          xhr.onerror = function () {
            // 处理错误
            _this.isloading = false
          }
          xhr.upload.onprogress = function (e) {
            // 上传进度
            _this.isloading = true
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
    },
    open (position) {
      this[position + 'Popup'] = true
    },
    close (position) {
      this[position + 'Popup'] = false
    },
    uploadImg: function (val) {
      this.upload = val
      document.querySelector('#uploadImage').click()
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
        document.body.scrollTop = 0
        if (val) {
          this.topPopup = true
          setTimeout(() => {
            this.topPopup = false
          }, 2000)
        }
        this.principal.principalId = res.data.attributes.data.principal.principalId
        this.bind.bindId = res.data.attributes.data.bind.bindId
        this.webinfo.webinfoId = res.data.attributes.data.webinfo.webinfoId
        this.emergency.principalId = res.data.attributes.data.emergency.principalId
      })
    }
  }
}
</script>
