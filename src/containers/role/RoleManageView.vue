<template>
  <div id="index-view">

    <div class="card card-blockquote">
      <div class="card-header card-primary-outline">
        <i class="card-mask fa fa-gears"></i>
        <span class="card-title">角色管理</span>
        <span class="card-search-group">
            <span class="input-group input-group-sm input-width-sm">
              <input type="text" class="form-control" @keypress.enter="onSearch" v-model="queryMeta.search" placeholder="在此搜索角色名称信息">
              <span class="input-group-addon btn btn-primary" @click="onSearch"><i class="fa fa-fw fa-search"></i></span>
            </span>
          </span>
        <span class="card-state card-state-hover pull-right" @click="onTableAdd"><i class="fa fa-fw fa-plus"></i></span>
      </div>
      <div class="card-body">
        <add-role-view :meta="addRoleMeta" :validate="addRoleValidateMeta"></add-role-view>
        <update-role-view :meta="updateRoleMeta" :validate="updateRoleValidateMeta"></update-role-view>
        <delete-role-view :meta="deleteRoleMeta"></delete-role-view>
        <ctable v-ref:ctable
                  api-url="/api/user-service/getRoleListMock.json"
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
        </ctable>
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
  import AddRoleView from './AddRoleView'
  import UpdateRoleView from './UpdateRoleView'
  import DeleteRoleView from './DeleteRoleView'

  let { pagination, ctable } = customBootstrap
  let {
    getRoleList,
    getRoleById
    } = ApiService.roleService
  let isLoadedOfFirst = false

  export default {
    name: 'RoleManageView',
    components: {
      pagination,
      ctable,
      AddRoleView,
      UpdateRoleView,
      DeleteRoleView
    },
    route: {
      data: function (transition) {
        if (isLoadedOfFirst) return transition.next()

        this._searchRole()
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
        addRoleMeta: {},
        addRoleValidateMeta: [
          {
            id: 'RoleName',
            label: '角色名称',
            name: 'RoleName',
            type: 'txt',
            placeholder: '请输入角色名称',
            validate: { required: { rule: true, message: '角色名称是必须的' } }
          },
          {
            id: 'Description',
            label: '角色描述',
            name: 'Description',
            type: 'txt',
            placeholder: '请输入描述信息',
            validate: { required: { rule: true, message: '角色描述是必须的' } }
          }
        ],
        updateRoleValidateMeta: [
          {
            id: 'RoleName',
            label: '角色名称',
            name: 'RoleName',
            type: 'txt',
            placeholder: '请输入角色名称',
            validate: { required: { rule: true, message: '角色名称是必须的' } }
          },
          {
            id: 'Description',
            label: '角色描述',
            name: 'Description',
            type: 'txt',
            placeholder: '请输入描述信息',
            validate: { required: { rule: true, message: '角色描述是必须的' } }
          }
        ],
        updateRoleMeta: {},
        deleteRoleMeta: {},
        userListMeta: {
          totalCount: 0,
          items: []
        },
        userDefineMeta: {
          modalType: 'normal',
          showPagination: false,
          loadOnStart: false,
          fields: [
            {name: 'RoleID', visible: false},
            {name: 'RoleName', title: '角色名称'},
            {name: 'Description', title: '角色描述'},
            {name: 'AddTime', title: '注册时间'},
            {name: 'ModifyTime', title: '修改时间'},
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
      _getRoleList (userQuery) {
        let self = this
        getRoleList(userQuery, function (response) {
          let data = response.data
          self.$set('userListMeta.totalCount', data.Total)
          self.$set('userListMeta.items', data.Items)
        })
      },
      _getRoleById (userQuery) {
        let self = this
        getRoleById(userQuery, function (response) {
          self.$set('updateRoleMeta', response.data)
        })
      },
      _searchRole () {
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

        this._getRoleList(queryParams)
      },
      _toggleModalType (type) {
        this.$broadcast('show::modal', type)
      },
      onItemClick (item) {
        this.$set('queryMeta.pageIndex', item)    // 设置为当前页
        this._searchRole()
      },
      onSearch () {
        this.$set('queryMeta.pageIndex', 1)  // 默认设置为第一页
        this._searchRole()
      },
      onTableAdd () {
        this._toggleModalType('addRoleModal')
      },
      onTableUpdate (data) {
        if (!data.RoleID) return
        let queryRole = {
          roleid: data.RoleID
        }
        this._getRoleById(queryRole)
        this._toggleModalType('updateRoleModal')
      },
      onTableDelete (data) {
        if (!data.RoleID || !data.RoleName) return
        let tempRoleMeta = {
          RoleID: data.RoleID,
          RoleName: data.RoleName
        }
        this.$set('deleteRoleMeta', tempRoleMeta)
        this._toggleModalType('deleteRoleModal')
      }
    },
    events: {
      'ctable:action': function (action, data) {
        console.log('ctable:action', action, data)
        if (action === 'update-item') {
          this.onTableUpdate(data)
        } else if (action === 'delete-item') {
          this.onTableDelete(data)
        }
      },
      'ctable:load-error': function (response) {
        console.log('Load Error: ', response)
      }
    }
  }
</script>
