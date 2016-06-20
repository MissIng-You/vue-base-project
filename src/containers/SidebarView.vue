<template>
  <div id="sidebar">
    <navigation :theme="primary" :position="position" :meta="navigationMeta"></navigation>
  </div>
</template>

<script>
  import customBootstrap from '../components'

  let { navigation } = customBootstrap

  export default {
    name: 'SidebarView',
    data () {
      return {
        position: 'left',
        navigationMeta: {
          title: '用户登录',
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
