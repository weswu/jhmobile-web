<template>
<div id="beian">
  <div class="fixed-bar">
    <mu-appbar title="公安备案">
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
    </mu-appbar>
  </div>
  <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
    <mu-tab value="1" title="账号信息"/>
    <mu-tab value="2" title="填写开办主体"/>
    <mu-tab value="3" title="网站基本信息"/>
    <mu-tab value="4" title="网站负责人信息"/>
    <mu-tab value="5" title="截图并邮寄"/>
  </mu-tabs>

    <div class="p10">
      <div v-if="activeTab === '1'">
        <div>
        <div style="color: #f60;">【注】在PC上注册账号http://beian.gov.cn/user/registerurl</div>
          操作成功后请保存以下信息
        </div>
        <mu-text-field label="用户名" hintText="请输入用户名" v-model="webinfo.securityUsername" fullWidth/>
        <mu-text-field label="密码" hintText="请输入密码" v-model="webinfo.securityPassword" fullWidth/>
        <mu-text-field label="邮箱" hintText="请输入邮箱" type="email" v-model="enterprise.email" fullWidth/>
        <mu-text-field label="手机号码" hintText="请输入手机号码" v-model="principal.cellphone" fullWidth/>
        <mu-raised-button label="确定" @click="submit('2')" class="demo-raised-button" secondary fullWidth/>
      </div>

      <div v-if="activeTab === '2'">
        <p>
          <mu-select-field v-model="enterprise.certType" :labelFocusClass="['label-foucs']" label="开办主体性质">
            <mu-menu-item v-for="v,index in enterpriseCertTypeSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
        </p>
        <h3>主办单位信息</h3>
        <p>
          <mu-text-field label="主办单位名称" hintText="请输入主办单位名称" v-model="enterprise.name" fullWidth/>
          <mu-select-field v-model="enterprise.type" :labelFocusClass="['label-foucs']" label="主办单位证件类型">
            <mu-menu-item v-for="v,index in enterpriseTypeSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
          <mu-text-field label="主办单位证件号" hintText="请输入主办单位证件号" v-model="enterprise.certNumber" fullWidth/>

          <input type="file" accept="image/*" @change="uploadImage($event)" style="display:none" id="uploadImage">
          <mu-text-field label="主办单位有效证件" hintText="主办单位有效证件" v-model="enterprise.certPic" class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(1)"/>

          <mu-text-field label="法人代表人姓名" hintText="请输入法人代表人姓名" v-model="enterprise.legalPre" fullWidth/>
          单位办公地址<br>
          <span v-model="citySelect.ent"></span><span v-model="countySelect.ent"></span>
          <mu-select-field v-model="address.ent1" :labelFocusClass="['label-foucs']" label="省" @input="provinceChange(1)" :maxHeight="300" style="width:30%">
            <mu-menu-item v-for="v,index in provinceSelect" :value="v.path" :title="v.name"/>
          </mu-select-field>
          <mu-select-field v-model="address.ent2" :labelFocusClass="['label-foucs']" label="市" @input="cityChange(1)" :maxHeight="300" style="width:30%;margin-left:3.5%">
            <mu-menu-item v-for="v,index in citySelect.ent" :value="v.id" :title="v.name" />
          </mu-select-field>
          <mu-select-field v-model="address.ent3" :labelFocusClass="['label-foucs']" label="县" @input="countChange(1)" :maxHeight="300" style="width:30%;margin-left:3.5%">
            <mu-menu-item v-for="v,index in countySelect.ent" :value="v.id" :title="v.name" />
          </mu-select-field>
          <mu-text-field label="详细地址" hintText="请输入详细地址" v-model="enterprise.dist" fullWidth/>

        </p>
        <h3>负责人信息</h3>
        <p>
          <mu-text-field label="负责人姓名" hintText="请输入负责人姓名" v-model="principal.name" fullWidth/>
          <mu-select-field v-model="principal.certType" :labelFocusClass="['label-foucs']" label="负责人证件类型">
            <mu-menu-item v-for="v,index in enterpriseTypeSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
          <mu-text-field label="负责人证件号码" hintText="请输入负责人证件号码" v-model="principal.certNumber" fullWidth/>

          证件有效期：<br/>
          <mu-date-picker hintText="证件有效期" v-model="principal.certIndate"/>

          <mu-text-field label="负责人证件(正面)" hintText="负责人证件(正面)" v-model="principal.certFrontPic" class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(2)"/>

          <mu-text-field label="负责人证件(反面)" hintText="负责人证件(反面)" v-model="principal.certReversePic" class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(3)"/>

          <mu-text-field label="负责人证件(手持)" hintText="负责人证件(手持)" v-model="principal.certHandPic" class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(4)"/>

          <br style="clear:both"/>
          负责人常住地址<br>
          <span v-model="citySelect.pri"></span><span v-model="countySelect.pri"></span>
          <mu-select-field v-model="address.pri1" :labelFocusClass="['label-foucs']" label="省" @input="provinceChange(2)" :maxHeight="300" style="width:30%">
            <mu-menu-item v-for="v,index in provinceSelect" :value="v.path" :title="v.name"/>
          </mu-select-field>
          <mu-select-field v-model="address.pri2" :labelFocusClass="['label-foucs']" label="市" @input="cityChange(2)" :maxHeight="300" style="width:30%;margin-left:3.5%">
            <mu-menu-item v-for="v,index in citySelect.pri" :value="v.id" :title="v.name" />
          </mu-select-field>
          <mu-select-field v-model="address.pri3" :labelFocusClass="['label-foucs']" label="县" @input="countChange(2)" :maxHeight="300" style="width:30%;margin-left:3.5%">
            <mu-menu-item v-for="v,index in countySelect.pri" :value="v.id" :title="v.name" />
          </mu-select-field>
          <mu-text-field label="详细地址" hintText="请输入详细地址" v-model="principal.address" fullWidth/>

          <mu-text-field label="办公室电话" hintText="请输入办公室电话" v-model="principal.phone" fullWidth/>
          <mu-text-field label="手机号码" hintText="请输入手机号码" v-model="principal.cellphone" fullWidth/>
          <mu-text-field label="负责人邮箱" hintText="请输入负责人邮箱" v-model="principal.email" fullWidth/>
        </p>
        <p>
          <mu-raised-button label="确定" @click="submit('3')" class="demo-raised-button" secondary fullWidth/>
        </p>
      </div>

      <div v-if="activeTab === '3'">
        <h3>网站信息</h3>
        <p>
          <mu-text-field label="网站名称" hintText="请输入网站名称" v-model="enterprise.name" fullWidth/>
          <mu-select-field v-model="principal.isIcp" :labelFocusClass="['label-foucs']" label="是否有工信部备案号">
            <mu-menu-item v-for="v,index in isIcpSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
          <mu-text-field label="工信部备案号" hintText="请输入工信部备案号" v-model="bind.icp" fullWidth/>
          网站开通时期<br/>
          <mu-date-picker hintText="网站开通时期" v-model="bind.applyTime"/>
          <mu-text-field label="主域名" hintText="请输入主域名" v-model="bind.address" fullWidth/>
          <mu-text-field label="域名证书" hintText="域名证书" v-model="enterprise.domainCertPic" class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(5)"/>

          <mu-text-field label="IP" hintText="请输入IP" v-model="bind.ip" fullWidth/>
        </p>
        <h3>网站接入服务商</h3>
        <p>
          <mu-select-field v-model="webinfo.ispBound" :labelFocusClass="['label-foucs']" label="接入商所属地区管辖">
            <mu-menu-item v-for="v,index in webinfoIspBoundSelect" :value="v.value" :title="v.text" />
          </mu-select-field>

          <br style="clear:both"/>
          接入商所属区域<br>
          <span v-model="citySelect.isp"></span><span v-model="countySelect.isp"></span>
          <mu-select-field v-model="address.isp1" :labelFocusClass="['label-foucs']" label="省" @input="provinceChange(3)" :maxHeight="300" style="width:30%">
            <mu-menu-item v-for="v,index in provinceSelect" :value="v.path" :title="v.name"/>
          </mu-select-field>
          <mu-select-field v-model="address.isp2" :labelFocusClass="['label-foucs']" label="市" @input="cityChange(3)" :maxHeight="300" style="width:30%;margin-left:3.5%">
            <mu-menu-item v-for="v,index in citySelect.isp" :value="v.id" :title="v.name" />
          </mu-select-field>
          <mu-select-field v-model="address.isp3" :labelFocusClass="['label-foucs']" label="县" @input="countChange(3)" :maxHeight="300" style="width:30%;margin-left:3.5%">
            <mu-menu-item v-for="v,index in countySelect.isp" :value="v.id" :title="v.name" />
          </mu-select-field>

          <mu-select-field v-model="webinfo.ispName" :labelFocusClass="['label-foucs']" label="名称">
            <mu-menu-item v-for="v,index in webinfoIspNameSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
          <mu-select-field v-model="webinfo.ispType" :labelFocusClass="['label-foucs']" label="网站接入方式">
            <mu-menu-item v-for="v,index in webinfoIspTypeSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
        </p>
        <h3>域名注册服务商</h3>
        <p>
          <mu-select-field v-model="webinfo.domainBound" :labelFocusClass="['label-foucs']" label="接入商所属地区管辖">
            <mu-menu-item v-for="v,index in webinfoDomainBoundSelect" :value="v.value" :title="v.text" />
          </mu-select-field>

          <br style="clear:both"/>
          域名服务商所属区域<br>
          <span v-model="citySelect.dom"></span><span v-model="countySelect.dom"></span>
          <mu-select-field v-model="address.dom1" :labelFocusClass="['label-foucs']" label="省" @input="provinceChange(4)" :maxHeight="300" style="width:30%">
            <mu-menu-item v-for="v,index in provinceSelect" :value="v.path" :title="v.name"/>
          </mu-select-field>
          <mu-select-field v-model="address.dom2" :labelFocusClass="['label-foucs']" label="市" @input="cityChange(4)" :maxHeight="300" style="width:30%;margin-left:3.5%">
            <mu-menu-item v-for="v,index in citySelect.dom" :value="v.id" :title="v.name" />
          </mu-select-field>
          <mu-select-field v-model="address.dom3" :labelFocusClass="['label-foucs']" label="县" @input="countChange(4)" :maxHeight="300" style="width:30%;margin-left:3.5%">
            <mu-menu-item v-for="v,index in countySelect.dom" :value="v.id" :title="v.name" />
          </mu-select-field>

          <mu-select-field v-model="webinfo.domainName" :labelFocusClass="['label-foucs']" label="名称">
            <mu-menu-item v-for="v,index in webinfoDomainNameSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
        </p>
        <h3>服务类型</h3>
        <p>
            供互联网交互服务 <a style="font-size: 12px;padding-left: 10px;" href="javascript:;"  @click="open('bottom')">什么是交互式服务？</a>
        </p>
        <p>
          <mu-radio name="siteServiceType" nativeValue="00" v-model="enterprise.siteServiceType" label="www服务" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="01" v-model="enterprise.siteServiceType" label="wap服务" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="02" v-model="enterprise.siteServiceType" label="博客个人空间" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="03" v-model="enterprise.siteServiceType" label="论坛BBS" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="04" v-model="enterprise.siteServiceType" label="聊天室" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="05" v-model="enterprise.siteServiceType" label="社交网站" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="06" v-model="enterprise.siteServiceType" label="电子邮件" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="07" v-model="enterprise.siteServiceType" label="即时通讯" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="08" v-model="enterprise.siteServiceType" label="搜索引擎" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="09" v-model="enterprise.siteServiceType" label="网络新闻" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="10" v-model="enterprise.siteServiceType" label="网络音乐" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="11" v-model="enterprise.siteServiceType" label="网络文字" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="12" v-model="enterprise.siteServiceType" label="网络音视频" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="13" v-model="enterprise.siteServiceType" label="网络游戏" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="14" v-model="enterprise.siteServiceType" label="网络下载" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="15" v-model="enterprise.siteServiceType" label="app服务" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="16" v-model="enterprise.siteServiceType" label="云计算" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="17" v-model="enterprise.siteServiceType" label="供求信息发布" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="18" v-model="enterprise.siteServiceType" label="旅游预订" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="19" v-model="enterprise.siteServiceType" label="移动应用商店" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="20" v-model="enterprise.siteServiceType" label="第三方支付" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="21" v-model="enterprise.siteServiceType" label="网上银行" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="22" v-model="enterprise.siteServiceType" label="财经服务" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="23" v-model="enterprise.siteServiceType" label="网络购物" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="24" v-model="enterprise.siteServiceType" label="云存储" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="25" v-model="enterprise.siteServiceType" label="FTP下载" class="demo-radio"/>
          <mu-radio name="siteServiceType" nativeValue="26" v-model="enterprise.siteServiceType" label="P2P金融" class="demo-radio"/>
          <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close('bottom')">
          <mu-appbar title="交互式服务">
            <mu-flat-button slot="right" label="关闭" color="white" @click="close('bottom')"/>
            </mu-appbar>
            <mu-content-block>
              <p>
                交互式服务，是指为用户提供向社会公众发布文字、图片、音视频服等信息的服务，包括但不限于论坛、社区、贴吧、文字、或者音视频聊天室、微博客、博客、即时通信、分享存储、第三方支付、移动应用商店等互联网信息服务。
              </p>
            </mu-content-block>
          </mu-popup>
        </p>

        <h3>互联网危险品信息发布 <a style="font-size: 12px;padding-left: 10px;" href="http://beian.gov.cn/portal/topicDetail?id=37" target="_blank">什么是危险物品？</a></h3>
        <p>
            供涉及管制物品信息发布服务:
        </p>
        <mu-radio name="gzwpPublishServer" nativeValue="01" v-model="webinfo.gzwpPublishServer" label="管制器具" class="demo-radio"/>
        <mu-radio name="gzwpPublishServer" nativeValue="02" v-model="webinfo.gzwpPublishServer" label="警用装备" class="demo-radio"/>
        <mu-radio name="gzwpPublishServer" nativeValue="03" v-model="webinfo.gzwpPublishServer" label="放射性物品" class="demo-radio"/>
        <mu-radio name="gzwpPublishServer" nativeValue="04" v-model="webinfo.gzwpPublishServer" label="枪支弹药" class="demo-radio"/>
        <mu-radio name="gzwpPublishServer" nativeValue="05" v-model="webinfo.gzwpPublishServer" label="民爆物品" class="demo-radio"/>
        <mu-radio name="gzwpPublishServer" nativeValue="06" v-model="webinfo.gzwpPublishServer" label="剧毒化学物" class="demo-radio"/>
        <mu-radio name="gzwpPublishServer" nativeValue="07" v-model="webinfo.gzwpPublishServer" label="易制爆危险化学品" class="demo-radio"/>

        <h3>相关前置
          <a style="font-size: 12px;padding-left: 10px;" href="http://baike.baidu.com/link?url=cD-lfS01za3lE4QqfGwKcGu6t1BgBwhnUr_gHcDksP-M43kwa2CniKfk94mAKj4iSZV5JbDm1fs4TyZh1CZ4tK" target="_blank">什么是相关前置许可？</a>
        </h3>
        <mu-radio name="advanceLicense" nativeValue="01" v-model="webinfo.advanceLicense" label="新闻" class="demo-radio"/>
        <mu-radio name="advanceLicense" nativeValue="02" v-model="webinfo.advanceLicense" label="出版" class="demo-radio"/>
        <mu-radio name="advanceLicense" nativeValue="03" v-model="webinfo.advanceLicense" label="教育" class="demo-radio"/>
        <mu-radio name="advanceLicense" nativeValue="04" v-model="webinfo.advanceLicense" label="运动保健" class="demo-radio"/>
        <mu-radio name="advanceLicense" nativeValue="05" v-model="webinfo.advanceLicense" label="医疗保健" class="demo-radio"/>
        <mu-radio name="advanceLicense" nativeValue="06" v-model="webinfo.advanceLicense" label="其他" class="demo-radio"/>

        <h3>网站语种
          <span style="font-size: 12px;padding-left: 10px;font-weight: normal;">（含全部或部分使用的方言种类）</span>
        </h3>
        <mu-radio name="lan" nativeValue="01" v-model="webinfo.lan" label="英语" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="02" v-model="webinfo.lan" label="法语" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="03" v-model="webinfo.lan" label="俄语" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="04" v-model="webinfo.lan" label="西班牙语" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="05" v-model="webinfo.lan" label="中文简体" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="06" v-model="webinfo.lan" label="中文繁体" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="07" v-model="webinfo.lan" label="维吾尔语" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="08" v-model="webinfo.lan" label="哈萨克语" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="09" v-model="webinfo.lan" label="蒙古语" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="10" v-model="webinfo.lan" label="藏语" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="11" v-model="webinfo.lan" label="阿拉伯语" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="12" v-model="webinfo.lan" label="朝鲜语" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="13" v-model="webinfo.lan" label="日语" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="14" v-model="webinfo.lan" label="德语" class="demo-radio"/>
        <mu-radio name="lan" nativeValue="15" v-model="webinfo.lan" label="其他" class="demo-radio"/>

        <p>
          <mu-raised-button label="确定" @click="submit('4')" class="demo-raised-button" secondary fullWidth/>
        </p>
      </div>

      <div v-if="activeTab === '4'">
        <h3>网站安全负责人信息
          <span style="font-size: 12px;padding-left: 10px;font-weight: normal;">同主体负责人信息</span>
        </h3>
        <p>
          <mu-text-field label="负责人姓名" hintText="请输入负责人姓名" v-model="principal.name" fullWidth/>
          <mu-select-field v-model="principal.certType" :labelFocusClass="['label-foucs']" label="负责人证件类型">
            <mu-menu-item v-for="v,index in certTypeSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
          <mu-text-field label="负责人证件号码" hintText="请输入负责人证件号码" v-model="principal.certNumber" fullWidth/>
          证件有效期<br/>
          <mu-date-picker hintText="证件有效期" v-model="principal.certIndate"/>

          <mu-text-field label="负责人证件(正面)" hintText="负责人证件(正面)" v-model="principal.certFrontPic" class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(2)"/>

          <mu-text-field label="负责人证件(反面)" hintText="负责人证件(反面)" v-model="principal.certReversePic" class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(3)"/>

          <mu-text-field label="负责人证件(手持)" hintText="负责人证件(手持)" v-model="principal.certHandPic" class="img-upload"/>
          <mu-raised-button label="上传" class="demo-raised-button upload-fl" @click="uploadImg(4)"/>


          <mu-text-field label="手机号码" hintText="请输入手机号码" v-model="principal.cellphone" fullWidth/>
          <mu-text-field label="电子邮件地址" hintText="请输入电子邮件地址" v-model="principal.email" fullWidth/>
        </p>
        <h3>网站应急联络人
          <mu-checkbox label="同主体负责人信息" class="demo-checkbox" v-model="same" style="font-size: 12px;padding-left: 10px;font-weight: normal;"/>
        </h3>
        <p>
          <mu-text-field label="联络人姓名" hintText="请输入联络人姓名" v-model="emergency.name" fullWidth/>
          <mu-select-field v-model="emergency.certType" :labelFocusClass="['label-foucs']" label="联络人证件类型">
            <mu-menu-item v-for="v,index in certTypeSelect" :value="v.value" :title="v.text" />
          </mu-select-field>
          <mu-text-field label="联络人证件号码" hintText="请输入联络人证件号码" v-model="emergency.certNumber" fullWidth/>
          证件有效期<br/>
          <mu-date-picker hintText="证件有效期" v-model="emergency.certIndate"/>
        </p>
        <p>
          <mu-raised-button label="确定" @click="submit('5')" class="demo-raised-button" secondary fullWidth/>
        </p>
      </div>

      <div v-if="activeTab === '5'">
        <p>审核通过后。在<a href="http://www.beian.gov.cn/portal/recordQuery" target="_blank">http://www.beian.gov.cn/portal/recordQuery</a>
          上将查出来的结果截图，并将截图发送到有孚邮箱（beian@sundns.com）。
        </p>
        <div>示例：</div>
        <img style="width: 100%;" src="http://img.jihui88.com/upload/j/j2/jihui88/picture/2016/12/02/b4ed099e-95ad-4fcd-a1ee-77ce6a0a2843.png" alt="websie_record_infot.png">
        <mu-text-field label="备案链接地址" hintText="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=XXX" v-model="enterprise.psr" fullWidth/>
        <mu-text-field label="公安备案号" hintText="浙公安备 33072301100001号" v-model="webinfo.seccurityLink" fullWidth/>
        <p>
          <mu-raised-button label="确定" @click="submit('5')" class="demo-raised-button" secondary fullWidth/>
        </p>
      </div>

  </div>
</div>
</template>

<style lang="less" scoped>
  .img-upload{
    width: 65%;margin-right:3%;    float: left;
  }
  .upload-fl{
    float: left;margin-top: 15px;
  }
</style>
<script>
const provinceList = [
  {
    name: '北京',
    path: '402881882ba8753a012ba8bf474d001c'
  },
  {
    name: '天津',
    path: '402881882ba8753a012ba8c389a2002f'
  },
  {
    name: '河北省',
    path: '402881882ba8753a012ba8c689d30042'
  },
  {
    name: '山西省',
    path: '402881882ba8753a012ba8c8f0b1004e'
  },
  {
    name: '内蒙古自治区',
    path: '402881882ba8753a012ba8cb1bbf005a'
  },
  {
    name: '辽宁省',
    path: '402881882ba8753a012ba8cd6a230067'
  },
  {
    name: '吉林省',
    path: '402881882ba8753a012ba8d010f90076'
  },
  {
    name: '黑龙江省',
    path: '402881882ba8753a012ba8d1b0310080'
  },
  {
    name: '上海市',
    path: '402881882ba8753a012ba8d3f4f1008e'
  },
  {
    name: '江苏省',
    path: '402881882ba8753a012ba8d780a800a2'
  },
  {
    name: '浙江省',
    path: '402881882ba8753a012ba8da48e000b0'
  },
  {
    name: '安徽省',
    path: '402881882ba8753a012ba8dc469500bc'
  },
  {
    name: '福建省',
    path: '402881882ba8753a012ba8e0243500ce'
  },
  {
    name: '江西省',
    path: '402881882ba8753a012ba8e362b600d8'
  },
  {
    name: '山东省',
    path: '402881882ba8753a012ba8e5f7d800e4'
  },
  {
    name: '河南省',
    path: '402881882ba8753a012ba92ba9c300f6'
  },
  {
    name: '湖北省',
    path: '402881882ba8753a012ba92e37a20108'
  },
  {
    name: '湖南省',
    path: '402881882ba8753a012ba930d6690115'
  },
  {
    name: '广东省',
    path: '402881882ba8753a012ba9342b210124'
  },
  {
    name: '广西壮族自治区',
    path: '402881882ba8753a012ba9376770013a'
  },
  {
    name: '海南省',
    path: '402881882ba8753a012ba939ac010149'
  },
  {
    name: '重庆市',
    path: '402881882ba8753a012ba93a6743014c'
  },
  {
    name: '四川省',
    path: '402881882ba8753a012ba93d95780160'
  },
  {
    name: '贵州省',
    path: '402881882ba8753a012ba940dad00173'
  },
  {
    name: '云南省',
    path: '402881882ba8753a012ba942d1dd017a'
  },
  {
    name: '西藏自治区',
    path: '402881882ba8753a012ba94474040183'
  },
  {
    name: '陕西省',
    path: '402881882ba8753a012ba945a63a018b'
  },
  {
    name: '甘肃省',
    path: '402881882ba8753a012ba94704c10196'
  },
  {
    name: '青海省',
    path: '402881882ba8753a012ba949336801a4'
  },
  {
    name: '宁夏回族自治区',
    path: '402881882ba8753a012ba94a847201ac'
  },
  {
    name: '新疆维吾尔自治区',
    path: '402881882ba8753a012ba94b61c201b2'
  },
  {
    name: '台湾省',
    path: '402881882ba8753a012ba94dc00501bd'
  },
  {
    name: '香港特别行政区',
    path: '402881882ba8753a012ba94de66901be'
  },
  {
    name: '澳门特别行政区',
    path: '402881882ba8753a012ba94e039601bf'
  }
]
import lrz from 'lrz'
export default {
  data () {
    return {
      activeTab: '1',
      bottomPopup: false,
      same: false,
      upload: 0,
      address: {},
      provinceSelect: provinceList,
      citySelect: {
        ent: [],
        pri: [],
        isp: [],
        dom: []
      },
      countySelect: {
        ent: [],
        pri: [],
        isp: [],
        dom: []
      },
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
      isIcpSelect: [
        {text: '是', value: '01'},
        {text: '否', value: '02'}
      ],
      webinfoIspBoundSelect: [
        {text: '境内', value: '01'},
        {text: '境外', value: '02'}
      ],
      webinfoIspNameSelect: [
        {text: '上海有孚计算机网络有限公司', value: '01'}
      ],
      webinfoIspTypeSelect: [
        {text: '租赁虚拟空间', value: '01'}
      ],
      webinfoDomainBoundSelect: [
        {text: '境内', value: '01'},
        {text: '境外', value: '02'}
      ],
      webinfoDomainNameSelect: [
        {text: '租赁虚拟空间', value: '01'}
      ],
      certTypeSelect: [
        {text: '居民身份证', value: '01'},
        {text: '临时居民身份证', value: '02'},
        {text: '军官证', value: '03'},
        {text: '学生证', value: '04'},
        {text: '机动车驾驶证', value: '05'},
        {text: '外交护照', value: '06'},
        {text: '公务护照', value: '07'},
        {text: '因公普通护照', value: '08'},
        {text: '普通护照', value: '09'},
        {text: '入出境通行证', value: '10'},
        {text: '香港特别行政区护照', value: '11'},
        {text: '澳门特别行政区护照', value: '12'},
        {text: '其他证件', value: '13'},
        {text: '居住证', value: '14'}
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
    same: function () {
      if (this.same) {
        this.emergency.name = this.principal.name
        this.emergency.certType = this.principal.certType
        this.emergency.certNumber = this.principal.certNumber
        this.emergency.certIndate = this.principal.certIndate
      }
    },
    principal: function () {
      if (this.same) {
        this.emergency.name = this.principal.name
        this.emergency.certType = this.principal.certType
        this.emergency.certNumber = this.principal.certNumber
        this.emergency.certIndate = this.principal.certIndate
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
            _this.$store.commit('hideLoading')
            if (xhr.status === 200) {
              // 上传成功
              if (_this.upload === 1) { _this.enterprise.certPic = JSON.parse(xhr.response).attributes.data }
              if (_this.upload === 2) { _this.principal.certFrontPic = JSON.parse(xhr.response).attributes.data }
              if (_this.upload === 3) { _this.principal.certReversePic = JSON.parse(xhr.response).attributes.data }
              if (_this.upload === 4) { _this.principal.certHandPic = JSON.parse(xhr.response).attributes.data }
              if (_this.upload === 5) { _this.enterprise.domainCertPic = JSON.parse(xhr.response).attributes.data }
            } else {
              // 处理其他情况
            }
          }
          xhr.onerror = function () {
            // 处理错误
            _this.$store.commit('hideLoading')
          }
          xhr.upload.onprogress = function (e) {
            // 上传进度
            _this.$store.commit('showLoading')
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
    uploadImg (val) {
      console.log('upload:' + val)
      this.upload = val
      document.querySelector('#uploadImage').click()
    },
    provinceChange (val) {
      if (val === 1) {
        this.enterprise.address = this.address.ent1
        this.getPath(val, 1, this.address.ent1)
      }
      if (val === 2) {
        this.principal.area = this.address.pri1
        this.getPath(val, 1, this.address.pri1)
      }
      if (val === 3) {
        this.webinfo.ispArea = this.address.isp1
        this.getPath(val, 1, this.address.isp1)
      }
      if (val === 4) {
        this.webinfo.domainArea = this.address.dom1
        this.getPath(val, 1, this.address.dom1)
      }
    },
    cityChange (val) {
      console.log('cityChange----' + val)
      if (val === 1) {
        this.enterprise.address = this.address.ent1 + ',' + this.address.ent2
        this.getPath(val, 2, this.address.ent2)
      }
      if (val === 2) {
        this.principal.area = this.address.pri1 + ',' + this.address.pri2
        this.getPath(val, 2, this.address.pri2)
      }
      if (val === 3) {
        this.webinfo.ispArea = this.address.isp1 + ',' + this.address.isp2
        this.getPath(val, 2, this.address.isp2)
      }
      if (val === 4) {
        this.webinfo.domainArea = this.address.dom1 + ',' + this.address.dom2
        this.getPath(val, 2, this.address.dom2)
      }
    },
    countChange (val) {
      if (val === 1) {
        this.enterprise.address = this.address.ent1 + ',' + this.address.ent2 + ',' + this.address.ent3
      }
      if (val === 2) {
        this.principal.area = this.address.pri1 + ',' + this.address.pri2 + ',' + this.address.pri3
      }
      if (val === 3) {
        this.webinfo.ispArea = this.address.isp1 + ',' + this.address.isp2 + ',' + this.address.isp3
      }
      if (val === 4) {
        this.webinfo.domainArea = this.address.dom1 + ',' + this.address.dom2 + ',' + this.address.dom3
      }
    },
    getPath (val, num, path) {
      this.$http.get('/rest/api/area/list?path=' + path).then((res) => {
        if (num === 1) {
          if (val === 1) { this.citySelect.ent = res.data.attributes.data }
          if (val === 2) { this.citySelect.pri = res.data.attributes.data }
          if (val === 3) { this.citySelect.isp = res.data.attributes.data }
          if (val === 4) { this.citySelect.dom = res.data.attributes.data }
        }
        if (num === 2) {
          if (val === 1) { this.countySelect.ent = res.data.attributes.data }
          if (val === 2) { this.countySelect.pri = res.data.attributes.data }
          if (val === 3) { this.countySelect.isp = res.data.attributes.data }
          if (val === 4) { this.countySelect.dom = res.data.attributes.data }
        }
      })
    },
    get () {
      this.$http.get('/rest/api/profile/detail').then((res) => {
        this.user = res.data.attributes.data.user
        this.enterprise = res.data.attributes.data.enterprise
        this.principal = res.data.attributes.data.principal
        this.bind = res.data.attributes.data.bind
        this.webinfo = res.data.attributes.data.webinfo
        this.emergency = res.data.attributes.data.emergency
        // 无字段--是否有工信部备案号
        if (this.bind.icp) { this.principal.isIcp = '01' }
        // 格式化时间
        if (this.principal.certIndate !== null && this.principal.certIndate !== '') {
          this.principal.certIndate = this.format(this.principal.certIndate)
        }
        if (this.emergency.certIndate !== null && this.emergency.certIndate !== '') {
          this.emergency.certIndate = this.format(this.emergency.certIndate)
        }
        if (this.bind.applyTime !== null && this.bind.applyTime !== '') {
          this.bind.applyTime = this.format(this.bind.applyTime)
        }
        if (this.emergency.name === this.principal.name && this.emergency.certType === this.principal.certType && this.emergency.certNumber === this.principal.certNumber && this.emergency.certIndate === this.principal.certIndate) {
          this.same = true
        }
        // 地址
        if (this.webinfo.ispArea === null) {
          this.webinfo.ispArea = '402881882ba8753a012ba8d3f4f1008e,402881882ba8753a012ba8d57b430097'
        }
        if (this.webinfo.domainArea === null) {
          this.webinfo.domainArea = '402881882ba8753a012ba8da48e000b0,402881882ba8753a012ba8da7d2f00b1,402881e44da29af5014da35e28060334'
        }
        if (this.enterprise.address != null) {
          this.address.ent1 = this.enterprise.address.split(',')[0]
          if (this.address.ent1) {
            this.address.ent2 = this.enterprise.address.split(',')[1]
            this.getPath(1, 1, this.address.ent1)
          }
          if (this.address.ent2) {
            this.address.ent3 = this.enterprise.address.split(',')[2]
            this.getPath(1, 2, this.address.ent2)
          }
        }
        if (this.principal.area != null) {
          this.address.pri1 = this.principal.area.split(',')[0]
          if (this.address.pri1) {
            this.address.pri2 = this.principal.area.split(',')[1]
            this.getPath(2, 1, this.address.pri1)
          }
          if (this.address.pri2) {
            this.address.pri3 = this.principal.area.split(',')[2]
            this.getPath(2, 2, this.address.pri2)
          }
        }
        this.address.isp1 = this.webinfo.ispArea.split(',')[0]
        if (this.address.isp1) {
          this.address.isp2 = this.webinfo.ispArea.split(',')[1]
          this.getPath(3, 1, this.address.isp1)
        }
        if (this.address.isp2) {
          this.address.isp3 = this.webinfo.ispArea.split(',')[2]
          this.getPath(3, 2, this.address.isp2)
        }
        this.address.dom1 = this.webinfo.domainArea.split(',')[0]
        if (this.address.dom1) {
          this.address.dom2 = this.webinfo.domainArea.split(',')[1]
          this.getPath(4, 1, this.address.dom1)
        }
        if (this.address.dom2) {
          this.address.dom3 = this.webinfo.domainArea.split(',')[2]
          this.getPath(4, 2, this.address.dom2)
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
          this.$store.commit('topPopup')
        }
        this.principal.principalId = res.data.attributes.data.principal.principalId
        this.bind.bindId = res.data.attributes.data.bind.bindId
        this.webinfo.webinfoId = res.data.attributes.data.webinfo.webinfoId
        this.emergency.principalId = res.data.attributes.data.emergency.principalId
      })
    },
    format (value) {
      var time = new Date(parseInt(value))
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      return y + '-' + this.add0(m) + '-' + this.add0(d)
    },
    add0 (m) {
      return m < 10 ? '0' + m : m
    }
  }
}
</script>
