<template>
  <div id="login">
    <login :theme="primary" :size="sm" :meta="loginMeta" @login="login"></login>
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
            display: '用户',
            placeholder: '请输入用户名'
          },
          password: {
            id: 'password',
            display: '密码',
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
        console.log(`this.meta: ${window.JSON.stringify(messages)}`)
        window.alert('login click!')
      }
    }
  }
</script>
