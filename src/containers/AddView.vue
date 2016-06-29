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
          { name: 'view-item', label: '', icon: 'fa fa-eye', class: 'btn btn-xs  btn-info' },
          { name: 'edit-item', label: '', icon: 'edit fa-edit', class: 'btn btn-xs btn-success' },
          { name: 'delete-item', label: '', icon: 'fa fa-trash', class: 'btn btn-xs btn-danger' }
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
