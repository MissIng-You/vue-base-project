<template>
  <div id="app">
    <navigation-view></navigation-view>
    <!--<div class="nav nav-tripped">-->
      <!--<a v-link="{ path: '/todo', activeClass: 'active' }">Todo Demo</a>-->
      <!--<a v-link="{ path: '/hello', activeClass: 'active' }">Hello Page</a>-->
      <!--<a v-link="{ path: '/arcgis', activeClass: 'active' }">Arcgis Page</a>-->
      <!--<a v-link="{ path: '/baidu', activeClass: 'active' }">Alert Page</a>-->
      <!--<a v-link="{ path: '/login' }">Login Page</a>-->
      <!--<a v-link="{ path: '/nav' }">Navigation Page</a>-->
    <!--</div>-->
    <!--<img class="logo" src="../assets/images/logo.png">-->
    <!-- main view -->
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>

    <p class="footer">
      Welcome to your Vue.js app!
    </p>
  </div>
</template>

<script>
  import NavigationView from './NavigationView'

  export default {
    name: 'AppView',
    components: {
      NavigationView
    }
  }
</script>
