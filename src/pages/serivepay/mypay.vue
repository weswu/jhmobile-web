<template>
  <div class="servicePay">
    <div class="fixed-bar">
      <mu-appbar title="我的缴费">
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
    </div>
    <mu-list>
      <mu-list-item :title="username">
        <div slot="left">用户名:</div>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item>
        <div slot="title" class="red">
          ￥{{totel}}
        </div>
        <div slot="left">实缴金额:</div>
      </mu-list-item>
    </mu-list>
    <div class="hr"></div>

    <mu-list>
      <mu-list-item>
        <div slot="left">支付方式</div>
      </mu-list-item>
      <template v-for='item,index in list'>
        <mu-list-item disableRipple @click="check(item,index)" :title="item.name">
          <mu-checkbox :value="item.check" slot="left" @change="check(item,index)"/>
          <div slot="describe">
            {{item.desc}}
            <div v-if="index === 3 && item.check" style="height:35px">公司名称： 浙江机汇网络科技有限公司<br>支付账号： 1202021509900658919</div>
          </div>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>

    <mu-raised-button v-if="index != 3" label='付款' @click='pay' secondary fullWidth/>
    <div @click="tipHide">
      <div class="pay-bg" v-if="tip"></div>
      <div class="buyImg" v-if="index === 0 && tip">
        <img src="static/img/zhifubao.jpg">
      </div>
      <div class="buyImg" v-if="index === 1 && tip">
        <img src="static/img/weixin.jpg">
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      username: this.$store.state.user.username,
      totel: 0,
      index: 0,
      tip: false,
      list: [
        {
          name: '支付宝',
          desc: '使用支付宝账号支付',
          check: true,
          icon: ''
        },
        {
          name: '微信支付',
          desc: '使用微信账号支付',
          check: false,
          icon: ''
        },
        {
          name: '银行卡支付',
          desc: '支持开通网银的储蓄卡 信用卡支付',
          check: false,
          icon: 'http://www.allinpay.com/templates/default/images/logo.gif'
        },
        {
          name: '手动支付',
          desc: '开户行： 中国工商银行杭州市开元支行',
          check: false,
          icon: ''
        }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.params.totel) {
        vm.totel = vm.$route.params.totel
      }
    })
  },
  methods: {
    check (item, index) {
      for (var it of this.list) {
        it.check = false
      }
      this.index = index
      item.check = !item.check
    },
    tipHide () {
      this.tip = false
    },
    pay () {
      if (this.index === 0 || this.index === 1) {
        this.tip = true
      }
      if (this.index === 2) {
        window.alert('通联支付未开通...')
      }
    }
  }
}
</script>
<style media="screen">
.buyImg {
  width: 92%;
  max-height: 90%;
  overflow: hidden;
  background-color: white;
  opacity: 1;
  position: fixed;
  top: 5%;
  z-index: 10000;
  transition: all .3s ease;
  left: 4%;
  padding: 0;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 1px #eee;
}
.pay-bg {
    opacity: 0.7;
    width: 100%;
    height: 100%;
    z-index: 9999;
    position: fixed;
    top: 0;
    background: #000;
}
.buyImg img{
  width: 100%
}
</style>
