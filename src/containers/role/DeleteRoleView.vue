<template>
  <div id="add-view">
    <modal id="deleteRoleModal" size="sm" :fade="true">
      <div slot="modal-header">
        <i class="modal-mask fa fa-trash"></i>
        <span class="modal-title">删除确认</span>
      </div>
      <div slot="modal-body">
        <i class="fa fa-alert"></i>
        <span>确认删除【{{meta.RoleName}}】记录吗?</span>
      </div>
      <div slot="modal-footer">
        <div class="label label-vertical label-info label-pill">{{message}}</div>
        <div class="pull-right">
          <button type="button" @click="onDeleteRole" class="btn btn-danger btn-xs" ><i class="fa fa-fw fa-lg fa-trash"></i>删除</button>
          <button type="button" @click="onCancelRole" class="btn btn-defualt btn-xs"><i class="fa fa-fw fa-lg fa-times-circle"></i>取消</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import ApiService from '../../api'
  import vuestrapBase from 'vuestrap-base-components'

  let { deleteRole } = ApiService.roleService

  export default {
    name: 'AddRoleView',
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
          self.$broadcast('hide::modal', 'deleteRoleModal')
          self.$set('message', '')
        }, 1000)
      },
      onDeleteRole () {
        let self = this
//        let postData = {
//          userid: this.userMeta.RoleID
//        }
        let postData = this.meta
        deleteRole(postData, function (response) {
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
      onCancelRole () {
        this._hideModal()
      }
    }
  }
</script>
