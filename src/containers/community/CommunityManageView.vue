<template>
  <div id="index-view">

    <div class="card card-blockquote">
      <div class="card-header card-primary-outline">
        <i class="card-mask fa fa-users"></i>
        <span class="card-title">用户管理</span>
        <span class="card-search-group">
            <span class="input-group input-group-sm input-width-sm">
              <input type="text" class="form-control" @keypress.enter="onSearch" v-model="queryMeta.search" placeholder="在此搜索用户/手机信息">
              <span class="input-group-addon btn btn-primary" @click="onSearch"><i class="fa fa-fw fa-search"></i></span>
            </span>
          </span>
        <span class="card-state card-state-hover pull-right" @click="onTableAdd"><i class="fa fa-fw fa-plus"></i></span>
      </div>
      <div class="card-body">
        <add-community-view :meta="addCommunityMeta" :validate="addCommunityValidateMeta"></add-community-view>
        <update-community-view :meta="updateCommunityMeta"></update-community-view>
        <delete-community-view :meta="deleteCommunityMeta"></delete-community-view>
        <vuetable v-ref:vuetable
                  api-url="/api/user-service/getCommunityListMock.json"
                  :show-pagination="userDefineMeta.showPagination"
                  pagination-path=""
                  :load-on-start="userDefineMeta.loadOnStart"
                  :fields="userDefineMeta.fields"
                  :table-data="userListMeta.items"
                  :sort-order="sortOrder"
                  table-class="table table-sm table-bordered table-striped table-hover table-hover-outline"
                  ascending-icon="fa fa-arrow-up"
                  descending-icon="fa fa-arrow-down"
                  :item-actions="userDefineMeta.itemActions">
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
  import ApiService from '../../api'
  import AddCommunityView from './AddCommunityView'
  import UpdateCommunityView from './UpdateCommunityView'
  import DeleteCommunityView from './DeleteCommunityView'

  let { pagination, vuetable } = customBootstrap
  let {
    getCommunityList,
    getCommunityById
    } = ApiService.roleService
  let isLoadedOfFirst = false

  export default {
    name: 'CommunityManageView',
    components: {
      pagination,
      vuetable,
      AddCommunityView,
      UpdateCommunityView,
      DeleteCommunityView
    },
    route: {
      data: function (transition) {
        if (isLoadedOfFirst) return transition.next()

        this._searchCommunity()
      }
    },
    data () {
      return {
        queryMeta: {
          search: '',
          pageIndex: 1,
          pageSize: 10
        },
        paginationMeta: {
          perPage: 10,
          totalCount: 100,
          currentPage: 1
        },
        addCommunityMeta: {},
        addCommunityValidateMeta: [],
        updateCommunityMeta: {},
        deleteCommunityMeta: {},
        userListMeta: {
          totalCount: 0,
          items: []
        },
        userDefineMeta: {
          modalType: 'normal',
          showPagination: false,
          loadOnStart: false,
          fields: [
            {name: 'CommunityID', visible: false},
            {name: 'CommunityID', visible: false},
            {name: 'CommunityName', title: '登录名称'},
            {name: 'Telphone', title: '手机号码'},
            {name: 'CommunityState', title: '用户状态'},
            {name: 'AddTime', title: '注册时间'},
            {name: '__actions', title: '操作列'}
          ],
          itemActions: [
//            { name: 'view-item', label: '', icon: 'fa fa-fw fa-eye', class: 'btn btn-xs  btn-info' },
            { name: 'update-item', label: '', icon: 'fa fa-fw fa-pencil', class: 'btn btn-xs btn-success' },
            { name: 'delete-item', label: '', icon: 'fa fa-fw fa-trash', class: 'btn btn-xs btn-danger' }
          ]
        }
      }
    },
    watch: {
      'userListMeta.totalCount': function (newVal, oldVal) {
        this.$set('paginationMeta.totalCount', newVal)
      },
      'queryMeta.pageIndex': function (newVal, oldVal) {
        this.$set('paginationMeta.currentPage', newVal)
      }
    },
    methods: {
      _getCommunityList (userQuery) {
        let self = this
        getCommunityList(userQuery, function (response) {
          let data = response.data
          self.$set('userListMeta.totalCount', data.Total)
          self.$set('userListMeta.items', data.Items)
        })
      },
      _getCommunityById (userQuery) {
        let self = this
        getCommunityById(userQuery, function (response) {
          self.$set('updateCommunityMeta', response.data)
        })
      },
      _searchCommunity () {
        let { search, pageIndex, pageSize } = this.queryMeta
        let searchSplits = search.replace(/\s+/g, ' ').split(' ')   // 去掉多余的空格，并以空格分隔
        let queryParams = {
          page: {
            Page: pageIndex,
            Size: pageSize
          },
          username: searchSplits.length > 0 ? searchSplits[0] : '',
          telphone: searchSplits.length > 1 ? searchSplits[1] : ''
        }

        console.log(queryParams)

        this._getCommunityList(queryParams)
      },
      _toggleModalType (type) {
        this.$broadcast('show::modal', type)
      },
      onItemClick (item) {
        this.$set('queryMeta.pageIndex', item)    // 设置为当前页
        this._searchCommunity()
      },
      onSearch () {
        this.$set('queryMeta.pageIndex', 1)  // 默认设置为第一页
        this._searchCommunity()
      },
      onTableAdd () {
        this._toggleModalType('addCommunityModal')
      },
      onTableUpdate (data) {
        if (!data.CommunityID) return
        let queryCommunity = {
          userid: data.CommunityID
        }
        this._getCommunityById(queryCommunity)
        this._toggleModalType('updateCommunityModal')
      },
      onTableDelete (data) {
        if (!data.CommunityID || !data.CommunityName) return
        let tempCommunityMeta = {
          CommunityID: data.CommunityID,
          CommunityName: data.CommunityName
        }
        this.$set('deleteCommunityMeta', tempCommunityMeta)
        this._toggleModalType('deleteCommunityModal')
      }
    },
    events: {
      'vuetable:action': function (action, data) {
        console.log('vuetable:action', action, data)
        if (action === 'update-item') {
          this.onTableUpdate(data)
        } else if (action === 'delete-item') {
          this.onTableDelete(data)
        }
      },
      'vuetable:load-error': function (response) {
        console.log('Load Error: ', response)
      }
    }
  }
</script>
