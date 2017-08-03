<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title="账号资料">
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <div class="container p10">
      <p>
        <mu-select-field v-model="user.sex" :labelFocusClass="['label-foucs']" label="性别" hintText="请选择">
          <mu-menu-item v-for="v,index in sexSelect" :value="v.value" :title="v.text" />
        </mu-select-field>
        <mu-text-field label="姓名*" hintText="请输入姓名" v-model="user.name" :errorText="errorTextName" @input="changeInput($event,1)"/>
        <mu-text-field label="职务*" hintText="请输入职务" v-model="user.position" :errorText="errorTextPosition" @input="changeInput($event,2)"/>
        <mu-text-field label="手机" hintText="请输入手机" v-model="user.cellphone"/>
        <mu-text-field label="电话*" hintText="请输入电话" v-model="user.phone" :errorText="errorTextPhone" @input="changeInput($event,3)"/>
        <mu-text-field label="传真" hintText="请输入传真" v-model="user.fax"/>
        <mu-text-field label="地址" hintText="请输入地址" v-model="user.address"/>

        <mu-flat-button label="地图定位" class="demo-flat-button" to="/map"/>
        <mu-text-field label="Email" hintText="Email" v-model="user.email" disabled/>
        <mu-text-field label="QQ" hintText="请输入QQ" v-model="user.qq" type="number"/>
        <mu-text-field label="MSN" hintText="请输入MSN" v-model="user.msn"/>
        <mu-text-field label="邮编" hintText="请输入邮编" v-model="user.zipcode" type="number" maxLength="6"/>
        <mu-text-field label="网址" hintText="请输入网址" v-model="user.url" type="url"/>
        <mu-text-field label="微博地址" hintText="请输入微博地址" v-model="user.weibo"/>
        <mu-text-field label="微信二维码" hintText="请输入微信二维码" v-model="user.weixin" style="width:62%;margin-right: 10px;"/>
        <upload :width="300" v-on:result="fileChange"></upload>
      </p>
      <mu-raised-button label="提交" @click="submit" class="submit-raised-button" secondary fullWidth/>
    </div>

  </div>
</template>
<script>
import Upload from '../../components/upload'
import qs from 'qs'
export default {
  data () {
    return {
      isloading: true,
      errorTextName: '',
      errorTextPosition: '',
      errorTextPhone: '',
      sexSelect: [
        {text: '男', value: '00'},
        {text: '女', value: '01'}
      ],
      user: {}
    }
  },
  created () {
    this.get()
  },
  components: {
    Upload
  },
  methods: {
    get () {
      if (this.$store.state.user.id) {
        this.user = this.$store.state.user
      } else {
        this.$http.get('/rest/api/user/detail').then((res) => {
          this.user = res.data.attributes.data
        })
      }
    },
    back () {
      this.$router.back()
    },
    submit () {
      if (this.errorTextName !== '' || this.errorTextName !== '' || this.errorTextName !== '') {
        window.alert('完善数据')
        return true
      }
      this.$http.put('/rest/api/user/detail?' + qs.stringify(this.user)).then((res) => {
        this.$store.state.user = this.user
        window.alert('操作成功')
      })
    },
    fileChange (text) {
      console.log('监听到子组件变化' + text)
      this.user.weixin = text.data
    },
    changeInput (val, type) {
      if (val === '') {
        if (type === 1) {
          this.errorTextName = '姓名不能为空'
        } else if (type === 2) {
          this.errorTextPosition = '职务不能为空'
        } else if (type === 3) {
          this.errorTextPhone = '电话不能为空'
        }
      } else {
        if (type === 1) {
          this.errorTextName = ''
        } else if (type === 2) {
          this.errorTextPosition = ''
        } else if (type === 3) {
          this.errorTextPhone = ''
        }
      }
    }
  }
}
</script>
