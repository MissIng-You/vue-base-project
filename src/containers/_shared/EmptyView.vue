<template>
  <div id="menulist" class="layout">
    <div class="layout-left fixed">
      <cascading-menu :theme="primary" position="left"
                  :meta="navigationMeta" v-ref:sidebar></cascading-menu>
    </div>

    <div class="layout-center">

      <!--<router-view-->
        <!--class="view"-->
        <!--keep-alive-->
        <!--transition-->
        <!--transition-mode="out-in">-->
      <!--</router-view>-->
      {{msg}}
    </div>
  </div>
</template>

<script>
//  import Vue from 'vue'
  import customBootstrap from '../../components'

  let { navigation, cascadingMenu } = customBootstrap

  export default {
    name: 'EmptyView',
    data () {
      return {
        msg: '网站正在建设中...',
        navigationMeta: {
          items: [{
            icon: 'fa-leaf',
            title: '实时监控',
            url: '/fireDoor/monitor'
          }, {
            icon: 'fa-object-group',
            title: '防火门监控器',
            url: '/fireDoor/deviceManage'
          }, {
            icon: 'fa-flag',
            title: '防火门管理',
            url: '/fireDoor/fireManage'
          },{
            icon: 'fa-ra',
            title: '单位管理',
            url: '/fireDoor/communityManage'
          }, {
            icon: 'fa-users',
            title: '用户管理',
            url: '/fireDoor/userManage'
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
