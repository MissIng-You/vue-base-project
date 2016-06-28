<template>
  <div id="container" class="layout">

    <router-view
      class="animated"
      keep-alive
      transition="slide"
      transition-mode="out-in">
    </router-view>

  </div>
</template>

<script>
  export default {
    name: 'ContainerView'
  }
</script>
