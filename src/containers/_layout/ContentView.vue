<template>
  <div id="content">

    <router-view
      class="animated"
      keep-alive
      transition="bounce"
      transition-mode="out-in">
    </router-view>

  </div>
</template>

<script>
  export default {
    name: 'ContentView'
  }
</script>
