<template>
  <div>
    <mu-appbar title="我的">
      <mu-icon-button icon='arrow_back' @click="$router.back()"  slot="left"/>
    </mu-appbar>
    <mu-list class="pt10">
      <mu-list-item title="账号资料" to="/user">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="企业资料" to="/enterprise">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="公安备案" to="/beian">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="域名绑定" to="/bind">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="一键发布" to="/publish">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <br/>
      <mu-list-item title="设置" to="/setting">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
    </mu-list>
  </div>
</template>
