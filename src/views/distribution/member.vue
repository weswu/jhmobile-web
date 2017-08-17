<template>
  <div>
    <mu-icon-button icon='search' class="cate_right" slot='right' @click='search = !search'/>
    <transition name='fade'>
      <div class='header-search' v-show='search'>
        <mu-text-field v-model='name' type='search' hintText='请输入会员编号' fullWidth/>
        <mu-raised-button label='搜索' @click='searchKey' secondary fullWidth/>
      </div>
    </transition>
    <mu-list-item title="会员信息">
      <div class="wu-item-right font16"><span class="c000">分销信息</span></div>
    </mu-list-item>
    <mu-divider/>
    <mu-list class="member-list">
      <template v-for='(dis, index) in list'>
        <mu-list-item :style="index%2 === 1 ? 'background: #f3f3f3;' : ''">
          <div class="fl" style="width:70%">
            <div class="fl">
               <img :src="dis.headimgurl">
            </div>
            <div class="fl">
              <p>No.&nbsp;{{dis.dealer_id}}</p>
              <p><span>昵称：</span>{{dis.nickname}}</p>
              <p><span>地区：</span>{{dis.location}}</p>
              <p><span>推荐：</span>{{dis.p_nickname}}</p> <p>.&nbsp;</p>
            </div>
            <br>
            <p class="clr"><span>关注：</span>{{dis.join_time}}</p>
          </div>
          <div class="fr" style="width:30%">
            <p><span>{{dis.dealer_arr[0].dealer_name}}：</span>{{dis.dealer_arr[0].all}}人</p>
            <p><span>	{{dis.dealer_arr[1].dealer_name}}：</span>{{dis.dealer_arr[1].all}}人</p>
            <p><span>{{dis.dealer_arr[2].dealer_name}}：</span>{{dis.dealer_arr[2].all}}人</p>
            <p><span>订单数：</span>{{dis.sales_count}}</p>
            <p><span>销售额：</span>￥{{dis.sales_sum}}</p>
            <p><span>总佣金：</span>￥{{dis.bouns_sum}}</p>
          </div>
        </mu-list-item>
      </template>
    </mu-list>
    <div class="chaxun" v-if="chaxun">
	    <em class="iconfont icon-tishi"></em> 您还未开通微分销，无法查看数据<br> 咨询请联系：<a href="tel:4007111011">4007111011</a>
    </div>
    <div v-if="busy" style="text-align: center;padding: .5rem 0;">暂无数据</div>
    <div style="padding-bottom: 56px;"></div>
    <div class="fenye">
    	<ul class="fenye-ul">
        	<li id="first" @click="first" class="fenye-li">首页</li>
            <li id="top" @click="topclick" class="fenye-li">上一页</li>
            <li class="xifenye fenye-li" id="xifenye" @click="xifenye">
            	<a id="xiye">{{page}}</a>/<a id="mo">{{p.total}}</a>
                <div class="xab" id="xab" v-if="toggle">
                	<ul id="uljia">
                    <li v-for="item in p.totalList" @click="pageSize(item)">{{item}}</li>
                  </ul>
                </div>
            </li>
            <li id="down" @click="downclick" class="fenye-li">下一页</li>
            <li id="last" @click="last" class="fenye-li">末页</li>
        </ul>
    </div>
  </div>
</template>
<script>
import jsonp from 'jsonp'
export default {
  data () {
    return {
      list: [],
      search: false,
      toggle: false,
      chaxun: false,
      busy: false,
      page: 1,
      name: '',
      p: {
        total: 1
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      var ctx = this
      this.$parent.$parent.$refs.loading.show()
      var end = ''
      if (this.name !== '') {
        end = '/' + this.name
      }
      jsonp('http://www.jihui88.com/wechat/cps/index.php/jihui_api/members/' + this.$store.state.enterprise.enterpriseId + '/' + this.page + '/5' + end, null, function (err, data) {
        ctx.$parent.$parent.$refs.loading.hide()
        if (!data.success) {
          console.log(data.msg)
          if (this.page === 1) {ctx.chaxun = true} else {ctx.busy = true}
          return false
        }
        ctx.list = data.attributes.data
        if (ctx.page === 1) {
          ctx.p.total = Math.ceil(data.attributes.count / 5)
          ctx.p.totalList = []
          for (var i = 0; i < ctx.p.total; i++) {
            ctx.p.totalList.push(i + 1)
          }
          if (data.attributes.data.length === 0) {
            ctx.busy = true
          }
        }
        if (err) {
          console.error(err.message)
        } else {
          console.log(data)
        }
      })
    },
    searchKey () {
      this.list = []
      this.page = 1
      this.search = false
      this.get()
    },
    topclick () {
      if (this.page > 1) {
        this.page = this.page - 1
        this.get()
      }
    },
    downclick () {
      if (this.page < this.p.total) {
        this.page = this.page + 1
        this.get()
      }
    },
    first () {
      if (this.page !== 1) {
        this.page = 1
        this.get()
      }
    },
    last () {
      if (this.page !== this.p.total) {
        this.page = this.p.total
        this.get()
      }
    },
    xifenye () {
      this.toggle = !this.toggle
    },
    pageSize (v) {
      this.page = parseInt(v)
      this.get()
    }
  }
}
</script>
<style scoped>
.member-list img{display:block;width:60px;height:60px;margin-right:10px}
.member-list p,.member-list span{line-height:1rem;font-size:.5rem}
.member-list span{color:#999}
/***************分页******************/
.fenye{background:#f7f7f7;padding:.37rem 0 .35rem 0;position:fixed;bottom:0;width:100vw;z-index:9900;border-top:.05rem solid #e1e1e1}
.fenye .fenye-ul{width:100vw;display:-moz-box;display:-webkit-box;display:-webkit-flex;display:-moz-flex;display:-ms-flexbox;display:-ms-flex;display:flex}
.fenye ul li.fenye-li{float:left;padding:.4rem 0;border:1px solid #ccc;cursor:pointer;color:#999;-webkit-box-flex:1;-moz-box-flex:1;-webkit-flex:1 1 0%;-moz-flex:1 1 0;-ms-flex:1 1 0%;flex:1 1 0%;text-align:center}
.fenye ul li a{ color:#999;}
.fenye ul li.xifenye{ width:1.8rem; text-align:center; float:left; position:relative;cursor: pointer;}
.fenye ul li .xab{box-sizing: border-box;
 position:absolute;  border:1px solid #ccc; height:30vh; overflow-y: auto;overflow-x: hidden;top:-30vh; background-color: #fff; display:inline;left:0px; width:100%;}
.fenye ul li .xab ul{ margin-left:0; padding-bottom:0;}
.fenye ul li .xab ul li{ border:0; padding:0.2rem 0px; color:#999; width:2rem; margin-left:0px; text-align:center;}
.fenye ul li#down,.fenye ul li#top{border-left:none;border-right:none}
</style>
