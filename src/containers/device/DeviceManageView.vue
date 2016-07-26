<template>
  <div id="index-view">
    <div class="card card-blockquote">
      <div class="card-header card-primary-outline">
        <i class="card-mask fa fa-object-group"></i>
        <span class="card-title">防火门监控器</span>
        <span class="card-search-group">
            <span class="input-group input-group-sm input-width-sm">
              <input type="text" class="form-control" @keypress.enter="onSearch" v-model="queryMeta.search" placeholder="在此搜索设备/基站信息">
              <span class="input-group-addon btn btn-primary-outline" @click="onSearch"><i class="fa fa-fw fa-search"></i></span>
            </span>
          </span>
        <span class="card-state card-state-hover pull-right" @click="onTableAdd"><i class="fa fa-fw fa-plus"></i></span>
      </div>
      <div v-if="deviceListMeta.items.length" class="card-body">
        <ctable v-ref:ctable
                  api-url="/api/device-service/getDeviceListMock.json"
                  :show-pagination="deviceDefineMeta.showPagination"
                  pagination-path=""
                  :load-on-start="deviceDefineMeta.loadOnStart"
                  :fields="deviceDefineMeta.fields"
                  :table-data="deviceListMeta.items"
                  :sort-order="sortOrder"
                  table-class="table table-sm table-bordered table-striped table-hover table-hover-outline"
                  ascending-icon="fa fa-arrow-up"
                  descending-icon="fa fa-arrow-down"
                  :item-actions="deviceDefineMeta.itemActions">
        </ctable>
      </div>
      <div v-if="!deviceListMeta.items.length" class="card-body">
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
    <add-device-view :meta="addDeviceMeta" :validate="DeviceValidateMeta"></add-device-view>
    <update-device-view :meta="updateDeviceMeta" :validate="DeviceValidateMeta"></update-device-view>
    <delete-device-view :meta="deleteDeviceMeta"></delete-device-view>
  </div>
</template>

<script>
  import customBootstrap from '../../components'
  import ApiService from '../../api'
  import EmptyDataView from '../_shared/EmptyDataView'
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
      EmptyDataView,
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
        DeviceValidateMeta: [{
          id: 'CommunityName',
          label: '单位名称',
          type: 'text',
          placeholder: '请输入单位名称',
          validate: {
            required: {rule: true, message: '单位名称是必须的'}
          }
        }, {
          id: 'DeviceID',
          label: '设备编号',
          type: 'text',
          placeholder: '请输入设备编号',
          validate: {
            required: {rule: true, message: '设备编号是必须的'}
          }
        }, {
          id: 'DeviceName',
          label: '设备名称',
          type: 'text',
          placeholder: '请输入设备名称',
          validate: {
            required: {rule: true, message: '设备名称是必须的'}
          }
        }, {
          id: 'Address',
          label: '安装地址',
          type: 'text',
          placeholder: '请输入安装地址',
          validate: {
            required: {rule: true, message: '安装地址是必须的'}
          }
        }, {
          id: 'JZCoordinate',
          label: '基站地址',
          type: 'text',
          placeholder: '请输入基站地址',
          validate: {
            required: {rule: true, message: '基站地址是必须的'}
          }
        }],
        updateDeviceMeta: {},
        deleteDeviceMeta: {},
        deviceListMeta: {
          totalCount: 0,
          items: []
        },
        deviceDefineMeta: {
          modalType: 'normal',
          showPagination: false,
          loadOnStart: false,
          fields: [
            {name: 'DeviceID', visible: false},
            {name: 'CommunityID', visible: false},
            {name: 'CommunityName', title: '单位名称'},
            {name: 'DeviceCode', title: '设备编号'},
            {name: 'DeviceName', title: '设备名称'},
            {name: 'Address', title: '安装地址'},
            {name: 'JZCoordinate', title: '基站地址'},
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
      'deviceListMeta.totalCount': function (newVal, oldVal) {
        this.$set('paginationMeta.totalCount', newVal)
      },
      'queryMeta.pageIndex': function (newVal, oldVal) {
        this.$set('paginationMeta.currentPage', newVal)
      }
    },
    methods: {
      _getDeviceList (deviceQuery) {
        let self = this
        getDeviceList(deviceQuery, function (response) {
          let data = response.data
          self.$set('deviceListMeta.totalCount', data.Total)
          self.$set('deviceListMeta.items', data.Items)
        })
      },
      _getDeviceById (deviceQuery) {
        let self = this
        getDeviceById(deviceQuery, function (response) {
          if (!response.data && !response.data.Success) return
          self.$set('updateDeviceMeta', response.data.Result)
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
          deviceName: searchSplits.length > 0 ? searchSplits[0] : '',
          communityName: searchSplits.length > 1 ? searchSplits[1] : ''
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
          deviceId: data.DeviceID
        }
        this._getDeviceById(queryDevice)
//        this.$set('updateDeviceMeta', data)
        this._toggleModalType('updateDeviceModal')
      },
      onTableDelete (data) {
        if (!data.DeviceID) return
//        let tempDeviceMeta = {
//          deviceId: data.DeviceID
//          DeviceName: data.DeviceName
//        }
        this.$set('deleteDeviceMeta', data)
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
