<template>
  <div>
    <div class='fixed-bar'>
      <mu-appbar title='服务进度'>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <mu-list class='mu-item-left65'>
      <mu-list-item :title='enterName'>
        <div slot='left'>公司名:</div>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item :title='username'>
        <div slot='left'>用户名:</div>
      </mu-list-item>
    </mu-list>
    <div class='hr'></div>
    <mu-tabs :value='activeTab' @change='handleTabChange' class='view-tabs'>
      <mu-tab value='00' title='正在服务'/>
      <mu-tab value='01' title='服务结束'/>
    </mu-tabs>
    <div class='mbfixed' v-if="activeTab === '00'">
      <mu-list>
        <template v-for='item in list1'>
          <mu-list-item @click='detail(item)'>
            <div slot='title' class='font14 c0034d1'>
              {{item.fdbk_subject64}}
            </div>
            <div class='subContent'>
              负责人:{{item.emp_name}}<span>{{item.fdbk_due_date | time('yyyy-MM-dd')}}</span>
            </div>
          </mu-list-item>
          <mu-divider/>
        </template>
      </mu-list>
      <div v-if='busy1' style='text-align: center;padding: .5rem 0;'>暂无数据</div>
    </div>
    <div class='mbfixed' v-if="activeTab === '01'">
      <mu-list>
        <template v-for='item in list2'>
          <mu-list-item @click='detail(item)'>
            <div slot='title' class='font14 c0034d1'>
              {{item.fdbk_subject64}}
            </div>
            <div class='subContent'>
              负责人:{{item.emp_name}}<span>{{item.fdbk_due_date | time('yyyy-MM-dd')}}</span>
            </div>
          </mu-list-item>
          <mu-divider/>
        </template>
      </mu-list>
      <div v-if='busy2' style='text-align: center;padding: .5rem 0;'>暂无数据</div>
    </div>
    <mu-raised-button label='我要服务反馈' href='#/service_feedback' class='fixed-raised-button' secondary fullWidth/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: this.$store.state.user.username,
      enterName: this.$store.state.enterprise.name,
      activeTab: '00',
      busy1: false,
      busy2: false,
      list1: [],
      list2: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/crm/feedback/list?sort=' + this.activeTab).then((res) => {
        var result = res.data.attributes.data
        if (result.length === 0) {
          if (this.activeTab === '00') {
            this.busy1 = true
          } else {
            this.busy2 = true
          }
        } else {
          if (this.activeTab === '00') {
            this.list1 = result
          } else {
            this.list2 = result
          }
        }
      })
    },
    handleTabChange (val) {
      this.activeTab = val
      if (this.activeTab === '00' && this.list1.length === 0) {
        this.get()
      } else if (this.activeTab === '01' && this.list2.length === 0) {
        this.get()
      }
    },
    detail: function (item) {
      if (item.fdbk_result === '') {
        item.fdbk_result = '暂无数据'
      }
      var desc = ''
      for (var it of item.fdbk_intro1k) {
        desc += it + '<br/>'
      }
      this.$router.push({path: '/serive_progress/' + item.fdbk_id + '/' + encodeURIComponent(item.fdbk_subject64) + '/' + encodeURIComponent(desc) + '/' + encodeURIComponent(item.fdbk_result)})
    }
  }
}
</script>
