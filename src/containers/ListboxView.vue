<template>
  <div id="listbox" class="listbox">
    <grid-loader v-if="$loadingRouteData" :color="color" :size="size"></grid-loader>
    <list v-if="!$loadingRouteData" :theme="primary" :meta="listboxMeta" orientation="horizontal"></list>
    <!--<vs-form-select-->
      <!--:model.sync="model"-->
      <!--:options="options"-->
      <!--:default-option="{text: 'Please select one',value: 'default'}"-->
      <!--type="text"-->
      <!--label="Example Label"-->
      <!--description="We'll never share your gender with anyone else."-->
      <!--:size="size"-->
      <!--:state="state">-->
    <!--</vs-form-select>-->
    <vs-dropdown-select
      :list="list"
      :model.sync="model"
      :position="position"
      :size="size"
      :variant="variant"
      default-text="Action"
      :force-default="forceDefault"
      :arrow="arrow"
      :caret="caret"
      :dropup="dropup"
      return-object>
    </vs-dropdown-select>
  </div>
</template>

<script>
  import vuestrapBase from 'vuestrap-base-components'
  import { GridLoader } from 'vue-spinner/dist/vue-spinner'
  import customBootstrap from '../components'
  import ApiService from '../api'

  let { list } = customBootstrap
  let { getMenuList } = ApiService

//  let isLoadedOfListbox = false

  export default {
    name: 'ListboxView',
    route: {
      data: function (transition) {
        window.setTimeout(function () {
          getMenuList(function (response) {
            console.log(response)

            transition.next({
              listboxMeta: {
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
        model: {
          text: 'First',
          value: 'first'
        },
        list: [
          {
            text: 'First',
            value: 'first'
          }, {
            text: 'Second',
            value: 'second'
          }
        ],
        caret: true,
        dropup: false,
        forceDefault: false,
        position: 'left',
        variant: 'primary',
        options: [
          {
            text: 'Male',
            value: 'male'
          }, {
            text: 'Female',
            value: 'female'
          }
        ],
        state: 'default',
        color: '#222',
        size: '20px',
        listboxMeta: {
          title: '用户登录',
          showItemCount: 4,
          items: []
        }
      }
    },
    components: {
      list,
      GridLoader,
      'vs-form-select': vuestrapBase.formSelect,
      'vs-dropdown-select': vuestrapBase.dropdownSelect
    }
  }
</script>
