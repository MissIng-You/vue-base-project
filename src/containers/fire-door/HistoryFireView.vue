<template>
  <div id="history-view">
    <modal id="historyFireModal" size="sm" :fade="true">
      <div slot="modal-header">
        <i class="modal-mask fa fa-history"></i>
        <span class="modal-title">防火门历史纪录</span>
        <div class="pull-right btn-group btn-group-sm">
          <span class="btn {{ getClassByState('24h') }} btn-xs" @click="onFilter('24h')">24时</span>
          <span class="btn {{ getClassByState('3d') }} btn-xs" @click="onFilter('3d')">3天</span>
          <span class="btn {{ getClassByState('1w') }} btn-xs" @click="onFilter('1w')">1周</span>
        </div>
      </div>
      <div slot="modal-body">
        <ctable v-ref:ctable
                api-url="/api/user-service/getFireListMock.json"
                :show-pagination=false
                pagination-path=""
                :load-on-start=false
                :fields="historyDefineMeta.fields"
                :table-data="historyListMeta.items"
                :sort-order="sortOrder"
                table-class="table table-sm table-bordered table-striped table-hover table-hover-outline"
                ascending-icon="fa fa-arrow-up"
                descending-icon="fa fa-arrow-down">
        </ctable>
      </div>
      <div slot="modal-footer">
        <div class="label label-vertical label-info label-pill">{{message}}</div>
        <div class="pull-right">
          <!--<button type="button" @click="onAddFire" class="btn btn-warning btn-xs" ><i class="fa fa-fw fa-lg fa-history"></i>关闭</button>-->
          <button type="button" @click="onCancelFire" class="btn btn-warning btn-xs"><i class="fa fa-fw fa-lg fa-times-circle"></i>关闭</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import ApiService from '../../api'
  import vuestrapBase from 'vuestrap-base-components'
  import ValidateMixins from '../_shared/ValidateMixins'
  import customBootstrap from '../../components'

  let { ctable } = customBootstrap
  let { getHistoryFireList } = ApiService.fireService

  export default {
    name: 'HistoryFireView',
    mixins: [ValidateMixins],
    components: {
      modal: vuestrapBase.modal,
      ctable
    },
    data () {
      return {
        message: '',
        queryMeta: {
          search: '24h',
          filterClazz: {
            '24h': 1,
            '3d': 0,
            '1w': 0
          }
        },
        historyListMeta: {
          totalCount: 0,
          items: []
        },
        historyDefineMeta: {
          modalType: 'normal',
          fields: [
            {name: 'StateCode', visible: false},
            {name: 'StateName', title: '异常类型'},
            {name: 'StateCount', title: '异常次数'},
            {name: 'StateTime', title: '截至时间'}
          ]
        }
      }
    },
    methods: {
      _getHistoryFireList (historyQuery) {
        let self = this
        getHistoryFireList(historyQuery, function (response) {
          if (!response.data || !response.data.Items) return
          self.$set('historyListMeta.items', response.data.Items)
        })
      },
      _hideModal () {
        let self = this
        self.$set('message', '即将关闭，请稍后...')
        window.setTimeout(function () {
          self.$broadcast('hide::modal', 'historyFireModal')
          self.$set('message', '')
          self._resetFire()
        }, 1000)
      },
      getClassByState (value) {
        let { filterClazz } = this.queryMeta
        if (filterClazz[value] === 1) {
          return 'btn-warning'
        } else {
          return 'btn-secondary'
        }
      },
      _resetFire () {
        this.$set('meta', {})
      },
      _toggleFilter (value) {
        let { filterClazz } = this.queryMeta
        for (let [key] of Object.entries(filterClazz)) {
          if (value === key) {
            filterClazz[key] = 1
          } else {
            filterClazz[key] = 0
          }
        }
      },
      onFilter (value) {
        this.$set('queryMeta.search', value)
        this._toggleFilter(value)
        let historyQuery = {
          fireDoorId: this.meta.FireDoorID,
          stateTime: this.queryMeta.search
        }
        console.log(historyQuery)
        this._getHistoryFireList(historyQuery)
      },
      onCancelFire () {
        this._hideModal()
      }
    },
    ready () {
      let { meta, queryMeta } = this
      let historyQuery = {
        fireDoorId: meta.FireDoorID,
        stateTime: queryMeta.search
      }
      console.log(historyQuery)
      this._getHistoryFireList(historyQuery)
    }
  }
</script>
