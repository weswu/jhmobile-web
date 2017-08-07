<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar :title="title">
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
		<div class="titlef5">描述</div>
    <section class="p10 c666" v-html="desc"></section>
		<div class="sp_title">处理结果</div>
    <section class="p10 c666">{{result}}</section>
		<div class="titlef5">处理过程</div>
    <mu-list>
      <template v-for='item in list'>
        <mu-list-item>
          <div slot='title'>
            {{item.emp_name}}
          </div>
          <div class='subContent'>
            {{item.deal_time | time('yyyy-MM-dd hh:mm')}}
            <p class="c000">{{item.deal_result}}</p>
          </div>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: this.$route.params.title,
      desc: this.$route.params.desc,
      result: this.$route.params.result,
      list: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.params.id) {
        vm.list = []
        vm.get()
      }
    })
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/crm/feedback/detail/' + this.$route.params.id).then((res) => {
        this.list = res.data.attributes.data
      })
    }
  }
}
</script>
