<template>
  <div class="gridlist-demo-container wrapper">
    <div class="item-list member-list">
			<dl class="item-list-first">
				<dd class="item-row-7">会员信息</dd>
				<dd class="item-row-3">分销信息</dd>
			</dl>
		   <dl v-for="item, index in list">
				<dd class="item-row-7">
				    <div class="left userImg">
				       <img :src="item.headimgurl">
				    </div>
					<div class="left userinfo">
            <p>No.&nbsp;131</p>
            <p><span>昵称：</span>汤圆麻麻™جۇشۇەن</p>
            <p><span>地区：</span>新疆喀什</p>
            <p><span>推荐：</span>汤圆爸比™جاڭ يى</p> <p>.&nbsp;</p>
          </div>
          <br>
          <p class="clr"><span>关注：</span>2016-04-02 17:04:53</p>
				</dd>
				<dd class="item-row-3">
          <div class="distributorinfo">
            <p><span>大掌柜：</span>0人</p>
            <p><span>二掌柜：</span>0人</p>
            <p><span>小掌柜：</span>0人</p>
            <p><span>订单数：</span>0</p>
            <p><span>销售额：</span>￥0</p>
            <p><span>总佣金：</span>￥0</p>
           </div>
         </dd>
			  </dl>
		</div>
    <div v-if="busy" style="text-align: center;padding: .5rem 0;">暂无数据</div>
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
      loading: false,
      toggle: false,
      busy: false,
      page: 1,
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
      this.loading = true
      jsonp('http://www.jihui88.com/wechat/cps/index.php/jihui_api/members/' + this.$store.state.enterprise.enterpriseId + '/' + this.page + '/5', null, function (err, data) {
        if (!data.success) {
          console.log(data.msg)
        }
        ctx.list = data.attributes.data
        ctx.loading = false
        if (ctx.page === 1) {
          ctx.p.total = Math.ceil(data.attributes.count / 2)
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
.member-list img {
    display: block;
    width: 60px;
    height: 60px;
    margin-right: 10px;
}
.item-list .left {
    float: left;
}
.item-list p, .item-list span {
    line-height: 1rem;
    font-size: .5rem;
}
.item-list dl {
    overflow: hidden;
    margin:0
}
.member-list dl:nth-child(even) {
  background: #f3f3f3;
}
.member-list span {
    color: #999;
}
/***************分页******************/
.fenye{    background: #f7f7f7;
    padding: 0.37rem 0 0.35rem 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9900;
    border-top: 0.05rem solid #e1e1e1;}
    .fenye .fenye-ul{        display: -moz-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    }
.fenye ul li.fenye-li{ float:left; padding: 0.4rem 0; border:1px solid #ccc;   cursor:pointer; color:#999;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1 1 0%;
    -moz-flex: 1 1 0%;
    -ms-flex: 1 1 0%;
    flex: 1 1 0%;
    text-align: center;}
.fenye ul li a{ color:#999;}
.fenye ul li.xifenye{ width:1.8rem; text-align:center; float:left; position:relative;cursor: pointer;}
.fenye ul li .xab{box-sizing: border-box;
 position:absolute;  border:1px solid #ccc; height:5.5rem; overflow-y: auto;overflow-x: hidden;top:-5.5rem; background-color: #fff; display:inline;left:0px; width:100%;}
.fenye ul li .xab ul{ margin-left:0; padding-bottom:0;}
.fenye ul li .xab ul li{ border:0; padding:0.2rem 0px; color:#999; width:2rem; margin-left:0px; text-align:center;}
.fenye ul li#top,.fenye ul li#down{
border-left:none;
border-right:none;
}
</style>
