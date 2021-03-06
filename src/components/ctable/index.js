import template from './ctable.html'

import './ctable.css'

export default {
  name: 'Ctable',
  replace: true,
  template: template,
  props: {
    'tableData': {
      type: Array,
      default: function () {
        return null
      }
    },
    'wrapperClass': {
      type: String,
      default: function () {
        return null
      }
    },
    'tableWrapper': {
      type: String,
      default: function () {
        return null
      }
    },
    'tableClass': {
      type: String,
      default: function () {
        return 'ui blue striped selectable celled stackable attached table'
      }
    },
    'loadingClass': {
      type: String,
      default: function () {
        return 'loading'
      }
    },
    'dataPath': {
      type: String,
      default: function () {
        return 'data'
      }
    },
    'paginationPath': {
      type: String,
      default: function () {
        return 'links.pagination'
      }
    },
    'fields': {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    'apiUrl': {
      type: String,
      required: true
    },
    'sortOrder': {
      type: Object,
      default: function () {
        return {
          field: '',
          direction: 'asc'
        }
      }
    },
    'perPage': {
      type: Number,
      coerce: function (val) {
        return parseInt(val)
      },
      default: function () {
        return 10
      }
    },
    'ascendingIcon': {
      type: String,
      default: function () {
        return 'blue chevron up icon'
      }
    },
    'descendingIcon': {
      type: String,
      default: function () {
        return 'blue chevron down icon'
      }
    },
    'appendParams': {
      type: Array,
      default: function () {
        return []
      }
    },
    'showPagination': {
      type: Boolean,
      default: function () {
        return true
      }
    },
    'paginationComponent': {
      type: String,
      default: function () {
        return 'ctable-pagination'
      }
    },
    'paginationInfoTemplate': {
      type: String,
      default: function () {
        return 'Displaying {from} to {to} of {total} items'
      }
    },
    'paginationInfoNoDataTemplate': {
      type: String,
      default: function () {
        return 'No relevant data'
      }
    },
    'paginationClass': {
      type: String,
      default: function () {
        return 'ui bottom attached segment grid'
      }
    },
    'paginationInfoClass': {
      type: String,
      default: function () {
        return 'left floated left aligned six wide column'
      }
    },
    'paginationComponentClass': {
      type: String,
      default: function () {
        return 'right floated right aligned six wide column'
      }
    },
    'paginationConfig': {
      type: String,
      default: function () {
        return 'paginationConfig'
      }
    },
    itemActions: {
      type: Array,
      default: function () {
        return []
      }
    },
    queryParams: {
      type: Object,
      default: function () {
        return {
          sort: 'sort',
          page: 'page',
          perPage: 'per_page'
        }
      }
    },
    loadOnStart: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    selectedTo: {
      type: Array,
      default: function () {
        return []
      }
    },
    httpData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    httpOptions: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return {
      version: '1.1.1',
      eventPrefix: 'ctable:',
//        tableData: null,
      tablePagination: null,
      currentPage: 1
    }
  },
  directives: {
    'attr': {
      update: function (value) {
        for (var i in value) {
          this.el.setAttribute(i, value[i])
        }
      }
    }
  },
  computed: {
    sortIcon: function () {
      return this.sortOrder.direction === 'asc' ? this.ascendingIcon : this.descendingIcon
    },
    paginationInfo: function () {
      if (this.tablePagination === null || this.tablePagination.total === 0) {
        return this.paginationInfoNoDataTemplate
      }

      return this.paginationInfoTemplate
        .replace('{from}', this.tablePagination.from || 0)
        .replace('{to}', this.tablePagination.to || 0)
        .replace('{total}', this.tablePagination.total || 0)
    }
  },
  methods: {
    normalizeFields: function () {
      var self = this
      var obj
      this.fields.forEach(function (field, i) {
        if (typeof (field) === 'string') {
          obj = {
            name: field,
            title: self.setTitle(field),
            titleClass: '',
            dataClass: '',
            callback: null,
            visible: true
          }
        } else {
          obj = {
            name: field.name,
            title: (field.title === undefined) ? self.setTitle(field.name) : field.title,
            sortField: field.sortField,
            titleClass: (field.titleClass === undefined) ? '' : field.titleClass,
            dataClass: (field.dataClass === undefined) ? '' : field.dataClass,
            callback: (field.callback === undefined) ? '' : field.callback,
            visible: (field.visible === undefined) ? true : field.visible
          }
        }
        self.fields.$set(i, obj)
      })
    },
    setTitle: function (str) {
      if (this.isSpecialField(str)) {
        return ''
      }

      return this.titleCase(str)
    },
    titleCase: function (str) {
      return str.replace(/\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    loadData: function () {
      var wrapper = document.querySelector(this.tableWrapper)
      this.showLoadingAnimation(wrapper)

      var params = [
        this.queryParams.sort + '=' + this.getSortParam(),
        this.queryParams.page + '=' + this.currentPage,
        this.queryParams.perPage + '=' + this.perPage
      ]

      var url = this.apiUrl + '?' + params.join('&')
      if (this.appendParams.length > 0) {
        url += '&' + this.appendParams.join('&')
      }
      var self = this
      this.$http.get(url, this.httpData, this.httpOptions)
        .then(function (response) {
          self.tableData = self.getObjectValue(response.data, self.dataPath, null)
          self.tablePagination = self.getObjectValue(response.data, self.paginationPath, null)
          if (self.tablePagination === null) {
            console.warn('ctable: pagination-path "' + self.paginationPath + '"" not found. ' +
              'It looks like the data returned from the sever does not have pagination information.'
            )
          }

          self.dispatchEvent('load-success', response)
          self.broadcastEvent('load-success', self.tablePagination)

          self.hideLoadingAnimation(wrapper)
        }, function (response) {
          self.dispatchEvent('load-error', response)
          self.broadcastEvent('load-error', response)

          self.hideLoadingAnimation(wrapper)
        })
    },
    showLoadingAnimation: function (wrapper) {
      if (wrapper !== null) {
        this.addClass(wrapper, this.loadingClass)
      }
      this.dispatchEvent('loading')
    },
    hideLoadingAnimation: function (wrapper) {
      if (wrapper !== null) {
        this.removeClass(wrapper, this.loadingClass)
      }
      this.dispatchEvent('loaded')
    },
    getTitle: function (field) {
      if (typeof field.title === 'undefined') {
        return field.name.replace('.', ' ')
      }
      return field.title
    },
    getSortParam: function () {
      if (!this.sortOrder || this.sortOrder.field === '') {
        return ''
      }

      var fieldName = (typeof this.sortOrder.sortField === 'undefined')
        ? this.sortOrder.field
        : this.sortOrder.sortField

      return fieldName + '|' + this.sortOrder.direction
    },
    addClass: function (el, className) {
      if (el.classList) {
        el.classList.add(className)
      } else {
        el.className += ' ' + className
      }
    },
    removeClass: function (el, className) {
      if (el.classList) {
        el.classList.remove(className)
      } else {
        el.className = el.className
          .replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
      }
    },
    dispatchEvent: function (eventName, args) {
      this.$dispatch(this.eventPrefix + eventName, args)
    },
    broadcastEvent: function (eventName, args) {
      this.$broadcast(this.eventPrefix + eventName, args)
    },
    orderBy: function (field) {
      if (!this.isSortable(field)) {
        return
      }

      if (this.sortOrder.field === field.name) {
        // change sort direction
        this.sortOrder.direction = this.sortOrder.direction === 'asc' ? 'desc' : 'asc'
      } else {
        // reset sort direction
        this.sortOrder.direction = 'asc'
      }
      this.sortOrder.field = field.name
      this.sortOrder.sortField = field.sortField
      this.currentPage = 1    // reset page index
      this.loadData()
    },
    isSortable: function (field) {
      return !(typeof field.sortField === 'undefined')
    },
    isCurrentSortField: function (field) {
      if (!this.isSortable(field)) {
        return false
      }

      return this.sortOrder.field === field.name
    },
    gotoPreviousPage: function () {
      if (this.currentPage > 1) {
        this.currentPage--
        this.loadData()
      }
    },
    gotoNextPage: function () {
      if (this.currentPage < this.tablePagination.last_page) {
        this.currentPage++
        this.loadData()
      }
    },
    gotoPage: function (page) {
      if (page !== this.currentPage && (page > 0 && page <= this.tablePagination.last_page)) {
        this.currentPage = page
        this.loadData()
      }
    },
    isSpecialField: function (fieldName) {
      return new RegExp('^__').test(fieldName)
    },
    hasCallback: function (item) {
      return !!item.callback
    },
    callCallback: function (field, item) {
      if (!this.hasCallback(field)) return

      var args = field.callback.split('|')
      var func = args.shift()

      if (typeof this.$parent[func] === 'function') {
        return (args.length > 0)
          ? this.$parent[func].apply(this.$parent, [this.getObjectValue(item, field.name)].concat(args))
          : this.$parent[func].apply(this.$parent, this.getObjectValue(item, field.name))
      }

      return null
    },
    getObjectValue: function (object, path, defaultValue) {
      defaultValue = (typeof defaultValue === 'undefined') ? null : defaultValue

      var obj = object
      if (path.trim() !== '') {
        var keys = path.split('.')
        keys.forEach(function (key) {
          if (typeof obj[key] !== 'undefined' && obj[key] !== null) {
            obj = obj[key]
          } else {
            obj = defaultValue
            return
          }
        })
      }
      return obj
    },
    callAction: function (action, data) {
      this.$dispatch(this.eventPrefix + 'action', action, data)
    },
    addParam: function (param) {
      this.appendParams.push(param)
    },
    toggleCheckbox: function (isChecked, dataItem, fieldName) {
      var idColumn = this.extractArgs(fieldName)
      if (idColumn === undefined) {
        console.warn('You did not provide reference id column with "__checkbox:<column_name>" field!')
        return
      }
      if (isChecked) {
        this.selectedTo.push(dataItem[idColumn])
      } else {
        this.selectedTo.$remove(dataItem[idColumn])
      }
    },
    toggleAllCheckboxes: function (isChecked, fieldName) {
      var self = this
      var idColumn = this.extractArgs(fieldName)

      if (isChecked) {
        this.tableData.forEach(function (dataItem) {
          if (!self.isSelectedRow(dataItem, fieldName)) {
            self.selectedTo.push(dataItem[idColumn])
          }
        })
      } else {
        this.tableData.forEach(function (dataItem) {
          self.selectedTo.$remove(dataItem[idColumn])
        })
      }
    },
    isSelectedRow: function (dataItem, fieldName) {
      return this.selectedTo.indexOf(dataItem[this.extractArgs(fieldName)]) >= 0
    },
    extractName: function (string) {
      return string.split(':')[0].trim()
    },
    extractArgs: function (string) {
      return string.split(':')[1]
    },
    onRowChanged: function (dataItem) {
      this.dispatchEvent('row-changed', dataItem)
      return true
    },
    onRowClicked: function (dataItem, event) {
      this.$dispatch(this.eventPrefix + 'row-clicked', dataItem, event)
      return true
    },
    onCellDoubleClicked: function (dataItem, field, event) {
      this.$dispatch(this.eventPrefix + 'cell-dblclicked', dataItem, field, event)
    },
    callPaginationConfig: function () {
      if (typeof this.$parent[this.paginationConfig] === 'function') {
        this.$parent[this.paginationConfig].apply(this.$parent, this.$refs.pagination.$options.name)
      }
    }
  },
  events: {
    'ctable-pagination:change-page': function (page) {
      if (page === 'prev') {
        this.gotoPreviousPage()
      } else if (page === 'next') {
        this.gotoNextPage()
      } else {
        this.gotoPage(page)
      }
    },
    'ctable:reload': function () {
      this.loadData()
    },
    'ctable:refresh': function () {
      this.currentPage = 1
      this.loadData()
    },
    'ctable:goto-page': function (page) {
      this.$emit('ctable-pagination:change-page', page)
    },
    'ctable:set-options': function (options) {
      for (var n in options) {
        this.$set(n, options[n])
      }
    }
  },
  created: function () {
    this.normalizeFields()
    if (this.loadOnStart) {
      this.loadData()
    }
/*    this.$nextTick(function () {
      this.callPaginationConfig()
    })*/
  }
}
