<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title="我的积分">
        <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
      </mu-appbar>
    </div>

        <div class="point-info">
        	<div class="point-username"><span class="iconfont icon-person2"></span>{{enterName}}</div>
        	<div class="point-use">{{username}} 可用积分</div>
        	<a href="#/point_detail" class="point-detail"><span class="point-value">{{point}}</span></a>
        	<a href="#/point_rule" class="point-rule">积分规则<i class="iconfont icon-tishi" style="padding-left:0.2rem;font-size: 0.7rem;"></i></a>
        	<div class="ranking" @click="ranking()">当前积分排行：{{rank}}</div>
        </div>
        <div class="point-exchange">
        	<div class="point-title"><span><i class="iconfont icon-lipin"></i>积分兑换</span></div>
        	<div class="point-product">
        		<div @click="exchange(1)"><h2>兑换软文</h2><p>500积分兑软文</p><i class="iconfont icon-xinwen"></i></div>
        		<div @click="exchange(2)"><h2>移动办公布属</h2><p>1000积分兑丁丁、微信布属</p><i class="iconfont icon-shangpin"></i></div>
        		<div style="margin: 0 0.5%;" @click="exchange(3)"><h2>兑换流量</h2><p>国内通用流量100MB兑</p><i class="iconfont icon-liuliang"></i></div>
        	</div>
        	<div class="point-title"><span><i class="iconfont icon-remen"></i>热门兑换</span></div>
        	<div class="point-hot-product">
        		<div class="point-pro-item" :class="point > 500 ? 'cur' : ''" @click="exchange(1)">
        			<div class="point-pro-title">软文</div>
        			<div class="point-pro-value" style="font-size: 0.8rem;height: 2.2rem;">引流，传播品牌</div>
        			<p>500积分</p>
        		</div>
        		<div class="point-pro-item flow" :class="point > 5000 ? 'cur' : ''" @click="exchange(3)">
        			<div class="point-pro-title">国内通用流量<br><span>2/3/4G通用</span></div>
        			<div class="point-pro-value"><span style="font-size: 2.1rem;">100</span>MB</div>
        			<p>5000积分</p>
        		</div>
        	</div>
        	<div style="text-align: center;color: #999;padding-top: 0.5rem;" v-if="mobile != null && mobile != ''">手机号:{{mobile}}</div>
        </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      username: this.$store.state.user.username,
      enterName: this.$store.state.enterprise.name,
      mobile: this.$store.state.user.phone,
      point: 0,
      rank: 0
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
      this.$http.get('/rest/api/point/info').then((res) => {
        this.point = res.data.attributes.point || 0
        this.rank = res.data.attributes.rank || 0
      })
    },
    ranking () {
      this.$router.push({path: '#/point_ranking'})
    },
    exchange (n) {
      var val = 100000
      var id = ''
      if (n === 1) {
        val = 500
        id = 'Integralpro_00000000000000000201'
      }
      if (n === 2) {
        val = 1000
        id = 'Integralpro_00000000000000000221'
      }
      if (n === 3) {
        val = 5000
        id = 'Integralpro_00000000000000000081'
      }
      if (val > this.point) {
        window.alert('您的积分不足,无法兑换')
      } else {
        var r = window.confirm('确定兑换')
        if (r === true) {
          this.$http.get('/rest/api/point_product/detail/' + id).then((res) => {
            if (res.data.success) {
              window.alert('兑换成功')
            } else {
              window.alert(res.data.msg)
            }
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.mu-appbar {
    background-color: #fafafa;
    color: #4d4d4d;
}
.point-exchange{background:#f5f5f5}
.point-info{position:relative;text-align:center;color:#fff;padding:1rem 0 0.5rem 0;line-height:1.2rem;background:#ff7300;background:-moz-linear-gradient(left,#ea3062,#f8386b 30%,#ea3062);background:-webkit-gradient(linear,left top,right top,from(rgba(253,114,0,.93)),color-stop(.3,#ff7300),to(#ff6a00));background:-webkit-linear-gradient(left,rgba(253,114,0,.93),#ff7300 30%,#ff6a00);background:-o-linear-gradient(left,rgba(253,114,0,.93),#ff7300 30%,#ff6a00)}
.point-username{font-size:.8rem}
.point-use{padding-bottom:.8rem;font-size:.5rem}
.point-info a{color:#fff}
.point-value{font-size:2rem}
.point-detail{display:block}
.point-rule{position:absolute;top:.2rem;right:.35rem}
.point-view{position:absolute;padding-left:1rem}
.icon-person2{font-size:.8rem;padding-right:.2rem}
.icon-lipin{color:#ffcc15;padding-right:5px}
.icon-remen{color:#ff6315;padding-right:5px}
.point-title{text-align:center;line-height:1.5rem;height:2rem;clear:both;padding: 10px 0 3px 0;}
.point-title:after{content:'';background:#ddd;width:80%;height:1px;margin:0 10%;display:block;margin-top:-.73rem}
.point-title span{padding:0 1rem;display:inline-block;background:#f5f5f5;box-sizing:border-box}
.point-hot-product,.point-product{overflow:hidden}
.point-product div{float:left;width:33%;background:#fff;text-align:center;height:8rem;padding:.3rem 0}
.point-product p{font-size:.5rem;color:#999;padding:.3rem .3rem;height:2rem}
.point-product img{width:3rem}
.point-product h2{font-size: 0.8rem;}
.point-product i{font-size: 2.2rem;color: #43aee2;}
.point-hot-product{padding:0 .3rem}
.point-pro-item{float:left;width:45%;background:#fff;text-align:center;height:6rem;padding:.5rem 0;margin:.3rem}
.point-pro-item .point-pro-title{font-size:.8rem}
.point-pro-item .point-pro-title span{font-size:.5rem;color:#666}
.point-pro-item p{border-radius:1rem;border:1px solid #b6b1ae;height:1.2rem;line-height:1.2rem;width:80%;margin:0 auto;font-size:.75rem;color:#999}
.point-pro-item .point-pro-value{font-weight:700;font-size:1rem;color:#aaa;padding-bottom:.3rem}
.point-pro-item .point-pro-value span{font-size:3rem}
.point-pro-item.cur .point-pro-value{color:#ff7300}
.point-pro-item.cur p{color:#ff7300;border:1px solid #ff7300}
</style>
