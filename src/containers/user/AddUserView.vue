<template>
  <div id="add-view">
    <modal id="addUserModal" size="sm" :fade="true">
      <div slot="modal-header">
        <i class="modal-mask fa fa-plus"></i>
        <span class="modal-title">新增用户</span>
      </div>
      <div slot="modal-body">
        <validator name="validation">
          <form class="form-horizontal">
            <template v-for="field in validate">
              <div class="form-group">
                <label :for="field.id" class="col-sm-4 control-label">{{field.label}}<i class="form-mask fa fa-hashtag"></i></label>
                <div class="col-sm-8">
                  <input type="text" v-model="field.value" class="form-control form-control-sm"
                         :id="field.id" :field="field.name" :placeholder="field.placeholder" v-validate="field.validate">
                </div>
              </div>
            </template>
          </form>
        </validator>
      </div>
      <div slot="modal-footer">
        <div v-if="!!validateMessage" class="alert alert-danger alert-sm">{{validateMessage}}</div>
        <div class="label label-vertical label-info label-pill">{{message}}</div>
        <div class="pull-right">
          <button type="button" @click="onAddUser" class="btn btn-success btn-xs" ><i class="fa fa-fw fa-lg fa-check-circle"></i>确定</button>
          <button type="button" @click="onCancelUser" class="btn btn-defualt btn-xs"><i class="fa fa-fw fa-lg fa-times-circle"></i>取消</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import ApiService from '../../api'
  import vuestrapBase from 'vuestrap-base-components'

  let { addUser } = ApiService.userService

  export default {
    name: 'AddUserView',
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
        validateMessage: ''
      }
    },
    watch: {
      'validate': function (newVal, oldVal) {
        let self = this
        for (let index = 0; index < newVal.length; index++) {
          let fieldItem = newVal[index]
          console.log(newVal)
          self.$set(`meta.${fieldItem.id}`, fieldItem.value)
        }
      }
    },
    methods: {
      _hideModal () {
        let self = this
        self.$set('message', '即将关闭，请稍后...')
        window.setTimeout(function () {
          self.$broadcast('hide::modal', 'addUserModal')
          self.$set('message', '')
        }, 1000)
      },
      _resetUser () {
        this.$set('meta.UserName', '')
        this.$set('meta.RoleID', '')
        this.$set('meta.Telphone', '')
      },
      _addUser () {
        let self = this
        let postData = this.meta
        addUser(postData, function (response) {
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
      _validate () {
        let self = this
        self.$validate(true, function () {
          if (self.$validation.invalid) {
            let errorLength = self.$validation.errors.length
            self.$set('validateMessage', self.$validation.errors[errorLength - 1].message)
            return
          }

          self._addUser()
        })
      },
      onAddUser () {
        this._validate()
      },
      onCancelUser () {
        this._hideModal()
        this._resetUser()
      }
    }
  }
</script>
