<template>
  <div id="addview">
    <vuetable v-ref:vuetable
              api-url="http://vuetable.ratiw.net/api/users"
              :show-pagination="showPagination"
              pagination-path=""
              :load-on-start="!loadOnStart"
              :fields="fields"
              :table-data="tableData"
              :sort-order="sortOrder"
              table-class="table table-sm table-bordered table-striped table-hover table-hover-outline"
              ascending-icon="fa fa-arrow-up"
              descending-icon="fa fa-arrow-down"
              :item-actions="itemActions"
    ></vuetable>
    <multiselect :selected.sync="selected" :options="options"></multiselect>
  </div>
</template>

<script>
  import customBootstrap from '../../components'

  import multiselect from 'vue-multiselect'

  let { vuetable, vuetablePagination } = customBootstrap

  export default {
    name: 'RoleManageView',
    components: {
      vuetable,
      vuetablePagination,
      multiselect
    },
    data () {
      return {
        selected: null,
        options: ['list', 'of', 'options'],
        showPagination: false,
        loadOnStart: false,
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
        tableData: [{
          name: 'jonslove, con',
          nickname: 'j.c',
          email: 'jonslove@qq.com',
          birthdate: '1932-07-09',
          gender: 'F'
        }, {
          name: 'jonslove, con',
          nickname: 'j.c',
          email: 'jonslove@qq.com',
          birthdate: '1932-07-09',
          gender: 'F'
        }, {
          name: 'jonslove, con',
          nickname: 'j.c',
          email: 'jonslove@qq.com',
          birthdate: '1932-07-09',
          gender: 'F'
        }],
        itemActions: [
          { name: 'view-item', label: '', icon: 'fa fa-fw fa-eye', class: 'btn btn-xs  btn-info' },
          { name: 'edit-item', label: '', icon: 'fa fa-fw fa-pencil', class: 'btn btn-xs btn-success' },
          { name: 'delete-item', label: '', icon: 'fa fa-fw fa-trash', class: 'btn btn-xs btn-danger' }
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
