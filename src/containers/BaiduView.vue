<template>
  <div id="fire-card-list-view" class="layout">
    <div class="layout-left fixed">
      <cascading-menu v-if="!$loadingRouteData" theme="primary" position="left"
                      :meta="navigationMeta" v-ref:sidebar></cascading-menu>
    </div>

    <div class="layout-center">
      <div class="card card-blockquote">
        <div class="card-header">
          <i class="card-mask fa fa-list"></i>
          <span class="card-title">防火实时监控</span>
          <span class="card-subtitle">( 36条记录)</span>
        <span class="card-search-group">
          <i class="card-mask fa fa-fw" :class="{'fa-search': !showSearchBox, 'fa-close': showSearchBox}" @click="onToggleSearch"></i>
          <span class="card-search card-primary-outline">A栋B单元</span>
          <span class="card-search card-primary-outline">全部属性</span>
        </span>
          <i class="card-mask fa fa-fw pull-right" :class="{'fa-cogs': !showConfigBox, 'fa-close': showConfigBox}" @click="onToggleConfig"></i>
        </div>
        <div class="card-body">
          <div class="card-body-divider">
            <span class="card-body-title card-body-title-danger">8 条异常记录</span>
            <span class="card-pagination pull-right">
              <pagination shape="circle"
                          :total-rows="totalRows"
                          :current-page.sync="currentPage"
                          :per-page="perPage">
              </pagination>
            </span>
          </div>
          <div class="card-body-modal" v-show="showSearchBox || showConfigBox">
            <div class="card-body-modal-search">
              <multiselect :selected.sync="selected" :options="options"></multiselect>
            </div>
          </div>
          <fire-card-list orientation="horizontal" :meta="fireCardListMeta"></fire-card-list>
        </div>
        <div class="card-body">
          <div class="card-body-divider">
            <span class="card-body-title card-body-title-success">28 条正常常记录</span>
            <span class="card-pagination pull-right">
              <pagination shape="circle"
                          :total-rows="totalRows"
                          :current-page.sync="currentPage"
                          :per-page="perPage">
              </pagination>
            </span>
          </div>
          <div class="card-body-modal" v-show="showSearchBox || showConfigBox">
            <div class="card-body-modal-search">
              <multiselect :selected.sync="selected" :options="options"></multiselect>
            </div>
          </div>
          <fire-card-list orientation="horizontal" :meta="fireCardListMeta"></fire-card-list>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import customBootstrap from '../components'
  import multiselect from 'vue-multiselect'
  import ApiService from '../api'

  let { fireCardList, cascadingMenu, pagination } = customBootstrap
  let { getMenuList } = ApiService

  let isLoadedOfMenuList = false

  export default {
    name: 'IndexView',
    components: {
      fireCardList,
      cascadingMenu,
      pagination,
      multiselect
    },
    // http://router.vuejs.org/en/pipeline/data.html
    route: {
      data: function (transition) {
        if (isLoadedOfMenuList) return transition.next()
        window.setTimeout(function () {
          getMenuList(function (response) {
            isLoadedOfMenuList = true

            transition.next({
              navigationMeta: {
                items: response.data.items
              }
            })
          }, function (error) {
            console.log(error)
          })
        }, 1000)
      }
    },
    data () {
      return {
        totalRows: 100,
        currentPage: 1,
        perPage: 10,
        queryMeta: {
          cityName: '',
          dataArray: ''
        },
        selected: null,
        options: ['复兴镇', '秦玲乡', '夏普镇'],
        showSearchBox: false,
        navigationMeta: {
          items: []
        },
        fireCardListMeta: {
          items: [{
            name: '防火门1',
            property: 0,
            state: 1,
            address: 'A小区B栋C单元xxx号'
          }, {
            name: '防火门2',
            property: 0,
            state: 0,
            address: 'A小区B栋C单元xxx号'
          }, {
            name: '防火门3',
            property: 1,
            state: 1,
            address: 'A小区B栋C单元xxx号'
          }, {
            name: '防火门4',
            property: 1,
            state: 0,
            address: 'A小区B栋C单元xxx号'
          }, {
            name: '防火门5',
            property: 0,
            state: 1,
            address: 'A小区B栋C单元xxx号'
          }, {
            name: '防火门6',
            property: 0,
            state: 0,
            address: 'A小区B栋C单元xxx号'
          }, {
            name: '防火门7',
            property: 0,
            state: 1,
            address: 'A小区B栋C单元xxx号'
          }]
        },
        showConfigBox: false,
        msg: 'Index View Template !'
      }
    },
    methods: {
      onToggleSearch () {
        this.$set('showConfigBox', false)
        this.$set('showSearchBox', !this.showSearchBox)
      },

      onToggleConfig () {
        this.$set('showSearchBox', false)
        this.$set('showConfigBox', !this.showConfigBox)
      }
    }
  }
</script>
