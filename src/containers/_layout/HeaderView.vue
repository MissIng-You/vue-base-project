<template>
  <div id="header">
    <navigation :theme="primary" :position="top" :meta="navigationMeta">
      <div class="nav-header" slot="header">
        <img src="../../assets/images/logo.png" alt="logo" class="header-logo">
        <span class="header-title">{{navigationMeta.title}}</span>
      </div>
      <div class="nav-footer" slot="footer">
        <div class="box box-horizontal box-thermometer" @click="toggleUserProfile">
          <img src="../../assets/images/logo.png" alt="logo" class="box-mask">
          <span class="box-title">{{navigationMeta.title}}</span>
        </div>
        <div class="nav-footer-wrap animated" :class="{'fadeIn': userMeta.isShow, 'fadeOut': !userMeta.isShow}" v-show="userMeta.isShow">
          <list :meta="userMeta" orientation="horizontal"></list>
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
          title: 'Vue.js Project V1.0',
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
            icon: 'fa-list',
            title: '左侧菜单',
            url: '/list'
          }, {
            icon: 'fa-plus',
            title: '更多菜单',
            url: '/more'
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
