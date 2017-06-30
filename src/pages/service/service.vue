<template>
  <div>
    <mu-appbar title='服务中心'>
      <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
    </mu-appbar>

    <mu-list>
      <mu-list-item title="常见问题" href="#/faq">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="我的客服" href="tel:400-7111-011">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
        <div slot='after'>
          400-7111-011
        </div>
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="咨询QQ">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
        <div slot='after'>
          2594969476
        </div>
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="服务反馈" href="#/service_feedback">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider />
    </mu-list>
  </div>
</template>
<script>
export default {
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
