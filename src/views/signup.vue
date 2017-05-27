<template>
  <div>
    登录了 <a href="/login">login</a>
    <Footer></Footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isloading: true
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
    }
  }
}
</script>
