<template>
  <div id="navigation">
    <navigation :theme="primary" :position="top" :meta="navigationMeta">
      <div slot="header">
        <div class="nav-header">
          <img src="../assets/images/logo.png" alt="logo" class="header-logo">
          <span class="header-title">{{navigationMeta.title}}</span>
        </div>
      </div>
    </navigation>
  </div>
</template>

<script>
  import customBootstrap from '../components'

  let { navigation } = customBootstrap

  export default {
    name: 'NavigationView',
    data () {
      return {
        navigationMeta: {
          logo: '../../src/assets/images/logo.png',
          title: 'Vue.js Project V1.0',
          showItemCount: 4,
          items: [{
            icon: 'fa-home',
            title: '控制面板',
            url: '/baidu'
          }, {
            icon: 'fa-cog',
            title: '设置列表',
            url: '/todo'
          }, {
            icon: 'fa-feed',
            title: '登录页面',
            url: '/login'
          }, {
            icon: 'fa-fire',
            title: '地图页面',
            url: '/arcgis'
          }, {
            icon: 'fa-list',
            title: '左侧菜单',
            url: '/sidebar'
          }, {
            icon: 'fa-plus',
            title: '更多菜单',
            url: '/more'
          }]
        }
      }
    },
    components: {
      navigation
    }
  }
</script>
