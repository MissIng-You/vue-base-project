<template>
  <div id="fire-card-list-view">
    <div class="card card-blockquote">
      <div class="card-header">
        <i class="card-mask fa fa-leaf"></i>
        <span class="card-title">防火实时监控</span>
        <span class="card-subtitle">({{getTotalCount}}条记录)</span>
        <span class="card-search-group">
            <span class="input-group input-group-sm input-width-sm">
              <input type="text" class="form-control" @keyup="onSearch" v-model="queryMeta.search" placeholder="在此搜索防火门位置">
              <span class="input-group-addon btn btn-primary" @click="onSearch"><i class="fa fa-fw fa-search"></i></span>
            </span>
          </span>
        <i class="card-mask fa fa-fw pull-right" :class="{'fa-cogs': !showConfigBox, 'fa-close': showConfigBox}"></i>
      </div>
      <div class="card-body">
        <div class="card-body-divider">
          <span class="card-body-title card-body-title-danger">{{errorFireListMeta.totalCount}} 条异常记录</span>
            <span class="card-pagination pull-right">
              <pagination shape="circle"
                          :total-rows="paginationMeta.errorTotalCount"
                          :current-page.sync="paginationMeta.errorCurrentPage"
                          :per-page="paginationMeta.perPage"
                          @item-click="onErrorItemClick">
              </pagination>
            </span>
        </div>
        <fire-card-list orientation="horizontal" :meta="errorFireListMeta"></fire-card-list>
      </div>
      <div class="card-body">
        <div class="card-body-divider">
          <span class="card-body-title card-body-title-success">{{successFireListMeta.totalCount}} 条正常常记录</span>
            <span class="card-pagination pull-right">
              <pagination shape="circle"
                          :total-rows="paginationMeta.successTotalCount"
                          :current-page.sync="paginationMeta.successCurrentPage"
                          :per-page="paginationMeta.perPage"
                          @item-click="onSuccessItemClick">
              </pagination>
            </span>
        </div>
        <fire-card-list orientation="horizontal" :meta="successFireListMeta"></fire-card-list>
      </div>
    </div>
  </div>
</template>

<script>
  import customBootstrap from '../../components'
  import ApiService from '../../api'

  let { fireCardList, cascadingMenu, pagination } = customBootstrap
  let { getSuccessFireMonitorList, getErrorFireMonitorList } = ApiService.monitorService

  let isLoadedOfFireList = false

  export default {
    name: 'FireDoorMonitorView',
    components: {
      fireCardList,
      cascadingMenu,
      pagination
    },
    // http://router.vuejs.org/en/pipeline/data.html
    route: {
      data: function (transition) {
        if (isLoadedOfFireList) return transition.next()

        this._getFireMonitorList(0)
        this._getFireMonitorList(1)
      }
    },
    computed: {
      getTotalCount () {
        return this.paginationMeta.successTotalCount + this.paginationMeta.errorTotalCount
      }
    },
    data () {
      return {
        queryMeta: {
          search: ''
        },
        paginationMeta: {
          perPage: 8,
          successTotalCount: 0,
          errorTotalCount: 0,
          successCurrentPage: 1,
          errorCurrentPage: 1
        },
        errorFireListMeta: {
          totalCount: 0,
          items: []
        },
        successFireListMeta: {
          totalCount: 0,
          items: []
        }
      }
    },
    methods: {
      _getQueryParams (state) {
        let { perPage, successCurrentPage, errorCurrentPage } = this.paginationMeta
        let pageIndex = 0

        if (+state === 0) {
          pageIndex = successCurrentPage
        } else {
          pageIndex = errorCurrentPage
        }

        let queryData = {
          page: {
            Page: pageIndex,
            Size: perPage
          },
          state: state
        }

        return queryData
      },
      _getSuccessFireMonitorList () {
        let self = this
        let queryParams = this._getQueryParams(0)
        getSuccessFireMonitorList(queryParams, function (response) {
          let data = response.data
          if (!data) return
          self.$set('successFireListMeta.items', data.Items)
          self.$set('successFireListMeta.totalCount', data.Total)
        })
      },
      _getErrorFireMonitorList () {
        let self = this
        let queryParams = this._getQueryParams(1)

        getErrorFireMonitorList(queryParams, function (response) {
          let data = response.data
          if (!data) return
          self.$set('errorFireListMeta.items', data.Items)
          self.$set('errorFireListMeta.totalCount', data.Total)
        })
      },
      _getFireMonitorList (state) {
        let self = this
        let queryParams = this._getQueryParams(state)

        console.log(typeof state)

        if (+state === 0) {    // "0" 表示正常
          getSuccessFireMonitorList(queryParams, function (response) {
            let data = response.data
            if (!data) return
            self.$set('successFireListMeta.items', data.Items)
            self.$set('successFireListMeta.totalCount', data.Total)
          })
        } else if (+state === 1) {
          getErrorFireMonitorList(queryParams, function (response) {
            let data = response.data
            if (!data) return
            self.$set('errorFireListMeta.items', data.Items)
            self.$set('errorFireListMeta.totalCount', data.Total)
          })
        }
      },
      onSearch () {
        this._getFireMonitorList(0)   // 获取正常数据
        this._getFireMonitorList(1)   // 获取异常数据
      },
      onSuccessItemClick (item) {
        this.$set('paginationMeta.successCurrentPage', item)
        this._getFireMonitorList(0)
      },
      onErrorItemClick (item) {
        this.$set('paginationMeta.errorCurrentPage', item)
        this._getFireMonitorList(1)
      }
    },
    watch: {
      'successFireListMeta.totalCount': function (newVal, oldVal) {
        this.$set('paginationMeta.successTotalCount', newVal)
      },
      'errorFireListMeta.totalCount': function (newVal, oldVal) {
        this.$set('paginationMeta.errorTotalCount', newVal)
      }
    }
  }
</script>
