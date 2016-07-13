<template>
  <div id="header">
    <navigation :theme="primary" :position="top" :meta="navigationMeta">
      <div class="nav-header" slot="header">
        <img src="../../assets/images/logo.png" alt="logo" class="header-logo">
        <span class="header-title">{{navigationMeta.title}}</span>
      </div>
      <div class="nav-footer" slot="footer">
        <div class="box box-horizontal box-thermometer" @focusout="toggleUserProfile" @click="toggleUserProfile">
          <img src="../../assets/images/logo.png" alt="logo" class="box-mask">
          <span class="box-title">{{userMeta.username}}</span>
        </div>
        <div class="nav-footer-wrap animated" :class="{'fadeIn': userMeta.isShow, 'fadeOut': !userMeta.isShow}" v-show="userMeta.isShow">
          <list :meta="userMeta" orientation="vertical"></list>
        </div>
      </div>
    </navigation>
  </div>
</template>

<script>
  import customBootstrap from '../../components'

  let { navigation, list } = customBootstrap

  export default {
    name: 'HeaderView',
    data () {
      return {
        userMeta: {
          username: 'administritor',
          role: '公司超级管理员',
          isShow: false,
          items: [{
            icon: 'fa-cog',
            title: '设置',
            url: '/config'
          }, {
            icon: 'fa-sign-in',
            title: '登录',
            url: '/login'
          }, {
            icon: 'fa-sign-out',
            title: '退出',
            url: '/loginout'
          }]
        },
        navigationMeta: {
          logo: '../../../src/assets/images/logo.png',
          title: '防火门远程监控系统',
          items: [{
            icon: 'fa-dashboard',
            title: '防火门监控',
            url: '/fireDoor'
          }, {
            icon: 'fa-cubes',
            title: '电器火灾监控',
            url: '/electrical'
          }, {
            icon: 'fa-wpbeginner',
            title: '消防电源监控',
            url: '/firePower'
          }]
        }
      }
    },
    methods: {
      toggleUserProfile () {
        this.$set('userMeta.isShow', !this.userMeta.isShow)
      }
    },
    components: {
      navigation,
      list
    }
  }
</script>
