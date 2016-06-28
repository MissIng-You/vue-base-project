<template>
  <div id="addview">
    <vuetable v-ref:vuetable
              api-url="http://vuetable.ratiw.net/api/users"
              pagination-path=""
              :fields="fields"
              :sort-order="sortOrder"
              table-class="table table-bordered table-striped table-hover"
              ascending-icon="fa fa-arrow-up"
              descending-icon="fa fa-arrow-down"
              pagination-class=""
              pagination-info-class=""
              pagination-component-class=""
              :pagination-component="vuetablePagination"
              :item-actions="itemActions"
              :append-params="moreParams"
              :per-page="perPage"
              wrapper-class="vuetable-wrapper"
              table-wrapper=".vuetable-wrapper"
              loading-class="loading"
    ></vuetable>
  </div>
</template>

<script>
  import customBootstrap from '../components'

  let { vuetable, vuetablePagination } = customBootstrap

  export default {
    name: 'AddView',
    components: {
      vuetable,
      vuetablePagination
    },
    data () {
      return {
        vuetablePagination: 'vuetable-pagination',
        fields: [
          'name',
          'nickname',
          'email',
          'birthdate',
          'gender',
          '__actions'
        ],
        columns: [
          'name',
          'nickname',
          'email',
          'birthdate',
          'gender',
          '__actions'
        ],
        itemActions: [
          { name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button' },
          { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button' },
          { name: 'delete-item', label: '', icon: 'delete icon', class: 'ui red button' }
        ]
      }
    },
    methods: {
      viewProfile (id) {
        console.log('view profile with id:', id)
      }
    },
    events: {
      'vuetable:action': function (action, data) {
        console.log('vuetable:action', action, data)
        if (action === 'view-item') {
          this.viewProfile(data.id)
        }
      },
      'vuetable:load-error': function (response) {
        console.log('Load Error: ', response)
      }
    }
  }
</script>
