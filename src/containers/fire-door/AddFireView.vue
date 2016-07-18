<template>
  <div id="add-view">
    <modal id="addFireModal" size="sm" :fade="true">
      <div slot="modal-header">
        <i class="modal-mask fa fa-plus"></i>
        <span class="modal-title">新增用户</span>
      </div>
      <div slot="modal-body">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="FireName" class="col-sm-4 control-label">用户名称<i class="form-mask fa fa-hashtag"></i></label>
            <div class="col-sm-8">
              <input type="text" v-model="meta.FireName" class="form-control form-control-sm" id="FireName" placeholder="请输入用户名">
            </div>
          </div>
          <div class="form-group">
            <label for="Telphone" class="col-sm-4 control-label">手机号码<i class="form-mask fa fa-hashtag"></i></label>
            <div class="col-sm-8">
              <input type="text" v-model="meta.Telphone"  class="form-control  form-control-sm" id="Telphone" placeholder="请输入手机号码">
            </div>
          </div>
          <div class="form-group">
            <label for="FireID" class="col-sm-4 control-label">用户角色<i class="form-mask fa fa-hashtag"></i></label>
            <div class="col-sm-8">
              <input type="text" v-model="meta.FireID" class="form-control  form-control-sm" id="FireID" placeholder="请选择角色类型">
            </div>
          </div>
        </form>
      </div>
      <div slot="modal-footer">
        <div class="alert alert-danger alert-sm">{{validateMessage}}</div>
        <div class="label label-vertical label-info label-pill">{{message}}</div>
        <div class="pull-right">
          <button type="button" @click="onAddFire" class="btn btn-success btn-xs" ><i class="fa fa-fw fa-lg fa-check-circle"></i>确定</button>
          <button type="button" @click="onCancelFire" class="btn btn-defualt btn-xs"><i class="fa fa-fw fa-lg fa-times-circle"></i>取消</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import ApiService from '../../api'
  import vuestrapBase from 'vuestrap-base-components'

  let { addFire } = ApiService.userService

  export default {
    name: 'AddFireView',
    components: {
      modal: vuestrapBase.modal
    },
    props: {
      meta: {
        type: Object,
        default: function () {
          return {}
        }
      },
      validate: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        message: '',
        validateMessage: 'xxxxxxxxxxxxxxx'
      }
    },
    methods: {
      _hideModal () {
        let self = this
        self.$set('message', '即将关闭，请稍后...')
        window.setTimeout(function () {
          self.$broadcast('hide::modal', 'addFireModal')
          self.$set('message', '')
        }, 1000)
      },
      _resetFire () {
        this.$set('meta.FireName', '')
        this.$set('meta.FireID', '')
        this.$set('meta.Telphone', '')
      },
      onAddFire () {
        let self = this
        let postData = this.meta
        addFire(postData, function (response) {
          let data = response.data
          let message = ''
          console.log(self.meta)
          console.log(response.data)
          if (data && data.Success) {
            message = '操作成功，即将跳转...'
            self._hideModal()
          } else if (data.Error) {
            message = data.Error
          } else {
            message = '未知错误，请联系管理员!'
          }
          self.$set('message', message)
        })
      },
      onCancelFire () {
        this._hideModal()
        this._resetFire()
      }
    }
  }
</script>
