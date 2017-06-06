<template>
<div style="display:inline-block">
  <mu-circular-progress :size="50" :strokeWidth="5" style="position: fixed;z-index: 999;left: 50%;margin-left: -25px;top:30%"  v-if="isloading"/>
  <mu-raised-button class="demo-raised-button" label="上传">
    <input type="file" class="file-button" accept="image/*" @change="uploadImage($event)">
  </mu-raised-button>
</div>
</template>
<script>
import lrz from 'lrz'
export default {
  props: {
    width: Number
  },
  data () {
    return {
      isloading: false,
      result: ''
    }
  },
  methods: {
    uploadImage (e) {
      let _this = this
      lrz(e.target.files[0], {width: _this.width || 800, fieldName: 'Filedata'})
        .then(function (rst) {
          // 这里该上传给后端啦
          /* ==================================================== */
          // 原生ajax上传代码，所以看起来特别多 ╮(╯_╰)╭，但绝对能用
          // 其他框架，例如jQuery处理formData略有不同，请自行google，baidu。
          let xhr = new XMLHttpRequest()
          xhr.open('POST', '/rest/api/album/fileupload')
          xhr.onload = function () {
            _this.isloading = false
            if (xhr.status === 200) {
              // 上传成功
              let result = JSON.parse(xhr.response).attributes.data
              console.log(result)
              _this.result = result
              _this.$emit('result', result)
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
          _this.isloading = false
          // 不管是成功失败，都会执行
        })
    }
  }
}
</script>
