<template>
    <div>
        <div>排行榜-尚未开发2</div>

        <mu-circular-progress :size="50" :strokeWidth="5" style="position: fixed;z-index: 999;left: 50%;margin-left: -25px;top:30%"  v-if="isloading"/>

        <mu-text-field label="用户名称" hintText="请输入用户名称" v-model="enterprise.name"/>
        <img v-bind:src="enterprise.logo" alt="">
        <input type="file" accept="image/*" @change="uploadImage($event)">

        <mu-raised-button label="提交" @click="submit" class="submit-raised-button" primary fullWidth/>
    </div>
</template>
<script>
import api from '../../api'
import lrz from 'lrz'
export default {
  data () {
    return {
      isloading: false,
      enterprise: {}
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get(api.getEnterprise()).then((res) => {
        this.enterprise = res.data.attributes.data
      })
    },
    uploadImage (e) {
      lrz(e.target.files[0], {width: 800, fieldName: 'Filedata'})
        .then(function (rst) {
          // 这里该上传给后端啦
          /* ==================================================== */
          // 原生ajax上传代码，所以看起来特别多 ╮(╯_╰)╭，但绝对能用
          // 其他框架，例如jQuery处理formData略有不同，请自行google，baidu。
          let xhr = new XMLHttpRequest()
          xhr.open('POST', '/rest/api/album/fileupload')
          xhr.onload = function () {
            if (xhr.status === 200) {
              // 上传成功
              this.isloading = false
              console.log(xhr)
              console.log(JSON.parse(xhr.response).attributes.data)
            } else {
              // 处理其他情况
              console.log(xhr.statusText)
            }
          }
          xhr.onerror = function () {
              // 处理错误
          }
          xhr.upload.onprogress = function (e) {
            // 上传进度
            this.isloading = true
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
    submit () {
      this.$http.post('/rest/api/enterprise/detail', {
        enterprise: this.enterprise
      },
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        window.alert('success')
      })
    }
  }
}
</script>
<style>
</style>
