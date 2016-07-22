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
        <add-user-view :meta="addUserMeta" :validate="userValidateMeta"></add-user-view>
        <update-user-view :meta="updateUserMeta" :validate="userValidateMeta"></update-user-view>
        <delete-user-view :meta="deleteUserMeta"></delete-user-view>
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
            required: {rule: true, message: '用户姓名是必须的'}
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
            required: {rule: true, message: '联系方式是必须的'}
          }
        }, {
          id: 'RoleID',
          display: 'RoleName',
          label: '用户角色',
          placeholder: '请输入/选择用户角色',
          type: 'select',
          selected: '',
          options: [{
            RoleID: '01973025-171E-4B27-ADC9-1F4C50BB7EC',
            RoleName: '管理员'
          }, {
            RoleID: '01973025-171E-4B27-ADC9-1F4C50BB7EB',
            RoleName: '普通管理员'
          }],
          validate: {
            required: {rule: true, message: '用户角色是必须的'}
          }
        }, {
          id: 'CommunityID',
          display: 'CommunityName',
          label: '所属单位',
          placeholder: '请输入/选择所属单位',
          type: 'select',
          selected: '',
          options: [{
            CommunityID: '01973025-171E-4B27-ADC9-1F4C50BB7EC',
            CommunityName: 'A单位'
          }, {
            CommunityID: '01973025-171E-4B27-ADC9-1F4C50BB7EB',
            CommunityName: 'B单位'
          }],
          validate: {
            required: {rule: true, message: '用户角色是必须的'}
          }
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
      _getAllRole (data) {
        let self = this
        getAllRole({}, function (response) {
          let data = response.data
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
          let data = response.data
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
      _convertUserState (value) {
        if (value === 0) {
          return '未注册'
        } else if (value === 1) {
          return '正常'
        } else {
          return '禁用'
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
          self.$set('updateUserMeta', response.data)
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
          username: searchSplits.length > 0 ? searchSplits[0] : '',
          telphone: searchSplits.length > 1 ? searchSplits[1] : ''
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
        let queryUser = {
          userid: data.UserID
        }
        this._getUserById(queryUser)
        this._toggleModalType('updateUserModal')
        this._getAllRole(data)
        this._getAllCommunity(data)
      },
      onTableDelete (data) {
        if (!data.UserID || !data.UserName) return
        let tempUserMeta = {
          UserID: data.UserID,
          UserName: data.UserName
        }
        this.$set('deleteUserMeta', tempUserMeta)
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
