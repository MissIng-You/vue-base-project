<template>
  <div id="menulist" class="layout">
    <div v-if="$loadingRouteData">Loading ...</div>
    <div class="layout-left">
      <navigation v-if="!$loadingRouteData" :theme="primary" :position="position" :meta="navigationMeta" v-ref:sidebar></navigation>
    </div>
    <div class="layout-center">

      <router-view
        class="view"
        keep-alive
        transition
        transition-mode="out-in">
      </router-view>

    </div>
  </div>
</template>

<script>
  import customBootstrap from '../components'

  let { list, navigation } = customBootstrap

  export default {
    name: 'SidebarView',
    // http://router.vuejs.org/en/pipeline/data.html
    route: {
      data: function (transition) {
        window.setTimeout(function () {
          transition.next({
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
          })
        }, 1000)
      }
    },
    data () {
      return {
        position: 'left',
        navigationMeta: {
          title: '用户登录',
          showItemCount: 4,
          items: []
        }
      }
    },
    components: {
      list,
      navigation
    },
    ready () {
//      console.log(this.$parent)
//      console.log(this.$root.$refs.sidebar.$data.navigationMeta.items)
//      console.log(this.$refs.list)
    }

  }
</script>
