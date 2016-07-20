<template>
  <div id="login">
    <login theme="primary" :size="sm" :meta="loginMeta" @login="onLogin"></login>
  </div>
</template>

<script>
  import customBootstrap from '../components'
  import ApiServices from '../api'

  let { login } = customBootstrap
  let { checkLogin } = ApiServices

  export default {
    name: 'LoginView',
    data () {
      return {
        loginMeta: {
          title: '用户登录',
          username: {
            id: 'username',
            label: '<i class="fa fa-lg fa-fw fa-user"></i>',
            placeholder: '请输入用户名',
            validate: {
              required: {rule: true, message: '用户名是必须的'},
              minlength: {rule: 3, message: '用户名必须大于三个字符'}
            }
          },
          password: {
            id: 'password',
            label: '<i class="fa fa-lg fa-fw fa-key"></i>',
            placeholder: '请输入密码',
            validate: {
              required: {rule: true, message: '登录密码是必须的'},
              minlength: {rule: 3, message: '登录密码必须大于三个字符'}
            }
          },
          operation: '登录',
          message: '',
          state: ''
        }
      }
    },
    components: {
      login
    },
    methods: {
      _updateUser (loginQuery) {
        let header = this.$root.$refs.header
        header.$set('userMeta.username', loginQuery.user)
        header.$set('isShow', true)
      },
      _checkLogin (loginQuery) {
        let self = this

        checkLogin(loginQuery, function (response) {
          let data = response.data

          if (!!data.Success && data.Redirect) {
            self.$set('loginMeta.message', '正在跳转，请稍后...')
            self.$set('loginMeta.state', 'success')
            window.setTimeout(function () {
              self.$router.go(data.Redirect)
              self.$set('loginMeta.state', '')
              self._updateUser(loginQuery)
            }, 500)
          } else if (data.Error) {
            self.$set('loginMeta.message', data.Error)
            self.$set('loginMeta.state', 'error')
          } else {
            self.$set('loginMeta.message', '未知异常，请联系管理员!')
            self.$set('loginMeta.state', 'error')
          }
        })
      },
      onLogin (meta) {
        let loginQuery = {
          user: meta.username.value,
          pwd: meta.password.value
        }

        this._checkLogin(loginQuery)
      }
    },
    ready: function () {
      this.$root.$refs.header.$set('isShow', false)
    }
  }
</script>
