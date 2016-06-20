
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
    }
  },
  methods: {
    login () {
      console.log('components click!')
      this.$dispatch('login', this.meta)
    }
  }
}
