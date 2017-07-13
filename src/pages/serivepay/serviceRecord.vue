<template>
  <div class='item-list'>
    <dl class='member_list_first'>
  		<dd class='item-row-3' ng-show='vm.activeTab == 3'>负责人/时间</dd>
  		<dd class='item-row-7' ng-show='vm.activeTab == 3'>主题</dd>
  	</dl>
    <dl v-for='item in list'>
    	<dd class='item-row-3'>{{item.emp_name}}<br>{{item.jrnl_start_time | time('yyyy-MM-dd hh:mm')}}</dd>
    	<dd class='item-row-7'>{{item.jrnl_subject64}}</dd>
    </dl>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.loading = true
      this.$http.get('/rest/api/crm/feedback/journal').then((res) => {
        this.list = res.data.attributes.data
      })
    }
  }
}
</script>
