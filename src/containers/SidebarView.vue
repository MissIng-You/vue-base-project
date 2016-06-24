<template>
  <div id="menulist" class="layout">
    <div class="layout-left">
      <grid-loader v-if="$loadingRouteData" :color="color" :size="size"></grid-loader>
      <navigation v-if="!$loadingRouteData" :theme="primary" :position="position"
                  :meta="navigationMeta" v-ref:sidebar></navigation>

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
  import { GridLoader } from 'vue-spinner/dist/vue-spinner'
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
        }, 3000)
      }
    },
    data () {
      return {
        scrollClass: 'my-scrollbar',
        color: '#222',
        size: '20px',
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
      navigation,
      GridLoader
    },
    ready () {
//      console.log(this.$parent)
//      console.log(this.$root.$refs.sidebar.$data.navigationMeta.items)
//      console.log(this.$refs.list)
    }

  }
</script>
