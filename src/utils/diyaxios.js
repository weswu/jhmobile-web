import axios from 'axios'
axios.defaults.timeout = 15000
// code状态码200判断
axios.interceptors.response.use((res) => {
  if (res.status === 654) { // 百度云请求超时检测
    window.alert('请求超时！')
  }
  if (res.data.success === false) {
    if (res.data.msg === '未登陆') {
      window.location.href = window.location.origin + '/#/login'
    } else {
      window.alert(res.data.msg || '数据返回有误')
    }
    return Promise.reject(res)
  }
  return res
}, (error) => {
  console.log('promise error:' + error)
  if (!error.response) {
    // window.alert('超时')
  }
  if (error.response.status === 401) {
    if (error.response.data.err_code === '用户不存在') {
      window.alert('请联系客服,账号未关联到机汇云')
    } else {
      window.alert('发送失败')
    }
  }
  return Promise.reject(error)
})
export default axios
