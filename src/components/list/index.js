
// import list.html
import template from './list.html'

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
    orientation: {
      type: String,
      default: 'auto'
    }
  }
}
