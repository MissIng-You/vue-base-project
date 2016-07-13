<template>
  <div id="index-view">

    <div class="card card-blockquote">
      <div class="card-header card-primary-outline">
        <i class="card-mask fa fa-object-group"></i>
        <span class="card-title">设备管理</span>
        <span class="card-search-group">
            <span class="input-group input-group-sm input-width-sm">
              <input type="text" class="form-control" @keyup="onSearch" v-model="fireQuery.search" placeholder="在此搜索设备信息">
              <span class="input-group-addon btn btn-primary" @click="onSearch"><i class="fa fa-fw fa-search"></i></span>
            </span>
          </span>
        <span class="card-state card-state-hover pull-right"><i class="fa fa-fw fa-plus"></i></span>
      </div>
      <div class="card-body">
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
                  :item-actions="itemActions">
        </vuetable>
      </div>
      <div class="card-footer card-danger-outline">
        <i class="card-mask fa fa-pie-chart"></i>
        <span class="card-title">{{paginationMeta.totalCount}}(条)</span>
        <span class="card-pagination">
          <pagination shape="normal"
                      :total-rows="paginationMeta.totalCount"
                      :current-page.sync="paginationMeta.currentPage"
                      :per-page="paginationMeta.perPage"
                      @item-click="onItemClick">
          </pagination>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import customBootstrap from '../../components'
  import multiselect from 'vue-multiselect'

  let { list, pagination, vuetable } = customBootstrap

  export default {
    name: 'DeviceManageView',
    components: {
      list,
      multiselect,
      pagination,
      vuetable
    },
    data () {
      return {
        fireQuery: {
          search: '',
          pageIndex: 1,
          pageSize: 8
        },
        paginationMeta: {
          perPage: 10,
          totalCount: 100,
          currentPage: 1
        },
        deviceManageMeta: {
          totalCount: 100,
          items: [{
            icon: 'fa-check-square-o',
            title: '乡镇、村、组',
            url: '/baidu'
          }, {
            icon: 'fa-check-square-o',
            title: '户主姓名',
            url: '/todo'
          }, {
            icon: 'fa-check-square-o',
            title: '水表编号',
            url: '/login'
          }, {
            icon: 'fa-check-square-o',
            title: '累计用水量',
            url: '/arcgis'
          }, {
            icon: 'fa-square-o',
            title: '左侧菜单',
            url: '/sidebar'
          }, {
            icon: 'fa-square-o',
            title: '更多菜单',
            url: '/more'
          }]
        },
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
      onToggleSearch () {
        this.$set('showConfigBox', false)
        this.$set('showSearchBox', !this.showSearchBox)
      },
      onToggleConfig () {
        this.$set('showSearchBox', false)
        this.$set('showConfigBox', !this.showConfigBox)
      },
      onItemClick (item) {

      },
      onSearch () {

      }
    }
  }
</script>
