<template>
  <div id="menulist" class="layout">
    <div class="layout-left fixed">
      <cascading-menu :theme="primary" position="left"
                  :meta="navigationMeta" v-ref:sidebar></cascading-menu>
    </div>

    <div class="layout-center">

      <router-view
        class="animated"
        keep-alive
        transition="slide"
        transition-mode="out-in">
      </router-view>

    </div>
  </div>
</template>

<script>
//  import Vue from 'vue'
  import customBootstrap from '../components'

  let { navigation, cascadingMenu } = customBootstrap

  export default {
    name: 'SidebarView',
    data () {
      return {
        color: '#222',
        size: '20px',
        navigationMeta: {
          items: [{
            icon: 'fa-leaf',
            title: '实时监控',
            url: '/fireDoor/monitor'
          }, {
            icon: 'fa-flag',
            title: '防火门管理',
            url: '/fireDoor/fireManage'
          }, {
            icon: 'fa-object-group',
            title: '设备管理',
            url: '/fireDoor/deviceManage'
          }, {
            icon: 'fa-cogs',
            title: '系统管理',
            url: '',
            subItems: [{
              icon: 'fa-users',
              title: '用户管理',
              url: '/fireDoor/userManage'
            }, {
              icon: 'fa-gears',
              title: '角色管理',
              url: '/fireDoor/roleManage'
            }]
          }]
        }
      }
    },
    components: {
      navigation,
      cascadingMenu
    }
  }
</script>
