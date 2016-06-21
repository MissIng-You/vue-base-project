<template>
  <div id="app">
    <header-view></header-view>
    <container-view>
      <sidebar-view slot="left"></sidebar-view>
      <content-view slot="center"></content-view>
    </container-view>
    <footer-view></footer-view>
  </div>
</template>

<script>
  import HeaderView from '../containers/_layout/HeaderView'
  import ContainerView from '../containers/_layout/ContainerView'
  import SidebarView from '../containers/_layout/SidebarView'
  import ContentView from '../containers/_layout/ContentView'
  import FooterView from '../containers/_layout/FooterView'

  export default {
    name: 'AppView',
    components: {
      HeaderView,
      ContainerView,
      SidebarView,
      ContentView,
      FooterView
    }
  }
</script>
