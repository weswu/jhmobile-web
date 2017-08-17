<template>
  <div style="width:100%;height:100%;">
    <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left' style="position: absolute;"/>
    <iframe :src="'http://www.jihui88.com/wcd/html/'+$route.params.id+'.html?debug=01'" style="width:100%;height:100%;border:none;"></iframe>
  </div>
</template>
