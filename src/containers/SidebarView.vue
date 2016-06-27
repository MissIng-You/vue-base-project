<template>
  <div id="menulist" class="layout">
    <div class="layout-left">
      <grid-loader v-if="$loadingRouteData" :color="color" :size="size"></grid-loader>
      <cascading-menu v-if="!$loadingRouteData" :theme="primary" :position="position"
                  :meta="navigationMeta" v-ref:sidebar></cascading-menu>
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

  let { navigation, cascadingMenu } = customBootstrap
  let { getMenuList } = ApiService

  let isLoadedOfMenuList = false

  export default {
    name: 'SidebarView',
    // http://router.vuejs.org/en/pipeline/data.html
    route: {
      data: function (transition) {
        if (isLoadedOfMenuList) return transition.next()
        window.setTimeout(function () {
          getMenuList(function (response) {
            console.log(response)
            isLoadedOfMenuList = true

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
      navigation,
      cascadingMenu,
      GridLoader
    },
    ready () {
//      console.log(this.$parent)
//      console.log(this.$root.$refs.sidebar.$data.navigationMeta.items)
//      console.log(this.$refs.list)
    }

  }
</script>
