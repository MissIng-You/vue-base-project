
// import fire-card-list.html
import template from './fire-card-list.html'

import FireCard from '../fire-card'

// export index.js
export default {
  name: 'FireCardList',
  components: {
    FireCard
  },
  template: template,
  replace: true,
  props: {
    theme: {
      type: String,
      default: 'default'
    },
    meta: {
      type: Object
    }
  },
  computed: {
    getTheme () {
      if (!this.theme) return

      return `nav-${this.theme}`
    }
  }
}
