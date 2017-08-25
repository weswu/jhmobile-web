<template>
    <!-- 过渡动画 -->
    <transition name="fade">
        <!-- 遮罩层 -->
        <div class="img-view img-layer" @click="bigImg">
            <div class="img">
                <img :src="imgSrc">
            </div>
        </div>
    </transition>
</template>
<script>
export default {
  props: ['imgSrc'],
  methods: {
    bigImg() {
      // 发送事件
      this.$emit('clickit')
    }
  }
}
</script>
<style scoped>
/*动画*/
.fade-enter-active,
.fade-leave-active {
    transition: all .2s linear;
    transform: translate3D(0, 0, 0);
}

.fade-enter,
.fade-leave-active {
    transform: translate3D(100%, 0, 0);
}

/* bigimg */
.img-view {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/*不限制图片大小，实现居中*/
.img-view .img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  display: -ms-flexbox;
  -ms-flex-pack: center;
  -ms-flex-align: center;    
}
.img-view .img img {
  -webkit-user-drag: none;
  -webkit-user-select: none;
  max-width: 100%;
  max-height: 100%;
}
</style>
