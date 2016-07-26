<template>
  <div id="index-view">
    <div class="card card-blockquote">
      <div class="card-header card-primary-outline">
        <i class="card-mask fa fa-users"></i>
        <span class="card-title">用户管理</span>
        <span class="card-search-group">
            <span class="input-group input-group-sm input-width-sm">
              <input type="text" class="form-control" @keypress.enter="onSearch" v-model="queryMeta.search" placeholder="在此搜索用户/手机信息">
              <span class="input-group-addon btn btn-primary-outline" @click="onSearch"><i class="fa fa-fw fa-search"></i></span>
            </span>
          </span>
        <span class="card-state card-state-hover pull-right" @click="onTableAdd"><i class="fa fa-fw fa-plus"></i></span>
      </div>
      <div v-if="userListMeta.items.length" class="card-body">
        <ctable v-ref:ctable
                  api-url="/api/user-service/getUserListMock.json"
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
      <div v-if="!userListMeta.items.length" class="card-body">
        <empty-data-view @alert="onTableAdd"></empty-data-view>
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
    <add-user-view :meta="addUserMeta" :validate="userValidateMeta"></add-user-view>
    <update-user-view :meta="updateUserMeta" :validate="userValidateMeta"></update-user-view>
    <delete-user-view :meta="deleteUserMeta"></delete-user-view>
  </div>
</template>

<script>
  import customBootstrap from '../../components'
  import ApiService from '../../api'
  import moment from 'moment'
  import EmptyDataView from '../_shared/EmptyDataView'
  import AddUserView from './AddUserView'
  import UpdateUserView from './UpdateUserView'
  import DeleteUserView from './DeleteUserView'

  let { pagination, ctable } = customBootstrap
  let {
    getUserList,
    getUserById
    } = ApiService.userService
  let { getAllRole } = ApiService.roleService
  let { getAllCommunity } = ApiService.communityService
  let isLoadedOfFirst = false

  export default {
    name: 'UserManageView',
    components: {
      pagination,
      ctable,
      EmptyDataView,
      AddUserView,
      UpdateUserView,
      DeleteUserView
    },
    route: {
      data: function (transition) {
        if (isLoadedOfFirst) return transition.next()
        this._searchUser()
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
        addUserMeta: {},
        userValidateMeta: [{
          id: 'UserName',
          label: '登录名称',
          placeholder: '请输入用户姓名',
          type: 'text',
          validate: {
            required: {rule: true, message: '登录名称是必须的'}
          }
        }, {
          id: 'RealName',
          label: '用户姓名',
          placeholder: '请输入用户姓名',
          type: 'text',
          validate: {
            required: {rule: true, message: '用户姓名是必须的'}
          }
        }, {
          id: 'Telphone',
          label: '联系方式',
          placeholder: '请输入联系方式',
          type: 'text',
          validate: {
            required: {rule: true, message: '联系方式是必须的'},
            mobilephone: {rule: true, message: '(区号)电话号码的格式不正确'}
          }
        }, {
          id: 'RoleID',
          display: 'RoleName',
          label: '用户角色',
          placeholder: '请输入/选择用户角色',
          type: 'select',
          selected: {
            RoleID: '01973025-171E-4B27-ADC9-1F4C50BB7EC',
            RoleName: '管理员'
          },
          options: [{
            RoleID: '01973025-171E-4B27-ADC9-1F4C50BB7EC',
            RoleName: '管理员'
          }, {
            RoleID: '01973025-171E-4B27-ADC9-1F4C50BB7EB',
            RoleName: '普通管理员'
          }]
        }, {
          id: 'CommunityID',
          display: 'CommunityName',
          label: '所属单位',
          placeholder: '请输入/选择所属单位',
          type: 'select',
          selected: {},
          options: [{
            CommunityID: '01973025-171E-4B27-ADC9-1F4C50BB7EC',
            CommunityName: 'A单位'
          }, {
            CommunityID: '01973025-171E-4B27-ADC9-1F4C50BB7EB',
            CommunityName: 'B单位'
          }]
        }],
        updateUserMeta: {},
        deleteUserMeta: {},
        userListMeta: {
          totalCount: 0,
          items: []
        },
        userDefineMeta: {
          modalType: 'normal',
          showPagination: false,
          loadOnStart: false,
          fields: [
            {name: 'UserID', visible: false},
            {name: 'RoleID', visible: false},
            {name: 'CommunityID', visible: false},
            {name: 'UserName', title: '登录名称'},
            {name: 'RealName', title: '用户姓名'},
            {name: 'RoleName', title: '用户角色'},
            {name: 'CommunityName', title: '所属单位'},
            {name: 'Telphone', title: '联系方式'},
            {name: 'UserState', title: '用户状态', callback: '_convertUserState|'},
            {name: 'AddTime', title: '注册时间', callback: '_convertTime|'},
            {name: 'ModifyTime', title: '修改时间', callback: '_convertTime|'},
            {name: '__actions', title: '操作列'}
          ],
          itemActions: [
            { name: 'update-item', label: '', icon: 'fa fa-fw fa-pencil', class: 'btn btn-xs btn-success-outline' },
            { name: 'delete-item', label: '', icon: 'fa fa-fw fa-trash', class: 'btn btn-xs btn-danger-outline' }
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
      _getAllRole (data) {
        let self = this
        getAllRole({}, function (response) {
          if (response.data && !response.data.Items) return
          let data = response.data.Items
          for (let index = 0; index < self.userValidateMeta.length; index++) {
            let tempItem = self.userValidateMeta[index]
            if (tempItem.id === 'RoleID') {
              self.$set(`userValidateMeta[${index}].options`, data)
            }
            if (tempItem.id === 'RoleID' && data) {
              self.$set(`userValidateMeta[${index}].selected`, {RoleID: data.RoleID, RoleName: data.RoleName})
            }
          }
        })
      },
      _getAllCommunity (data) {
        let self = this
        getAllCommunity({}, function (response) {
          if (response.data && !response.data.Items) return
          let data = response.data.Items
          for (let index = 0; index < self.userValidateMeta.length; index++) {
            let tempItem = self.userValidateMeta[index]
            if (tempItem.id === 'CommunityID') {
              self.$set(`userValidateMeta[${index}].options`, data)
            }
            if (tempItem.id === 'CommunityID' && data) {
              self.$set(`userValidateMeta[${index}].selected`, {CommunityID: data.CommunityID, CommunityName: data.CommunityName})
            }
          }
        })
      },
      _convertTime (value) {
        return moment(value).format('YYYY-MM-DD HH:mm')
      },
      _convertUserState (value) {
        let createHtml = (value, clazz) => {
          return '<span class="label label-pill ' + clazz + '">' + value + '</span>'
        }
        if (value === 0) {
          return createHtml('未激活', 'label-secondary')
        } else if (value === 1) {
          return createHtml('正常', 'label-info')
        } else {
          return createHtml('禁用', 'label-danger')
        }
      },
      _getUserList (userQuery) {
        let self = this
        getUserList(userQuery, function (response) {
          let data = response.data
          self.$set('userListMeta.totalCount', data.Total)
          self.$set('userListMeta.items', data.Items)
        })
      },
      _getUserById (userQuery) {
        let self = this
        getUserById(userQuery, function (response) {
          if (response.data && !response.data.Success) return
          self.$set('updateUserMeta', response.data.Result)
        })
      },
      _searchUser () {
        let { search, pageIndex, pageSize } = this.queryMeta
        let searchSplits = search.replace(/\s+/g, ' ').split(' ')   // 去掉多余的空格，并以空格分隔
        let queryParams = {
          page: {
            Page: pageIndex,
            Size: pageSize
          },
          realName: searchSplits.length > 0 ? searchSplits[0] : '',
          communityName: searchSplits.length > 1 ? searchSplits[1] : ''
        }

        console.log(queryParams)

        this._getUserList(queryParams)
      },
      _toggleModalType (type) {
        this.$broadcast('show::modal', type)
      },
      onItemClick (item) {
        this.$set('queryMeta.pageIndex', item)    // 设置为当前页
        this._searchUser()
      },
      onSearch () {
        this.$set('queryMeta.pageIndex', 1)  // 默认设置为第一页
        this._searchUser()
      },
      onTableAdd () {
        this._toggleModalType('addUserModal')
        this._getAllRole()
        this._getAllCommunity()
      },
      onTableUpdate (data) {
        if (!data.UserID) return
        let queryFire = {
          userId: data.UserID
        }
        this._getUserById(queryFire)
//        this.$set('updateUserMeta', data)
        this._toggleModalType('updateUserModal')
        this._getAllRole(data)
        this._getAllCommunity(data)
      },
      onTableDelete (data) {
        if (!data.UserID) return
        this.$set('deleteUserMeta', data)
        this._toggleModalType('deleteUserModal')
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
