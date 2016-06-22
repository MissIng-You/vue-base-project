<template>
  <div id="app">
    <header-view v-ref:header></header-view>
    <container-view v-ref:container>
      <!--<sidebar-view slot="left" v-ref:sidebar></sidebar-view>-->
      <!--<content-view slot="center" v-ref:content></content-view>-->
    </container-view>
    <footer-view v-ref:footer></footer-view>
  </div>
</template>

<script>
  import HeaderView from '../containers/_layout/HeaderView'
  import ContainerView from '../containers/_layout/ContainerView'
//  import SidebarView from '../containers/_layout/SidebarView'
//  import ContentView from '../containers/_layout/ContentView'
  import FooterView from '../containers/_layout/FooterView'

  export default {
    name: 'AppView',
    components: {
      HeaderView,
      ContainerView,
//      SidebarView,
//      ContentView,
      FooterView
    }
  }
</script>
