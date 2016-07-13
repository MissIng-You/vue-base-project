<template>
  <div id="sidebar">
    <navigation :theme="primary" position="left" :meta="navigationMeta"></navigation>
    <h1>{{message}}</h1>
  </div>
</template>

<script>
  import customBootstrap from '../../components'

  let { navigation } = customBootstrap

  export default {
    name: 'SidebarView',
    data () {
      return {
        navigationMeta: {
          items: [{
            icon: 'fa-leaf',
            title: '实时监控',
            url: '/fireDoor/monitor'
          }, {
            icon: 'fa-object-group',
            title: '设备管理',
            url: '/fireDoor/deviceManage'
          }, {
            icon: 'fa-cogs',
            title: '系统管理',
            url: '/fireDoor/sysManage',
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
      navigation
    }
  }
</script>
