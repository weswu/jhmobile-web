<template>
  <div>
    <mu-list>
      <template v-for='item in list'>
        <mu-list-item>
          <div slot="title" class="font14">
            {{item.jrnl_subject64}}
          </div>
          <div class='subContent'>
            负责人:{{item.emp_name}} <span>{{item.jrnl_start_time | time('yyyy-MM-dd hh:mm')}}</span>
          </div>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    <div v-if='busy' style='text-align: center;padding: .5rem 0;'>暂无数据</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      busy: false
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.loading = true
      this.$http.get('/rest/api/crm/feedback/journal').then((res) => {
        var result = res.data.attributes.data
        if (result.length === 0) {
          this.busy = true
        } else {
          this.list = result
        }
      })
    }
  }
}
</script>
