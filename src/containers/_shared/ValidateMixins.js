
// validate mixins.

export default {
  props: {
    meta: {
      type: Object,
      default: function () {
        return {}
      }
    },
    validate: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
