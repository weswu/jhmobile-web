<template>
  <div>
    <mu-appbar title='网站静态发布'>
      <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
    </mu-appbar>
    <mu-list>
      <mu-list-item title="发布网站导航页面"  @click='navigationPage'>
        <mu-icon slot="left" value="inbox"/>
      </mu-list-item>
      <mu-list-item title="发布网站分类页面"  @click='categoryPage'>
        <mu-icon slot="left" value="grade"/>
      </mu-list-item>
      <mu-list-item title="发布网站详细页面" @click='pcPage'>
        <mu-icon slot="left" value="send"/>
      </mu-list-item>
      <mu-list-item title="发布手机网站页面" @click='mobilePage'>
        <mu-avatar color="#757575" :style="{'margin-left': '-8px'}" backgroundColor="transparent" slot="leftAvatar">M</mu-avatar>
      </mu-list-item>
    </mu-list>
    <mu-divider />
    <!--提示...-->
    <toast ref="toast"></toast>
  </div>
</template>
<script>
import jsonp from 'jsonp'
export default {
  methods: {
    navigationPage () {
      if (this.$cookie.get('navigation')) {
        this.$refs.toast.show('5分钟内只可发布一次，请稍后再试')
      } else {
        jsonp('http://www.jihui88.com/rest/static1/' + this.$store.state.user.username + '/publish?type=page', null, function (err, data) {
          if (err) {
            console.error(err.message)
          } else {
            console.log(data)
          }
        })
        this.$refs.toast.show('发布成功')
        this.$cookie.set('navigation', 'true', { expires: '5m' })
      }
    },
    categoryPage () {
      if (this.$cookie.get('category')) {
        this.$refs.toast.show('5分钟内只可发布一次，请稍后再试')
      } else {
        jsonp('http://www.jihui88.com/rest/static1/' + this.$store.state.user.username + '/publish?type=category', null, function (err, data) {
          if (err) {
            console.error(err.message)
          } else {
            console.log(data)
          }
        })
        this.$refs.toast.show('发布成功')
        this.$cookie.set('category', 'true', { expires: '5m' })
      }
    },
    pcPage () {
      if (this.$cookie.get('pc')) {
        this.$refs.toast.show('5分钟内只可发布一次，请稍后再试')
      } else {
        jsonp('http://www.jihui88.com/rest/static1/' + this.$store.state.user.username + '/publish?type=detail', null, function (err, data) {
          if (err) {
            console.error(err.message)
          } else {
            console.log(data)
          }
        })
        this.$refs.toast.show('发布成功')
        this.$cookie.set('pc', 'true', { expires: '5m' })
      }
    },
    mobilePage () {
      if (this.$cookie.get('mobile')) {
        this.$refs.toast.show('5分钟内只可发布一次，请稍后再试')
      } else {
        jsonp('http://www.jihui88.com/rest/mobileStatic/' + this.$store.state.user.username + '/publish?type=page', null, function (err, data) {
          if (err) {
            console.error(err.message)
          } else {
            console.log(data)
          }
        })
        this.$refs.toast.show('发布成功')
        this.$cookie.set('mobile', 'true', { expires: '5m' })
      }
    }
  }
}
</script>
