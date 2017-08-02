<template>
<div class="content">
  <div class="fixed-bar">
    <mu-appbar title="备案管理">
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
    </mu-appbar>
  </div>

<div class="container pt10">
 <mu-paper style="display: inline-block; width: 100%;">
   <mu-list>
     <mu-list-item title="工商红盾" @click="beian('/redShield')">
       <mu-avatar slot="left" src="http://www.jihui88.com/member/images/sincerity01.jpg" :size="30"/>
       <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
     </mu-list-item>
     <mu-divider/>
     <mu-list-item title="工信备案" @click="beian('/miit')">
       <mu-avatar slot="left" src="http://www.jihui88.com/member/images/sincerity02.jpg" :size="30"/>
       <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
     </mu-list-item>
     <mu-divider/>
     <mu-list-item title="公安备案" @click="beian('/policeRecord')">
       <mu-avatar slot="left" src="http://dfwjjingtai.b0.upaiyun.com/upload//j//j2//jihui88//picture//2017//03//06/59e3d638-b6a4-43d2-9af0-a1bfd5f46726.jpg" :size="30"/>
       <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
     </mu-list-item>
   </mu-list>
 </mu-paper>
  </div>
</div>
</template>

<script>
export default {
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
