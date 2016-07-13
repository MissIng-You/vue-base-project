
// import navigation.html
import template from './cascading-menu.html'

// import other js

// get class by this position direction.
const getClassByPosition = (position, xdirectClass, ydirectClass) => {
  let boxPosition

  switch (position) {
    case 'top':
    case 'bottom':
      boxPosition = xdirectClass
      break
    case 'left':
    case 'right':
      boxPosition = ydirectClass
      break
    default:
      boxPosition = xdirectClass
  }

  return boxPosition
}

export default {
  name: 'CascadingMenu',
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
    position: {
      type: String,
      default: 'top'
    },
    direction: {
      type: String,
      default: 'ltr'
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    getNavItemClassByPosition () {
      return getClassByPosition(this.position, 'box-maroon', 'box-horizontal box-purple')
    },
    getNavClassByPosition () {
      return getClassByPosition(this.position,
        'nav-inline', //  nav-vertical-divider
        'nav-stacked')
    },
    getNavbarClassByPosition () {
      return getClassByPosition(this.position, 'navbar-middle', 'navbar-sidebar')
    }
  },
  methods: {
    toggleSubItems (index, item) {
      this.$set(`meta.items[${index}].isOpen`, !item.isOpen)
       // this.$nextTick()    // notify dom update
      return
    },
    getActiveClassByItem (item) {
      return item.isOpen && item.subItems && item.subItems.length > 0 ? 'active' : ''
    }
  }
}
