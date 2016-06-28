
// export component
export default {
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

      return `box-${this.theme}`
    },
    getSize () {
      if (!this.size) return

      return `box-${this.size}`
    },
    getOrientation () {
      if (this.orientation === 'horizontal') {
        return 'box-horizontal'
      } else if (this.orientation === 'vertical') {
        return ''
      }
    }
  }
}
