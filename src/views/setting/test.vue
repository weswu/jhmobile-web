<template>
  <div>
    <mu-appbar title='测试'>
      <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
    </mu-appbar>
    <div>
      测试
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      test: ''
    }
  },
  created () {
    let u = navigator.userAgent
    window.alert(u)
  },
  methods: {
    get () {
      console.log('test')
    }
  }
}
</script>
