<template>
  <div class="progress">
    <div class="fixed-bar">
      <mu-appbar title="服务进度">
        <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
      </mu-appbar>
    </div>
    <mu-list>
      <mu-list-item :title="enterName">
        <div slot="left">公司名:</div>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item :title="username">
        <div slot="left">用户名:</div>
      </mu-list-item>
    </mu-list>
    <div class="hr"></div>
    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab value="00" title="正在服务"/>
      <mu-tab value="01" title="服务结束"/>
    </mu-tabs>
    <div class="item-list">
      <dl class="member_list_first">
         <dd class="item-row-2">解决期限</dd>
         <dd class="item-row-4">主题</dd>
         <dd class="item-row-3">负责人</dd>
      </dl>
      <div v-if="activeTab === '00'">
        <dl v-for="item in list1">
          <dd class="item-row-2">{{item.fdbk_due_date | time}}</dd>
          <dd class="item-row-4 title">{{item.fdbk_subject64}}</dd>
          <dd class="ellipsis item-row-3">{{item.emp_name}}</dd>
        </dl>
			</div>
      <div v-if="activeTab === '01'">
        <dl v-for="item in list2">
          <dd class="item-row-2">{{item.fdbk_due_date | time}}</dd>
          <dd class="item-row-4 title">{{item.fdbk_subject64}}</dd>
          <dd class="ellipsis item-row-3">{{item.emp_name}}</dd>
        </dl>
      </div>
    </div>
    <mu-raised-button label="我要服务反馈" href="#/service_feedback" class="fixed-raised-button" secondary fullWidth/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: this.$store.state.user.username,
      enterName: this.$store.state.enterprise.name,
      activeTab: '00',
      list1: [
        {
          fdbk_id: 323613,
          fdbk_result: '',
          emp_name: '赵汉杰（吕琦华）',
          fdbk_subject64: '网安备案',
          fdbk_due_date: 1495123200000
        }
      ],
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
        if (this.activeTab === '00') {
          this.list1 = res.data.attributes.data
        } else {
          this.list2 = res.data.attributes.data
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
    }
  }
}
</script>
<style>
.progress .mu-item-left {
    width: 65px;
}
.progress .item-list .title {
    color: #0034d1;
}
</style>
