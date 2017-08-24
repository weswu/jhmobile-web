<template>
  <div>
    <mu-appbar title="数据">
      <mu-icon-button icon='arrow_back' @click="$router.back()"  slot="left"/>
    </mu-appbar>
    <mu-list class="pt10">
      <mu-list-item title="产品" to="/product">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="新闻" to="/news">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="证书" to="/cert">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="相册" to="/album">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="友情链接" to="/link">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
    </mu-list>
  </div>
</template>
