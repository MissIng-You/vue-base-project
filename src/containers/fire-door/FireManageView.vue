<template>
  <div id="index-view">
    <div class="card card-blockquote">
      <div class="card-header card-primary-outline">
        <i class="card-mask fa fa-flag"></i>
        <span class="card-title">防火门管理</span>
        <span class="card-search-group">
            <span class="input-group input-group-sm input-width-sm">
              <input type="text" class="form-control" @keypress.enter="onSearch" v-model="queryMeta.search" placeholder="在此搜索防火门/楼层信息">
              <span class="input-group-addon btn btn-primary-outline" @click="onSearch"><i class="fa fa-fw fa-search"></i></span>
            </span>
          </span>
        <span class="card-state card-state-hover pull-right" @click="onTableAdd"><i class="fa fa-fw fa-plus"></i></span>
      </div>
      <div v-if="fireListMeta.items.length" class="card-body">
        <ctable v-ref:ctable
                  api-url="/api/fire-service/getFireListMock.json"
                  :show-pagination="fireDefineMeta.showPagination"
                  pagination-path=""
                  :load-on-start="fireDefineMeta.loadOnStart"
                  :fields="fireDefineMeta.fields"
                  :table-data="fireListMeta.items"
                  :sort-order="sortOrder"
                  table-class="table table-sm table-bordered table-striped table-hover table-hover-outline"
                  ascending-icon="fa fa-arrow-up"
                  descending-icon="fa fa-arrow-down"
                  :item-actions="fireDefineMeta.itemActions">
        </ctable>
      </div>
      <div v-if="!fireListMeta.items.length" class="card-body">
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
      <history-fire-view :meta="historyFireMeta"></history-fire-view>
      <add-fire-view :meta="addFireMeta" :validate="fireValidateMeta" ></add-fire-view>
      <update-fire-view :meta="updateFireMeta" :validate="fireValidateMeta" ></update-fire-view>
      <delete-fire-view :meta="deleteFireMeta"></delete-fire-view>
    </div>
  </div>
</template>

<script>
  import customBootstrap from '../../components'
  import ApiService from '../../api'
  import EmptyDataView from '../_shared/EmptyDataView'
  import AddFireView from './AddFireView'
  import UpdateFireView from './UpdateFireView'
  import DeleteFireView from './DeleteFireView'
  import HistoryFireView from './HistoryFireView'

  let { pagination, ctable } = customBootstrap
  let {
    getFireList,
    getFireById
    } = ApiService.fireService
  let isLoadedOfFirst = false

  export default {
    name: 'FireManageView',
    components: {
      pagination,
      ctable,
      EmptyDataView,
      AddFireView,
      UpdateFireView,
      DeleteFireView,
      HistoryFireView
    },
    route: {
      data: function (transition) {
        if (isLoadedOfFirst) return transition.next()

        this._searchFire()
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
        historyFireMeta: {},
        addFireMeta: {},
        fireValidateMeta: [
          {
            id: 'CommunityName',
            label: '单位名称',
            type: 'text',
            placeholder: '请输入单位名称',
            validate: { required: { rule: true, message: '单位名称是必须的' } }
          },
          {
            id: 'BuildingNum',
            label: '所属楼栋',
            type: 'text',
            placeholder: '例如：2栋-3楼',
            validate: { required: { rule: true, message: '所属楼栋是必须的' } }
          },
          {
            id: 'DeviceCode',
            label: '监控器编号',
            type: 'text',
            placeholder: '请输入防火门监控器编号',
            validate: { required: { rule: true, message: '监控器编号是必须的' } }
          },
          {
            id: 'DeviceName',
            label: '监控器名称',
            type: 'text',
            placeholder: '请输入防火门监控器名称',
            validate: { required: { rule: true, message: '监控器名称是必须的' } }
          },
          {
            id: 'FireDoorName',
            label: '防火门名称',
            type: 'text',
            placeholder: '请输入防火门名称',
            validate: { required: { rule: true, message: '防火门名称是必须的' } }
          },
          {
            id: 'FireDoorType',
            display: 'FireDoorTypeName',
            label: '所属类型',
            placeholder: '请选择防火门类型',
            type: 'select',
            selected: '',
            options: [{
              FireDoorType: 0,
              FireDoorTypeName: '常开'
            }, {
              FireDoorType: 1,
              FireDoorTypeName: '常闭'
            }]
          },
          {
            id: 'FireDoorAddress',
            label: '安装位置',
            type: 'text',
            placeholder: '请输入防火门安装位置',
            validate: { required: { rule: true, message: '防火门的安装位置是必须的' } }
          }
        ],
        updateFireMeta: {},
        deleteFireMeta: {},
        fireListMeta: {
          totalCount: 0,
          items: []
        },
        fireDefineMeta: {
          modalType: 'normal',
          showPagination: false,
          loadOnStart: false,
          fields: [
            {name: 'CommunityID', visible: false},
            {name: 'CommunityName', title: '单位名称'},
            {name: 'FloorID', visible: false},
            {name: 'FloorDoorID', visible: false},
            {name: 'FireDoorID', visible: false},
            {name: 'DeviceCode', title: '监控器编号'},
            {name: 'DeviceName', title: '监控器名称'},
            {name: 'BuildingNum', title: '所属楼栋'},
            {name: 'FireDoorName', title: '防火门名称'},
            {name: 'FireDoorType', title: '防火门类型', callback: '_convertDoorType|'},
            {name: 'FireDoorAddress', title: '安装位置'},
            {name: '__actions', title: '操作列'}
          ],
          itemActions: [
            { name: 'history-item', label: '', icon: 'fa fa-fw fa-history', class: 'btn btn-xs btn-warning-outline' },
            { name: 'update-item', label: '', icon: 'fa fa-fw fa-pencil', class: 'btn btn-xs btn-success-outline' },
            { name: 'delete-item', label: '', icon: 'fa fa-fw fa-trash', class: 'btn btn-xs btn-danger-outline' }
          ]
        }
      }
    },
    watch: {
      'fireListMeta.totalCount': function (newVal, oldVal) {
        this.$set('paginationMeta.totalCount', newVal)
      },
      'queryMeta.pageIndex': function (newVal, oldVal) {
        this.$set('paginationMeta.currentPage', newVal)
      }
    },
    methods: {
      _convertDoorType (value) {
        let createHtml = (value, clazz) => {
          return '<span class="label label-pill ' + clazz + '">' + value + '</span>'
        }
        if (value === 0) {
          return createHtml('常开', 'label-primary')
        } else if (value === 1) {
          return createHtml('常闭', 'label-info')
        }
      },
      _getFireList (fireQuery) {
        let self = this
        getFireList(fireQuery, function (response) {
          let data = response.data
          self.$set('fireListMeta.totalCount', data.Total)
          self.$set('fireListMeta.items', data.Items)
        })
      },
      _getFireById (fireQuery) {
        let self = this
        getFireById(fireQuery, function (response) {
          if (!response.data && !response.data.Success) return
          self.$set('updateFireMeta', response.data.Result)
        })
      },
      _searchFire () {
        let { search, pageIndex, pageSize } = this.queryMeta
        let searchSplits = search.replace(/\s+/g, ' ').split(' ')   // 去掉多余的空格，并以空格分隔
        let queryParams = {
          page: {
            Page: pageIndex,
            Size: pageSize
          },
          deviceName: searchSplits.length > 0 ? searchSplits[0] : '',
          communityName: searchSplits.length > 1 ? searchSplits[1] : '',
          fireDoorName: searchSplits.length > 2 ? searchSplits[2] : ''
        }

        console.log(queryParams)

        this._getFireList(queryParams)
      },
      _toggleModalType (type) {
        this.$broadcast('show::modal', type)
      },
      onItemClick (item) {
        this.$set('queryMeta.pageIndex', item)    // 设置为当前页
        this._searchFire()
      },
      onSearch () {
        this.$set('queryMeta.pageIndex', 1)  // 默认设置为第一页
        this._searchFire()
      },
      onTableAdd () {
        this._toggleModalType('addFireModal')
      },
      onTableHistory (data) {
        if (!data.FireDoorID) return
        this.$set('historyFireMeta', data)
        this._toggleModalType('historyFireModal')
      },
      onTableUpdate (data) {
        if (!data.FireDoorID) return
        let queryFire = {
          fireDoorId: data.FireDoorID
        }
        this._getFireById(queryFire)
//        this.$set('updateFireMeta', data)
        this._toggleModalType('updateFireModal')
      },
      onTableDelete (data) {
        if (!data.FireDoorID) return
        this.$set('deleteFireMeta', data)
        this._toggleModalType('deleteFireModal')
      }
    },
    events: {
      'ctable:action': function (action, data) {
        console.log('ctable:action', action, data)
        if (action === 'update-item') {
          this.onTableUpdate(data)
        } else if (action === 'delete-item') {
          this.onTableDelete(data)
        } else if (action === 'history-item') {
          this.onTableHistory(data)
        }
      },
      'ctable:load-error': function (response) {
        console.log('Load Error: ', response)
      }
    }
  }
</script>
