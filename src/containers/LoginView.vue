<template>
  <div id="login">
    <login theme="primary" :size="sm" :meta="loginMeta" @login="login"></login>
  </div>
</template>

<script>
  import customBootstrap from '../components'

  let { login } = customBootstrap

  export default {
    name: 'LoginView',
    data () {
      return {
        loginMeta: {
          title: '用户登录',
          username: {
            id: 'username',
            display: '<i class="fa fa-lg fa-fw fa-user"></i>',
            placeholder: '请输入用户名'
          },
          password: {
            id: 'password',
            display: '<i class="fa fa-lg fa-fw fa-key"></i>',
            placeholder: '请输入密码'
          },
          operation: '登录'
        }
      }
    },
    components: {
      login
    },
    methods: {
      login (messages) {
        this.$router.go('/list/navigation')
      }
    }
  }
</script>
