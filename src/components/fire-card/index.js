
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
      if (this.meta.TJGZStatus === this.meta.FireDoorType) {
        theme = 'card-default-outline'
      } else {
        theme = 'card-default-outline'
      }

      return theme
    },
    showMessageByState () {
      let messageState = false

      // 二者相等，表示正常，否则，表示异常
      if (this.meta.TJGZStatus === this.meta.FireDoorType) {
        messageState = true
      }

      return messageState
    },
    getIconByState () {
      let stateIcon = ''

      // "0"表示正常；"1"表示异常
      if (this.meta.TJGZStatus === this.meta.FireDoorType) {
        stateIcon = 'fa-info-circle card-mask-success'
      } else {
        stateIcon = 'fa-warning card-mask-danger'
      }

      return stateIcon
    },
    getFireDoorTypeName () {
      let FireDoorTypeName = ''

      // "0"表示"常开门"；"1"表示"常关门"
      if (this.meta.FireDoorType === 0) {
        FireDoorTypeName = '【常开式】'
      } else {
        FireDoorTypeName = '【常关式】'
      }

      return FireDoorTypeName
    },
    getStateName () {
      let FireDoorTypeName = ''

      // "0"表示正常；"1"表示异常
      if (this.meta.TJGZStatus === this.meta.FireDoorType) {
        FireDoorTypeName = '正常'
      } else {
        FireDoorTypeName = `异常(${this.getStates.length})`
      }

      return FireDoorTypeName
    },
    getStateColorByState () {
      let stateColor = ''

      // "0"表示正常；"1"表示异常
      if (this.meta.TJGZStatus === this.meta.FireDoorType) {
        stateColor = 'label-success'
      } else {
        stateColor = 'label-danger'
      }

      return stateColor
    },
    getStates () {
      let TJGZDescriptions = []

      if (this.meta.TJGZDescription) {
        TJGZDescriptions = this.meta.TJGZDescription.split(',')
      } else if (this.meta.TJGZDescription === '') {
        TJGZDescriptions.push('未提供异常描述')
      }

      return TJGZDescriptions
    },
    getStatesColor () {
      let statesColor = ''

      if (this.meta.TJGZDescription) {
        statesColor = 'label-default'
      } else if (this.meta.TJGZDescription === '') {
        statesColor = 'label-default'
      } else {
        statesColor = 'label-success'
      }

      return statesColor
    }
  },
  methods: {
    getStatesStyle (TJGZStatus) {
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
    },
    onFireCardClick () {
      this.$dispatch('fire-card-click')
    }
  }
}
