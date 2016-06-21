<template>
  <div id="content">

    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>

  </div>
</template>

<script>
  export default {
    name: 'ContentView'
  }
</script>
