<template>
  <div>

    <mu-icon-menu icon="more_vert" class="category">
      <mu-menu-item title="菜单 1"/>
      <mu-menu-item title="菜单 2"/>
      <mu-menu-item title="菜单 3"/>
      <mu-menu-item title="菜单 4"/>
      <mu-menu-item title="菜单 5"/>
    </mu-icon-menu>
    case
  </div>
</template>
<script>
export default {
  data () {
    return {
      iframe1: false,
      iframe2: false,
      iframe3: false,
      iframe4: false
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.category{
  position: fixed;
top: 4px;
right: 0;    color: #fff;
}
</style>
