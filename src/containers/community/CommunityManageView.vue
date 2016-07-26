<template>
  <div id="index-view">
    <div class="card card-blockquote">
      <div class="card-header card-primary-outline">
        <i class="card-mask fa fa-ra"></i>
        <span class="card-title">单位管理</span>
        <span class="card-search-group">
            <span class="input-group input-group-sm input-width-sm">
              <input type="text" class="form-control" @keypress.enter="onSearch" v-model="queryMeta.search" placeholder="在此搜索单位/手机信息">
              <span class="input-group-addon btn btn-primary-outline" @click="onSearch"><i class="fa fa-fw fa-search"></i></span>
            </span>
          </span>
        <span class="card-state card-state-hover pull-right" @click="onTableAdd"><i class="fa fa-fw fa-plus"></i></span>
      </div>
      <div v-if="communityListMeta.items.length" class="card-body">
        <ctable v-ref:ctable
                  api-url="/api/community-service/getCommunityListMock.json"
                  :show-pagination="communityDefineMeta.showPagination"
                  pagination-path=""
                  :load-on-start="communityDefineMeta.loadOnStart"
                  :fields="communityDefineMeta.fields"
                  :table-data="communityListMeta.items"
                  :sort-order="sortOrder"
                  table-class="table table-sm table-bordered table-striped table-hover table-hover-outline"
                  ascending-icon="fa fa-arrow-up"
                  descending-icon="fa fa-arrow-down"
                  :item-actions="communityDefineMeta.itemActions">
        </ctable>
      </div>
      <div v-if="!communityListMeta.items.length" class="card-body">
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
    <add-community-view :meta="addCommunityMeta" :validate="addCommunityValidateMeta"></add-community-view>
    <update-community-view :meta="updateCommunityMeta" :validate="addCommunityValidateMeta"></update-community-view>
    <delete-community-view :meta="deleteCommunityMeta"></delete-community-view>
  </div>
</template>

<script>
  import customBootstrap from '../../components'
  import ApiService from '../../api'
  import EmptyDataView from '../_shared/EmptyDataView'
  import AddCommunityView from './AddCommunityView'
  import UpdateCommunityView from './UpdateCommunityView'
  import DeleteCommunityView from './DeleteCommunityView'

  let { pagination, ctable } = customBootstrap
  let {
    getCommunityList,
    getCommunityById
    } = ApiService.communityService
  let isLoadedOfFirst = false

  export default {
    name: 'CommunityManageView',
    components: {
      pagination,
      ctable,
      EmptyDataView,
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
        addCommunityValidateMeta: [{
          id: 'CommunityName',
          label: '单位名称',
          type: 'text',
          placeholder: '请输入单位名称',
          validate: {
            required: {rule: true, message: '单位名称是必须的'}
          }

        }, {
          id: 'Captain',
          label: '负责人姓名',
          type: 'text',
          placeholder: '请输入负责人姓名',
          validate: {
            required: {rule: true, message: '负责人姓名是必须的'}
          }
        }, {
          id: 'CaptainPlace',
          label: '所属职位',
          type: 'text',
          placeholder: '请输入所属职位',
          validate: {
            required: {rule: true, message: '所属职位是必须的'}
          }
        }, {
          id: 'CommunityPhone',
          label: '联系方式',
          type: 'text',
          placeholder: '请输入区号-号码',
          validate: {
            required: {rule: true, message: '联系方式是必须的'},
            telephone: {rule: true, message: '(区号)电话号码的格式不正确'}
          }
        }, {
          id: 'CaptainTelphone',
          label: '手机号码',
          type: 'text',
          placeholder: '请输入手机号码',
          validate: {
            required: {rule: true, message: '手机号码是必须的'},
            mobilephone: {rule: true, message: '手机号码格式不正确'}
          }
        }, {
          id: 'Address',
          label: '单位地址',
          type: 'text',
          placeholder: '请输入单位地址',
          validate: {
            required: {rule: true, message: '单位地址是必须的'}
          }
        }],
        updateCommunityMeta: {},
        deleteCommunityMeta: {},
        communityListMeta: {
          totalCount: 0,
          items: []
        },
        communityDefineMeta: {
          modalType: 'normal',
          showPagination: false,
          loadOnStart: false,
          fields: [
            {name: 'CommunityID', title: '单位编码', visible: false},
            {name: 'CommunityName', title: '单位名称'},
            {name: 'DistrictCode', title: '区域编码', visible: false},
            {name: 'Captain', title: '负责人姓名'},
            {name: 'CaptainPlace', title: '所属职位'},
            {name: 'CommunityPhone', title: '联系方式'},
            {name: 'CaptainTelphone', title: '手机号码'},
            {name: 'Address', title: '单位地址'},
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
      'communityListMeta.totalCount': function (newVal, oldVal) {
        this.$set('paginationMeta.totalCount', newVal)
      },
      'queryMeta.pageIndex': function (newVal, oldVal) {
        this.$set('paginationMeta.currentPage', newVal)
      }
    },
    methods: {
      _getCommunityList (communityQuery) {
        let self = this
        getCommunityList(communityQuery, function (response) {
          let data = response.data
          self.$set('communityListMeta.totalCount', data.Total)
          self.$set('communityListMeta.items', data.Items)
        })
      },
      _getCommunityById (communityQuery) {
        let self = this
        getCommunityById(communityQuery, function (response) {
          if (response.data && !response.data.Success) return
          self.$set('updateCommunityMeta', response.data.Result)
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
          communityName: searchSplits.length > 0 ? searchSplits[0] : '',
          captain: searchSplits.length > 1 ? searchSplits[1] : ''
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
          communityId: data.CommunityID
        }
        this._getCommunityById(queryCommunity)
//        this.$set('updateCommunityMeta', data)
        this._toggleModalType('updateCommunityModal')
      },
      onTableDelete (data) {
        if (!data.CommunityID) return
//        let tempCommunityMeta = {
//          communityId: data.CommunityID
//          CommunityName: data.CommunityName
//        }
        this.$set('deleteCommunityMeta', data)
        this._toggleModalType('deleteCommunityModal')
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
