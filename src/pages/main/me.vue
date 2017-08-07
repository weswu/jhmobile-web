<template>
  <div>
    <mu-appbar title="我的">
      <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
    </mu-appbar>
    <mu-list class="pt10">
      <mu-list-item title="账号资料" @click="to('/user')">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="企业资料" @click="to('/enterprise')">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="公安备案" @click="to('/beian')">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="域名绑定" @click="to('/bind')">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="一键发布" @click="to('/publish')">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <br/>
      <mu-list-item title="设置" @click="to('/setting')">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
    </mu-list>
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
