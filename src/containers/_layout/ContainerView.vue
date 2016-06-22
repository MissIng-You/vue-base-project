<template>
  <div id="container" class="layout">

    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>

    <!--<div class="layout-left">-->
      <!--<slot name="left"></slot>-->
    <!--</div>-->
    <!--<div class="layout-center">-->
      <!--<slot name="center"></slot>-->
    <!--</div>-->
    <!--<div class="layout-right">-->
      <!--<slot name="right"></slot>-->
    <!--</div>-->

  </div>
</template>

<script>
  export default {
    name: 'ContainerView'
  }
</script>
