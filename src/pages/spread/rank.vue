<template>
  <div style="width: 100%;  height: 100%;">
    <div class='fixed-bar'>
      <mu-appbar title='我推广的会员'>
        <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
      </mu-appbar>
    </div>
    <iframe id="extend_rank" :src="'http://www.jihui88.com/member/extend_rank.html?u='+username" style="width: 100%; border: none; height: 87%;"></iframe>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: this.$store.state.user.username
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
