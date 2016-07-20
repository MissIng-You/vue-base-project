
// import list.html
import template from './list.html'

// import box component
import Box from '../box'

// export index.js
export default {
  components: {
    Box
  },
  name: 'List',
  template: template,
  replace: true,
  props: {
    theme: {
      type: String,
      default: 'default'
    },
    meta: {
      type: Object
    },
    orientation: {
      type: String,
      default: 'auto'
    },
    size: {
      type: String,
      default: 'xs'
    }
  },
  computed: {
    getTheme () {
      if (!this.theme) return

      return `nav-${this.theme}`
    },
    getSize () {
      if (!this.size) return

      return `nav-${this.size}`
    },
    getOrientation () {
      if (this.orientation === 'horizontal') {
        return 'nav-inline'
      } else if (this.orientation === 'vertical') {
        return 'nav-stacked'
      }
    },
    getBoxOrientation () {
      if (this.orientation === 'horizontal') {
        return 'vertical'
      } else if (this.orientation === 'vertical') {
        return 'horizontal'
      }
    }
  },
  methods: {
    onItemClick (item) {
      this.$dispatch('item-click', item + 1)
    }
  }
}
