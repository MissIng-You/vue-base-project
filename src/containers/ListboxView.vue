<template>
  <div id="listbox">
    <list :theme="primary" :meta="listboxMeta"></list>
  </div>
</template>

<script>
  import customBootstrap from '../components'

  let { list } = customBootstrap

  export default {
    name: 'ListboxView',
    data () {
      return {
        listboxMeta: {
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
            icon: 'fa-fire',
            title: '地图页面',
            url: '/arcgis'
          }, {
            icon: 'fa-fire',
            title: '地图页面',
            url: '/arcgis'
          }, {
            icon: 'fa-feed',
            title: '登录页面',
            url: '/login'
          }, {
            icon: 'fa-fire',
            title: '地图页面',
            url: '/arcgis'
          }, {
            icon: 'fa-fire',
            title: '地图页面',
            url: '/arcgis'
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
      list
    }
  }
</script>
