
// import navigation.html
import template from './navigation.html'

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
  template: template,
  replace: true,
  computed: {
    getNavItemMask (index, item) {
      return item && item.icon ? item.icon : 'icon-default'
    },
    getNavItemTitle (index, item) {
      return item && item.title ? item.title : `Title ${index}`
    },
    getNavItemUrl (index, item) {
      return item && item.url ? item.url : '/notfound'
    },
    getNavItemClassByPosition () {
      return getClassByPosition(this.position, '', 'box-horizontal')
    },
    getNavClassByPosition () {
      return getClassByPosition(this.position,
        'nav-inline nav-vertical-divider',
        'nav-stacked nav-horizontal-divider')
    },
    getNavbarClassByPosition () {
      return getClassByPosition(this.position, 'navbar-middle', 'navbar-sidebar')
    }
  },
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
  }
}
