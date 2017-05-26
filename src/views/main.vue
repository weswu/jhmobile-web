<template>
  <div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from './components/footer.vue'
export default {
  data () {
    return {
      isloading: true
    }
  },
  components: {
    Footer
  },
  created () {
    this.get()
  },
  methods: {
    get () {
    }
  }
}
</script>
