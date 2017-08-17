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
    <mu-circular-progress :size="60" :strokeWidth="4" v-if="loading" style="margin: 0 auto;display: flex;"/>
    <div v-if='busy' style='text-align: center;padding: .5rem 0;'>暂无数据</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      text: '暂无数据',
      busy: false,
      loading: false
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.loading = true
      this.$http.get('/rest/api/crm/feedback/journal').then((res) => {
        this.loading = false
        if (!res.data.success) {
          this.text = '请在正常工作时间浏览噢<br>周一到周五　8:00～17:30'
          this.busy = true
          return false
        }
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
