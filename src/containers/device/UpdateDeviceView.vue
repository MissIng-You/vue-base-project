<template>
  <div id="update-view">
    <modal id="updateDeviceModal" size="sm" :fade="true">
      <div slot="modal-header">
        <i class="modal-mask fa fa-pencil"></i>
        <span class="modal-title">修改防火门监控器</span>
      </div>
      <div slot="modal-body">
        <validator name="validation">
          <form class="form-horizontal">
            <template v-for="field in validate">
              <div class="form-group">
                <label :for="field.id" class="col-sm-4 control-label">{{field.label}}<i class="form-mask fa fa-hashtag"></i></label>
                <div class="col-sm-8">
                  <input type="text" v-model="meta[field.id]" class="form-control form-control-sm" @keyup="_validate"
                         :id="field.id" :field="$index.toString()" :placeholder="field.placeholder" v-validate="field.validate">
                </div>
              </div>
            </template>
          </form>
        </validator>
      </div>
      <div slot="modal-footer">
        <div class="alert alert-danger alert-sm" v-if="!!validateMessage">{{validateMessage}}</div>
        <div class="label label-vertical label-info label-pill">{{message}}</div>
        <div class="pull-right">
          <button type="button" @click="onUpdateDevice" class="btn btn-success btn-xs" ><i class="fa fa-fw fa-lg fa-check-circle"></i>确定</button>
          <button type="button" @click="onCancelDevice" class="btn btn-defualt btn-xs"><i class="fa fa-fw fa-lg fa-times-circle"></i>取消</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import ApiService from '../../api'
  import vuestrapBase from 'vuestrap-base-components'
  import ValidateMixins from '../_shared/ValidateMixins'

  let { updateDevice } = ApiService.deviceService

  export default {
    name: 'UpdateDeviceView',
    mixins: [ValidateMixins],
    components: {
      modal: vuestrapBase.modal
    },
    data () {
      return {
        message: '',
        validateMessage: ''
      }
    },
    methods: {
      _hideModal () {
        let self = this
        self.$set('message', '即将关闭，请稍后...')
        window.setTimeout(function () {
          self.$broadcast('hide::modal', 'updateDeviceModal')
          self.$set('message', '')
          self._resetDevice()
        }, 1000)
      },
      _resetDevice () {
        this.$set('meta', {})
      },
      _updateDevice () {
        let self = this
        let postData = this.meta
        updateDevice(postData, function (response) {
          let data = response.data
          let message = ''
          console.log(self.meta)
          console.log(response.data)
          if (data && data.Success) {
            message = '操作成功，即将跳转...'
            self._hideModal()
          } else if (data.Error) {
            message = data.Error
          } else if (data.errors) {
            message = data.errors[0].errors[0]
          } else {
            message = '未知错误，请联系管理员!'
          }
          self.$set('message', message)
        })
      },
      _validate () {
        let self = this
        let isValid = false
        self.$validate(true, function () {
          if (self.$validation.invalid) {
//            let errorLength = self.$validation.errors.length
//          永远输出列表中的第一个错误
            self.$set('validateMessage', self.$validation.errors[0].message)
            console.table(self.$validation.errors)
          } else {
            self.$set('validateMessage', '')
            isValid = true
          }
        })
        return isValid
      },
      onUpdateDevice () {
        if (this._validate()) {
          this._updateDevice()
        }
      },
      onCancelDevice () {
        this._hideModal()
      }
    }
  }
</script>
