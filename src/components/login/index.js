
// import login.html
import template from './login.html'

// import other js

// export index.js
export default {
  template: template,
  replace: true,
  props: {
    meta: {
      type: Object
    },
    theme: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'sm'
    }
  },
  computed: {
    loginVariant () {
      return `login-${this.theme}`
    },
    loginSizeVariant () {
      return `login-${this.size}`
    },
    getLoginMessageState () {
      switch (this.meta.state) {
        case 'success':
          return 'login-message-success'
        case 'error':
          return 'login-message-danger'
        default:
          return ''
      }
    }
  },
  methods: {
    login () {
      let self = this

      self.$validate(true, function () {
        if (self.$validation.invalid) {
          let errorLength = self.$validation.errors.length
          self.$set('meta.state', 'error')
          self.$set('meta.message', self.$validation.errors[errorLength - 1].message)
          console.table(self.$validation.errors)
          return
        }

        self.$dispatch('login', self.meta)
      })
    }
  }
}
