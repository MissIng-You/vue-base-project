
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
        theme = 'card-default-outline'
      } else {
        theme = 'card-default-outline'
      }

      return theme
    },
    showMessageByState () {
      let messageState = false

      // 二者相等，表示正常，否则，表示异常
      if (this.meta.state === this.meta.property) {
        messageState = true
      }

      return messageState
    },
    getIconByState () {
      let stateIcon = ''

      // "0"表示正常；"1"表示异常
      if (this.meta.state === this.meta.property) {
        stateIcon = 'fa-info-circle card-mask-success'
      } else {
        stateIcon = 'fa-warning card-mask-danger'
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

      // "0"表示正常；"1"表示异常
      if (this.meta.state === this.meta.property) {
        propertyName = '正常'
      } else {
        propertyName = `异常(${this.getStates.length})`
      }

      return propertyName
    },
    getStateColorByState () {
      let stateColor = ''

      // "0"表示正常；"1"表示异常
      if (this.meta.state === this.meta.property) {
        stateColor = 'label-success'
      } else {
        stateColor = 'label-danger'
      }

      return stateColor
    },
    getStates () {
      let descriptions = []

      if (this.meta.description) {
        descriptions = this.meta.description.split(',')
      } else if (this.meta.description === '') {
        descriptions.push('未提供异常描述')
      }

      return descriptions
    },
    getStatesColor () {
      let statesColor = ''

      if (this.meta.description) {
        statesColor = 'label-default'
      } else if (this.meta.description === '') {
        statesColor = 'label-default'
      } else {
        statesColor = 'label-success'
      }

      return statesColor
    }
  },
  methods: {
    getStatesStyle (state) {
     /* let length = state && state.length
      let width = '100%'

      if (length <= 4) {
        width = '33.33%'
      } else if (length <= 8) {
        width = '50%'
      }

      return {
        width
      }  */
    }
  }
}
