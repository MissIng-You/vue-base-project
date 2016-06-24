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
//  import Vue from 'vue'
  import customBootstrap from '../components'
  import ApiService from '../api'

  let { list, navigation } = customBootstrap
  let { getMenuList } = ApiService

  export default {
    name: 'SidebarView',
    // http://router.vuejs.org/en/pipeline/data.html
    route: {
      data: function (transition) {
        window.setTimeout(function () {
          getMenuList(function (response) {
            console.log(response)
            transition.next({
              navigationMeta: {
                items: response.data.items
              }
            })
          }, function (error) {
            console.log(error)
          })
        }, 1000)
      }
    },
    data () {
      return {
        position: 'left',
        navigationMeta: {
          message: 'xxx',
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
