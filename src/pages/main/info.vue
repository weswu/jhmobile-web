<template>
  <div>
    <mu-appbar title="数据">
      <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
    </mu-appbar>

    <div class="container">
     <mu-paper style="display: inline-block; width: 100%;">
       <mu-list>
         <mu-list-item title="产品" @click="to('/product')">
           <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
         </mu-list-item>
         <mu-divider/>
         <mu-list-item title="新闻" @click="to('/news')">
           <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
         </mu-list-item>
         <mu-divider/>
         <mu-list-item title="证书" @click="to('/cert')">
           <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
         </mu-list-item>
         <mu-divider/>
         <mu-list-item title="友情链接" @click="to('/link')">
           <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
         </mu-list-item>
       </mu-list>
     </mu-paper>
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
