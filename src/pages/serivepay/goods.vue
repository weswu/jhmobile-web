<template>
  <div>
    <div style="text-align: center;padding: .5rem 0;">更新中...</div>
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
    get () {}
  }
}
</script>
