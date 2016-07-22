<template>
  <div id="index-view">

    <div class="card card-blockquote">
      <div class="card-header card-primary-outline">
        <i class="card-mask fa fa-object-group"></i>
        <span class="card-title">设备管理</span>
        <span class="card-search-group">
            <span class="input-group input-group-sm input-width-sm">
              <input type="text" class="form-control" @keypress.enter="onSearch" v-model="queryMeta.search" placeholder="在此搜索设备/基站信息">
              <span class="input-group-addon btn btn-primary" @click="onSearch"><i class="fa fa-fw fa-search"></i></span>
            </span>
          </span>
        <span class="card-state card-state-hover pull-right" @click="onTableAdd"><i class="fa fa-fw fa-plus"></i></span>
      </div>
      <div class="card-body">
        <add-device-view :meta="addDeviceMeta" :validate="addDeviceValidateMeta"></add-device-view>
        <update-device-view :meta="updateDeviceMeta" :validate="addDeviceValidateMeta"></update-device-view>
        <delete-device-view :meta="deleteDeviceMeta"></delete-device-view>
        <ctable v-ref:ctable
                  api-url="/api/user-service/getDeviceListMock.json"
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
  import AddDeviceView from './AddDeviceView'
  import UpdateDeviceView from './UpdateDeviceView'
  import DeleteDeviceView from './DeleteDeviceView'

  let { pagination, ctable } = customBootstrap
  let {
    getDeviceList,
    getDeviceById
    } = ApiService.deviceService
  let isLoadedOfFirst = false

  export default {
    name: 'DeviceManageView',
    components: {
      pagination,
      ctable,
      AddDeviceView,
      UpdateDeviceView,
      DeleteDeviceView
    },
    route: {
      data: function (transition) {
        if (isLoadedOfFirst) return transition.next()

        this._searchDevice()
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
        addDeviceMeta: {},
        addDeviceValidateMeta: [{
          id: 'DeviceID',
          label: '设备编号',
          name: 'DeviceID',
          type: 'txt',
          placeholder: '请输入设备编号',
          validate: {
            required: {rule: true, message: '设备编号是必须的'}
          }
        }, {
          id: 'DeviceName',
          label: '设备名称',
          name: 'DeviceName',
          type: 'txt',
          placeholder: '请输入设备名称',
          validate: {
            required: {rule: true, message: '设备名称是必须的'}
          }
        }, {
          id: 'Address',
          label: '详细地址',
          name: 'Address',
          type: 'txt',
          placeholder: '请输入详细地址',
          validate: {
            required: {rule: true, message: '详细地址是必须的'}
          }
        }, {
          id: 'JZCoordinate',
          label: '基站地址',
          name: 'JZCoordinate',
          type: 'txt',
          placeholder: '请输入基站地址',
          validate: {
            required: {rule: true, message: '基站地址是必须的'}
          }
        }],
        updateDeviceMeta: {},
        deleteDeviceMeta: {},
        userListMeta: {
          totalCount: 0,
          items: []
        },
        userDefineMeta: {
          modalType: 'normal',
          showPagination: false,
          loadOnStart: false,
          fields: [
            {name: 'DeviceID', visible: false, title: '设备编号'},
            {name: 'DeviceCode', title: '设备编码'},
            {name: 'DeviceName', title: '设备名称'},
            {name: 'Address', title: '详细地址'},
            {name: 'AddressCoordinate', visible: false, title: '地址坐标'},
            {name: 'JZCoordinate', title: '基站地址'},
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
      _getDeviceList (userQuery) {
        let self = this
        getDeviceList(userQuery, function (response) {
          let data = response.data
          self.$set('userListMeta.totalCount', data.Total)
          self.$set('userListMeta.items', data.Items)
        })
      },
      _getDeviceById (userQuery) {
        let self = this
        getDeviceById(userQuery, function (response) {
          self.$set('updateDeviceMeta', response.data)
        })
      },
      _searchDevice () {
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

        this._getDeviceList(queryParams)
      },
      _toggleModalType (type) {
        this.$broadcast('show::modal', type)
      },
      onItemClick (item) {
        this.$set('queryMeta.pageIndex', item)    // 设置为当前页
        this._searchDevice()
      },
      onSearch () {
        this.$set('queryMeta.pageIndex', 1)  // 默认设置为第一页
        this._searchDevice()
      },
      onTableAdd () {
        this._toggleModalType('addDeviceModal')
      },
      onTableUpdate (data) {
        if (!data.DeviceID) return
        let queryDevice = {
          userid: data.DeviceID
        }
        this._getDeviceById(queryDevice)
        this._toggleModalType('updateDeviceModal')
      },
      onTableDelete (data) {
        if (!data.DeviceID || !data.DeviceName) return
        let tempDeviceMeta = {
          DeviceID: data.DeviceID,
          DeviceName: data.DeviceName
        }
        this.$set('deleteDeviceMeta', tempDeviceMeta)
        this._toggleModalType('deleteDeviceModal')
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
