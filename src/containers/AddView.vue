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
    ></vuetable>
    <multiselect :selected.sync="selected" :options="options"></multiselect>
  </div>
</template>

<script>
  import customBootstrap from '../components'

  import multiselect from 'vue-multiselect'

  let { vuetable, vuetablePagination } = customBootstrap

  export default {
    name: 'AddView',
    components: {
      vuetable,
      vuetablePagination,
      multiselect
    },
    data () {
      return {
        selected: null,
        options: ['list', 'of', 'options'],
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
          { name: 'view-item', label: '', icon: 'fa fa-eye', class: 'btn btn-sm  btn-info' },
          { name: 'edit-item', label: '', icon: 'edit fa-edit', class: 'btn btn-sm btn-success' },
          { name: 'delete-item', label: '', icon: 'fa fa-trash', class: 'btn btn-sm btn-danger' }
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
