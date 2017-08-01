<template>
  <div class="point">
    <div class="fixed-bar">
      <mu-appbar title="积分排行">
        <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
      </mu-appbar>
    </div>
    <div class="app-content">
      <div class="item-list">
		    <dl>
		        <dd class="item-row-1-5">名次</dd>
		        <dd class="item-row-6">企业</dd>
		        <dd class="item-row-2-5">积分</dd>
		    </dl>
			  <dl v-for="item,index in list">
		        <dd class="item-row-1-5">{{index + 1}}</dd>
		        <dd class="item-row-6">{{item.integralRecordDesc}}</dd>
		        <dd class="item-row-2-5">{{item.useable}}&nbsp;分</dd>
			  </dl>
		  </div>
      <div class="hr"></div>
      <a href="javascript:;" class="view-more" @click="more" v-if="page < 5">查看更多</a>
      <div class="hr"></div>
      <mu-list>
        <mu-list-item>
          <div slot='title'>
            <div style="font-size: 18px;">
              大数据显示
            </div>
          </div>
        </mu-list-item>
        <mu-list-item>
          <div slot='title'>
             您当前的排行：第<span class="number">{{point.rank}}</span>名
          </div>
          <div slot='right'>
            <span>共{{point.point}}积分</span>
          </div>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item>
          <div slot='title'>
             已经击败了<span class="number">{{number}}%</span>的同道
          </div>
        </mu-list-item>
        <mu-divider/>
      </mu-list>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      number: 0,
      point: this.$store.state.point,
      list: [],
      page: 1
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
      this.$http.get('/rest/api/point/rank?page=' + this.page + '&pageSize=10').then((res) => {
        var data = res.data.attributes.data
        if (data.length > 0) {
          for (var item of data) {
            this.list.push(item)
          }
        }
        if (data.length < 10) {
          this.page = 6
        }
        if (this.point.rank !== 0 && this.page === 1) {
          this.number = ((res.data.attributes.count - this.point.rank) / res.data.attributes.count).toFixed(2) * 100
        }
      })
    },
    more () {
      if (this.page < 6) {
        this.page += 1
        this.get()
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


.view-more {
    color: #666;
    text-align: center;
    padding: 0.5rem;
    display: block;
}
.number {
    color: #ff7300;
    padding: 0 0.3rem;
}
</style>
