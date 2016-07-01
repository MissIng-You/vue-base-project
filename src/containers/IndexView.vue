<template>
  <div id="index-view">

    <div class="card card-blockquote">
      <div class="card-header card-primary-outline">
        <i class="card-mask fa fa-list"></i>
        <span class="card-title">报表数据</span>
        <span class="card-search-group">
          <i class="card-mask fa fa-search" @click="onToggleSearch"></i>
          <span class="card-search card-primary-outline">2016-03-04 / 2016-06-06</span>
          <span class="card-search card-primary-outline">@mod</span>
        </span>
        <i class="card-mask fa fa-cogs pull-right" @click="onToggleConfig"></i>
      </div>
      <div class="card-body">
        <div class="card-body-modal" v-show="showSearchBox || showConfigBox">
          <div class="card-body-modal-search">
            <list v-show="showSearchBox" :meta="searchMeta" orientation="horizontal"></list>
          </div>
          <div class="card-body-modal-config">
            <list v-show="showConfigBox" :meta="configMeta" orientation="vertical"></list>
          </div>
        </div>
        <table class="table table-sm table-bordered table-hover table-striped table-hover-outline">
          <thead>
            <tr>
              <th>乡镇</th>
              <th>村</th>
              <th>组</th>
              <th>户主姓名</th>
              <th>水表编号</th>
              <th>累计用水量（m<sup>3</sup>）</th>
              <th>本月用水量（m<sup>3</sup>）</th>
              <th>已交水费（元）</th>
              <th>当前单价（元/m<sup>3</sup>）</th>
              <th>余额</th>
              <th>是否欠费</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>复兴镇</td>
              <td>印田村</td>
              <td><code>5</code>组</td>
              <td>刘希</td>
              <td>0001897612</td>
              <td><code>3,490</code></td>
              <td><code>84</code></td>
              <td><code>6,790</code></td>
              <td><code>2.75</code></td>
              <td><code>10.56</code></td>
              <td>否</td>
            </tr>
            <tr>
              <td>庆林乡</td>
              <td>红庙村</td>
              <td><code>2</code>组</td>
              <td>王武</td>
              <td>0002334863</td>
              <td><code>2,102</code></td>
              <td><code>125</code></td>
              <td><code>3,210</code></td>
              <td><code>2.75</code></td>
              <td class="text-red">-102.00</td>
              <td class="text-red">是</td>
            </tr>
            <tr>
              <td>复兴镇</td>
              <td>印田村</td>
              <td><code>5</code>组</td>
              <td>刘希</td>
              <td>0001897612</td>
              <td><code>3,490</code></td>
              <td><code>84</code></td>
              <td><code>6,790</code></td>
              <td><code>2.75</code></td>
              <td><code>10.56</code></td>
              <td>否</td>
            </tr>
            <tr>
              <td>庆林乡</td>
              <td>红庙村</td>
              <td><code>2</code>组</td>
              <td>王武</td>
              <td>0002334863</td>
              <td><code>2,102</code></td>
              <td><code>125</code></td>
              <td><code>3,210</code></td>
              <td><code>2.75</code></td>
              <td class="text-red">-102.00</td>
              <td class="text-red">是</td>
            </tr>
            <tr>
              <td>庆林乡</td>
              <td>红庙村</td>
              <td><code>2</code>组</td>
              <td>王武</td>
              <td>0002334863</td>
              <td><code>2,102</code></td>
              <td><code>125</code></td>
              <td><code>3,210</code></td>
              <td><code>2.75</code></td>
              <td class="text-red">-102.00</td>
              <td class="text-red">是</td>
            </tr>
            <tr>
              <td>复兴镇</td>
              <td>印田村</td>
              <td><code>5</code>组</td>
              <td>刘希</td>
              <td>0001897612</td>
              <td><code>3,490</code></td>
              <td><code>84</code></td>
              <td><code>6,790</code></td>
              <td><code>2.75</code></td>
              <td><code>10.56</code></td>
              <td>否</td>
            </tr>
            <tr>
              <td>庆林乡</td>
              <td>红庙村</td>
              <td><code>2</code>组</td>
              <td>王武</td>
              <td>0002334863</td>
              <td><code>2,102</code></td>
              <td><code>125</code></td>
              <td><code>3,210</code></td>
              <td><code>2.75</code></td>
              <td class="text-red">-102.00</td>
              <td class="text-red">是</td>
            </tr>
            <tr>
              <td>庆林乡</td>
              <td>红庙村</td>
              <td><code>2</code>组</td>
              <td>王武</td>
              <td>0002334863</td>
              <td><code>2,102</code></td>
              <td><code>125</code></td>
              <td><code>3,210</code></td>
              <td><code>2.75</code></td>
              <td class="text-red">-102.00</td>
              <td class="text-red">是</td>
            </tr>
            <tr>
              <td>复兴镇</td>
              <td>印田村</td>
              <td><code>5</code>组</td>
              <td>刘希</td>
              <td>0001897612</td>
              <td><code>3,490</code></td>
              <td><code>84</code></td>
              <td><code>6,790</code></td>
              <td><code>2.75</code></td>
              <td><code>10.56</code></td>
              <td>否</td>
            </tr>
            <tr>
              <td>庆林乡</td>
              <td>红庙村</td>
              <td><code>2</code>组</td>
              <td>王武</td>
              <td>0002334863</td>
              <td><code>2,102</code></td>
              <td><code>125</code></td>
              <td><code>3,210</code></td>
              <td><code>2.75</code></td>
              <td class="text-red">-102.00</td>
              <td class="text-red">是</td>
            </tr>
            <tr>
              <td>复兴镇</td>
              <td>印田村</td>
              <td><code>5</code>组</td>
              <td>刘希</td>
              <td>0001897612</td>
              <td><code>3,490</code></td>
              <td><code>84</code></td>
              <td><code>6,790</code></td>
              <td><code>2.75</code></td>
              <td><code>10.56</code></td>
              <td>否</td>
            </tr>
            <tr>
              <td>庆林乡</td>
              <td>红庙村</td>
              <td><code>2</code>组</td>
              <td>王武</td>
              <td>0002334863</td>
              <td><code>2,102</code></td>
              <td><code>125</code></td>
              <td><code>3,210</code></td>
              <td><code>2.75</code></td>
              <td class="text-red">-102.00</td>
              <td class="text-red">是</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer card-danger-outline">
        <i class="card-mask fa fa-pie-chart"></i>
        <span class="card-title">1245(条)</span>
        <span class="card-pagination">
          <ul class="pagination pagination-sm pagination-no-padding">
            <li class="page-item active"><span class="page-link">1</span></li>
            <li class="page-item"><span class="page-link">2</span></li>
            <li class="page-item"><span class="page-link">3</span></li>
            <li class="page-item"><span class="page-link">4</span></li>
            <li class="page-item"><span class="page-link">5</span></li>
          </ul>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import customBootstrap from '../components'

  let { list } = customBootstrap

  export default {
    name: 'IndexView',
    components: {
      list
    },
    data () {
      return {
        showSearchBox: false,
        configMeta: {
          items: [{
            icon: 'fa-check-square-o',
            title: '乡镇、村、组',
            url: '/baidu'
          }, {
            icon: 'fa-check-square-o',
            title: '户主姓名',
            url: '/todo'
          }, {
            icon: 'fa-check-square-o',
            title: '水表编号',
            url: '/login'
          }, {
            icon: 'fa-check-square-o',
            title: '累计用水量',
            url: '/arcgis'
          }, {
            icon: 'fa-square-o',
            title: '左侧菜单',
            url: '/sidebar'
          }, {
            icon: 'fa-square-o',
            title: '更多菜单',
            url: '/more'
          }]
        },
        searchMeta: {
          items: [{
            icon: 'fa-home',
            title: '控制面板',
            url: '/baidu'
          }, {
            icon: 'fa-cog',
            title: '设置列表',
            url: '/todo'
          }, {
            icon: 'fa-feed',
            title: '登录页面',
            url: '/login'
          }, {
            icon: 'fa-fire',
            title: '地图页面',
            url: '/arcgis'
          }, {
            icon: 'fa-list',
            title: '左侧菜单',
            url: '/sidebar'
          }, {
            icon: 'fa-plus',
            title: '更多菜单',
            url: '/more'
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
