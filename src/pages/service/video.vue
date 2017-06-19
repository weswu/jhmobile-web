<template>
  <div>
    <mu-appbar title='电脑端后台使用教程'>
      <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
    </mu-appbar>
    <mu-list>
      <mu-list-item title="1、后台界面以及网站发布" @click="iframe1 = !iframe1">
        <mu-icon value="swap_vert" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <iframe :style="iframe1? 'width:100%;height:181px':'width:0;height:0'" src="http://v.qq.com/iframe/player.html?vid=o0177hpsoig&tiny=0&auto=0"></iframe>
      <mu-divider />

      <mu-list-item title="2、图片管理" @click="iframe2 = !iframe2">
        <mu-icon value="swap_vert" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <iframe :style="iframe2? 'width:100%;height:181px':'width:0;height:0'" src="http://v.qq.com/iframe/player.html?vid=a0177x9hr3g&tiny=0&auto=0"></iframe>
      <mu-divider />

      <mu-list-item title="3、资料管理" @click="iframe3 = !iframe3">
        <mu-icon value="swap_vert" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <iframe :style="iframe3? 'width:100%;height:181px':'width:0;height:0'" src="http://v.qq.com/iframe/player.html?vid=a0177x9hr3g&tiny=0&auto=0"></iframe>
      <mu-divider />

      <mu-list-item title="4、产品管理" @click="iframe4 = !iframe4">
        <mu-icon value="swap_vert" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <iframe :style="iframe4? 'width:100%;height:181px':'width:0;height:0'" src="http://v.qq.com/iframe/player.html?vid=z0177tyqxlm&tiny=0&auto=0"></iframe>
      <mu-divider />
    </mu-list>

  </div>
</template>
<script>
export default {
  data () {
    return {
      iframe1: false,
      iframe2: false,
      iframe3: false,
      iframe4: false
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
  iframe{
    border:none;
    transition: all .5s ease;
  }
</style>
