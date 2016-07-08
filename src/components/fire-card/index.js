
// import box.html
import template from './fire-card.html'

// export index.js
export default {
  name: 'FireCard',
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
    getThemeByState () {
      let theme = ''

      // 属性值与状态值相同，则表示正常；反之表示异常
      if (this.meta.state === this.meta.property) {
        theme = 'card-success-outline'
      } else {
        theme = 'card-danger-outline'
      }

      return theme
    },
    getIconByState () {
      let stateIcon = ''

      // "0"表示正常；"1"表示异常
      if (this.meta.state === this.meta.property) {
        stateIcon = 'fa-info-circle card-mask-success'
      } else {
        stateIcon = 'fa-info-circle card-mask-danger'
      }

      return stateIcon
    },
    getPropertyName () {
      let propertyName = ''

      // "0"表示"常开门"；"1"表示"常关门"
      if (this.meta.property === 0) {
        propertyName = '【常开式】'
      } else {
        propertyName = '【常关式】'
      }

      return propertyName
    },
    getStateName () {
      let propertyName = ''

      // "0"表示"开"；"1"表示"关"
      if (this.meta.state === 0) {
        propertyName = '开'
      } else {
        propertyName = '关'
      }

      return propertyName
    },
    getStateColorByState () {
      let stateColor = ''

      // "0"表示正常；"1"表示异常
      if (this.meta.state === this.meta.property) {
        stateColor = 'card-state-success'
      } else {
        stateColor = 'card-state-danger'
      }

      return stateColor
    }
  }
}
