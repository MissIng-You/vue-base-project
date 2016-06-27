<template>
  <div id="listbox">
    <grid-loader v-if="$loadingRouteData" :color="color" :size="size"></grid-loader>
    <list v-if="!$loadingRouteData" :theme="primary" :meta="listboxMeta"></list>
  </div>
</template>

<script>
  import { GridLoader } from 'vue-spinner/dist/vue-spinner'
  import customBootstrap from '../components'
  import ApiService from '../api'

  let { list } = customBootstrap
  let { getMenuList } = ApiService

//  let isLoadedOfListbox = false

  export default {
    name: 'ListboxView',
    route: {
      data: function (transition) {
        window.setTimeout(function () {
          getMenuList(function (response) {
            console.log(response)

            transition.next({
              listboxMeta: {
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
        listboxMeta: {
          title: '用户登录',
          showItemCount: 4,
          items: []
        }
      }
    },
    components: {
      list,
      GridLoader
    }
  }
</script>
