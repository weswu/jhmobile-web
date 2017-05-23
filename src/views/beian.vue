<template>
<div class="content">
<mu-appbar>
  <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
  <div class="play-title">
    <div class="play-name"><span>{{title}}</span></div>
  </div>
</mu-appbar>

<div class="container">

 <mu-paper style="display: inline-block; width: 100%;">
   <mu-list>
     <mu-list-item title="工商红盾" @click="beian('/redShield')">
       <mu-badge content="修改" slot="right"/>
     </mu-list-item>
     <mu-list-item title="工信备案" @click="beian('/miit')">
       <mu-badge content="修改" slot="right"/>
     </mu-list-item>
     <mu-list-item title="公安备案" @click="beian('/policeRecord')">
       <mu-badge content="修改" slot="right"/>
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
      title: '备案管理'
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    beian (e) {
      this.$router.push({path: e})
    }
  }
}
</script>
