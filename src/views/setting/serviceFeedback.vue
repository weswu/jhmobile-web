<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title="我的服务反馈">
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
    </div>
    <div class="p10">
      <mu-text-field label="主题" hintText="请输入主题" v-model="sf.fdbk_subject64" fullWidth/>
      <mu-select-field v-model="sf.fdbk_type" :labelFocusClass="['label-foucs']" label="反馈类型">
        <mu-menu-item v-for="v,index in list" :value="v.value" :title="v.text" />
      </mu-select-field>
      <mu-text-field hintText="请描述您的反馈内容，并附带上您的手机号码，我们好及时对接您提的反馈内容。" v-model="sf.fdbk_intro1k" fullWidth multiLine :rows="5" :rowsMax="10" fullWidth/>
      <mu-raised-button label="提交" @click="submit" secondary fullWidth/>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      sf: {
        card_no: this.$store.state.user.username,
        fdbk_subject64: '',
        fdbk_intro1k: '',
        fdbk_type: '2'
      },
      list: [
        { text: '购买', value: '1' },
        { text: '服务', value: '2' },
        { text: '投诉', value: '3' },
        { text: '表扬', value: '4' },
        { text: '建议', value: '5' },
        { text: '其他', value: '6' }
      ]
    }
  },
  methods: {
    submit () {
      if (this.sf.fdbk_subject64 === '') {
        window.alert('主题不能为空')
        return false
      }
      if (this.sf.fdbk_intro1k === '') {
        window.alert('反馈内容不能为空')
        return false
      }
      this.sf.fdbk_subject64 = this.sf.fdbk_subject64 + '[APP]'
      this.$http.post('http://crmyun.jihui88.com:9500/api/jihuifeedback.php', qs.stringify(this.sf)).then((res) => {
        window.alert('修改成功')
      })
      this.sf.fdbk_subject64 = ''
    }

  }
}
</script>
