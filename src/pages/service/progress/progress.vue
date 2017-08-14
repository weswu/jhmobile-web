<template>
  <div>
    <div class='fixed-bar'>
      <mu-appbar title='服务进度'>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <mu-list class='mu-item-left65'>
      <mu-list-item :title='enterprise.name'>
        <div slot='left'>公司名:</div>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item :title='user.username'>
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
          <router-link :to="{name: 'progressDetail',params: { id: item.fdbk_id, title: item.fdbk_subject64, desc: item.fdbk_intro1k, result: item.fdbk_result }}">
            <mu-list-item>
              <div slot='title' class='font14 c0034d1'>
                {{item.fdbk_subject64}}
              </div>
              <div class='subContent'>
                负责人:{{item.emp_name}}<span>{{item.fdbk_due_date | time('yyyy-MM-dd')}}</span>
              </div>
            </mu-list-item>
          </router-link>
          <mu-divider/>
        </template>
      </mu-list>
      <div v-if='busy1' style='text-align: center;padding: .5rem 0;'>暂无数据</div>
    </div>
    <div class='mbfixed' v-if="activeTab === '01'">
      <mu-list>
        <template v-for='item in list2'>
          <router-link :to="{name: 'progressDetail',params: { id: item.fdbk_id, title: item.fdbk_subject64, desc: item.fdbk_intro1k, result: item.fdbk_result }}">
            <mu-list-item @click='detail(item)'>
              <div slot='title' class='font14 c0034d1'>
                {{item.fdbk_subject64}}
              </div>
              <div class='subContent'>
                负责人:{{item.emp_name}}<span>{{item.fdbk_due_date | time('yyyy-MM-dd')}}</span>
              </div>
            </mu-list-item>
          </router-link>
          <mu-divider/>
        </template>
      </mu-list>
      <div v-if='busy2' style='text-align: center;padding: .5rem 0;'>暂无数据</div>
    </div>
    <mu-circular-progress :size="60" :strokeWidth="4" v-if="loading" style="margin: 0 auto;display: flex;"/>
    <mu-raised-button label='我要服务反馈' href='#/service_feedback' class='fixed' secondary fullWidth/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: this.$store.state.user,
      enterprise: this.$store.state.enterprise,
      activeTab: '00',
      loading: false,
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
      this.loading = true
      this.$http.get('/rest/api/crm/feedback/list?sort=' + this.activeTab).then((res) => {
        this.loading = false
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
        this.busy1 = false
        this.get()
      } else if (this.activeTab === '01' && this.list2.length === 0) {
        this.busy2 = false
        this.get()
      }
    }
  }
}
</script>
