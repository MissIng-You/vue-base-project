<template>
  <div id="baidu">
    <vs-alert
      :show.sync="show"
      :state="state"
      :message="message"
      :dismissible="dismissible">
      <input v-model="alertValue">
      <span>{{ alertValue }}</span>
    </vs-alert>
  </div>
</template>

<script>
  import vuestrapBase from 'vuestrap-base-components'

  export default {
    name: 'BaiduView',

    components: {
      'vs-alert': vuestrapBase.alert
    },

    data () {
      return {
        alertValue: 'default value !',
        show: true,
        dismissible: true,
        message: '<strong>Note</strong> This is an html message',
        state: 'success',
        states: [
          {text: 'default', value: 'default'},
          {text: 'success', value: 'success'},
          {text: 'danger', value: 'danger'},
          {text: 'warning', value: 'warning'},
          {text: 'info', value: 'info'}
        ]
      }
    },

    methods: {

    },

    asyncData: {

    }
  }
</script>
