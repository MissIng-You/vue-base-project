<template>
  <div id="add-view">
    <modal id="deleteDeviceModal" size="sm" :fade="true">
      <div slot="modal-header">
        <i class="modal-mask fa fa-trash"></i>
        <span class="modal-title">删除确认</span>
      </div>
      <div slot="modal-body">
        <i class="fa fa-alert"></i>
        <span>确认删除【{{meta.DeviceName}}】记录吗?</span>
      </div>
      <div slot="modal-footer">
        <div class="label label-vertical label-info label-pill">{{message}}</div>
        <div class="pull-right">
          <button type="button" @click="onDeleteDevice" class="btn btn-danger btn-xs" ><i class="fa fa-fw fa-lg fa-trash"></i>删除</button>
          <button type="button" @click="onCancelDevice" class="btn btn-defualt btn-xs"><i class="fa fa-fw fa-lg fa-times-circle"></i>取消</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import ApiService from '../../api'
  import vuestrapBase from 'vuestrap-base-components'

  let { deleteDevice } = ApiService.deviceService

  export default {
    name: 'DeleteDeviceView',
    components: {
      modal: vuestrapBase.modal
    },
    props: {
      meta: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        message: ''
      }
    },
    methods: {
      _hideModal () {
        let self = this
        self.$set('message', '即将关闭，请稍后...')
        window.setTimeout(function () {
          self.$broadcast('hide::modal', 'deleteDeviceModal')
          self.$set('message', '')
        }, 1000)
      },
      onDeleteDevice () {
        let self = this
        let postData = this.meta
//        let postData = {
//          deviceid: this.deviceMeta.DeviceID
//        }
        deleteDevice(postData, function (response) {
          let data = response.data
          let message = ''
          console.log(self.userMeta)
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
      onCancelDevice () {
        this._hideModal()
      }
    }
  }
</script>
