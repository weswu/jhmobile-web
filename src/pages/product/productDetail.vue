<template>
  <div>
    <mu-appbar title="产品详细">
      <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
    </mu-appbar>

    <div class="container">

    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      enterprise: {}
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    to (e) {
      this.$router.push({path: e})
    }
  }
}
</script>
<style>
</style>
