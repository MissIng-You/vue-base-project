<template>
  <div id="fire-card-list-view">
    <div class="card card-blockquote">
      <div class="card-header">
        <i class="card-mask fa fa-leaf"></i>
        <span class="card-title">防火实时监控</span>
        <span class="card-subtitle">({{getTotalCount}}条记录)</span>
        <span class="card-search-group">
            <span class="input-group input-group-sm input-width-sm">
              <input type="text" class="form-control" @keyup="onSearch" v-model="fireQuery.search" placeholder="在此搜索防火门位置">
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
  let { getFireList } = ApiService

  let isLoadedOfFireList = false

  export default {
    name: 'IndexView',
    components: {
      fireCardList,
      cascadingMenu,
      pagination
    },
    // http://router.vuejs.org/en/pipeline/data.html
    route: {
      data: function (transition) {
        if (isLoadedOfFireList) return transition.next()

        return getFireList({}, function (response) {
          return {
            errorFireListMeta: {
              totalCount: response.data.items.length,
              items: response.data.items
            },
            successFireListMeta: {
              totalCount: response.data.items.length,
              items: response.data.items
            }
          }
        })
      }
    },
    computed: {
      getTotalCount () {
        return this.paginationMeta.successTotalCount + this.paginationMeta.errorTotalCount
      }
    },
    data () {
      return {
        fireQuery: {
          search: '',
          pageIndex: 1,
          pageSize: 8
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
      onSearch () {
        let self = this
        getFireList(this.fireQuery, function (response) {
          self.$set('successFireListMeta', response.data)
          self.$set('errorFireListMeta', response.data)
        })
      },
      onSuccessItemClick (item) {
        let self = this
        self.$set('fireQuery.pageIndex', item)

        getFireList(this.fireQuery, function (response) {
          self.$set('successFireListMeta', response.data)
        })
      },
      onErrorItemClick (item) {
        let self = this
        self.$set('fireQuery.pageIndex', item)

        getFireList(this.fireQuery, function (response) {
          self.$set('errorFireListMeta', response.data)
        })
      }
    },
    watch: {
      'successFireListMeta': function (newVal, oldVal) {
        this.$set('paginationMeta.successTotalCount', newVal.totalCount)
      },
      'errorFireListMeta': function (newVal, oldVal) {
        this.$set('paginationMeta.errorTotalCount', newVal.totalCount)
      }
    }
  }
</script>
