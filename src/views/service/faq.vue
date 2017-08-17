<template>
  <div>
    <mu-appbar title='FAQ'>
      <mu-icon-button icon='arrow_back' @click='$router.back()'  slot='left'/>
    </mu-appbar>

    <mu-list>
      <mu-list-item title="如何启动全网营销系统" href="#/faq1">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="安卓清除缓存" href="#/faq2">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
    </mu-list>
  </div>
</template>
