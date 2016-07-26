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
                  <template v-if="field.type === 'text'">
                    <input :type="field.type" v-model="meta[field.id]" class="form-control form-control-sm"
                           :id="field.id" :field="$index.toString()" @keyup="_validate"
                           :placeholder="field.placeholder" v-validate="field.validate">
                  </template>
                  <template v-if="field.type === 'select'">
                    <multiselect :options="field.options" :on-change="onSelectChange"
                                 :placeholder="field.placeholder" :selected.sync="field.selected"
                                 :key="field.id" :label="field.display"
                                 selected-label="已选中" select-label="点击选中" deselect-label="取消选中">
                      <span slot="noResult">未找到结果...</span>
                    </multiselect>
                  </template>
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
  import ValidateMixins from '../_shared/ValidateMixins'
  import Multiselect from 'vue-multiselect'

  let { addUser } = ApiService.userService

  export default {
    name: 'AddUserView',
    mixins: [ValidateMixins],
    components: {
      modal: vuestrapBase.modal,
      Multiselect
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
          self.$broadcast('hide::modal', 'addUserModal')
          self.$set('message', '')
          self.$set('validateMessage', '')
          self._resetUser()
        }, 1000)
      },
      _resetUser () {
        this.$set('meta', {})
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
        let isValid = true
        self.$validate(true, function () {
          if (self.$validation.invalid) {
//            let errorLength = self.$validation.errors.length
//          永远输出列表中的第一个错误
            self.$set('validateMessage', self.$validation.errors[0].message)
            console.table(self.$validation.errors)
            isValid = false
          } else {
            self.$set('validateMessage', null)
          }
        })
        return isValid
      },
      onSelectChange (newVal) {
        if (!newVal) return
        for (let index = 0; index < this.validate.length; index++) {
          let tempItem = this.validate[index]
          if (tempItem.type === 'select' || tempItem.type === 'multiselect') {
            this.$set(`meta.${tempItem.id}`, newVal[tempItem.id])
            break
          }
        }
      },
      onAddUser () {
        if (this._validate()) {
          this._addUser()
        }
      },
      onCancelUser () {
        this._hideModal()
      }
    }
  }
</script>
