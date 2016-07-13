import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import AppView from './containers/AppView'
// import HelloView from './containers/HelloView'
// import ArcgisView from './containers/ArcgisView'

// all styles
import 'animate.css'
import './assets/styles/custom-scss/custom-bootstrap.scss'
import './assets/styles/font-awesome/css/font-awesome.min.css'

Vue.config.debug = true
Vue.config.devtools = true

// custom define transition style.
Vue.transition('bounce', {
  enterClass: 'bounceInLeft',
  leaveClass: 'bounceOutRight'
})

Vue.transition('slide', {
  enterClass: 'fadeIn',
  leaveClass: 'fadeOut'
})

Vue.transition('fade', {
  enterClass: 'fadeIn',
  leaveClass: 'fadeOut'
})

// use vue validator
Vue.use(VueValidator)

// use vue resource
Vue.use(VueResource)

// use vue resource interceptors
Vue.http.interceptors.push((request, next) => {
  console.log('request params:')
  console.log(request)

  next((response) => {
    console.log('response data:')
    console.log(response)
  })
})

// install router
Vue.use(Router)

// routing
var router = new Router({
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  transitionOnLoad: true,
  linkActiveClass: 'active'
})

router.map({
  '/fireDoor': {
    name: 'fireDoor',
    component: function (resolve) {
      require.ensure([], function () {
        let sidebar = require('./containers/SidebarView')
        resolve(sidebar)
      }, 'fireDoor')
    },
    subRoutes: {
      '/monitor': {
        component: function (resolve) {
          require.ensure([], function () {
            let navigation = require('./containers/fire-door/FireDoorMonitorView')
            resolve(navigation)
          }, 'fireDoor.monitor')
        }
      },
      '/deviceManage': {
        component: function (resolve) {
          require.ensure([], function () {
            let add = require('./containers/device/DeviceManageView')
            resolve(add)
          }, 'fireDoor.deviceManage')
        }
      },
      '/userManage': {
        component: function (resolve) {
          require.ensure([], function () {
            let deleteView = require('./containers/user/UserManageView')
            resolve(deleteView)
          }, 'fireDoor.userManage')
        }
      },
      '/roleManage': {
        component: function (resolve) {
          require.ensure([], function () {
            let index = require('./containers/role/RoleManageView')
            resolve(index)
          }, 'fireDoor.roleManage')
        }
      }
    }
  },
  '/login': {
    name: 'login',
    component: resolve => {
      require.ensure([], () => {
        let login = require('./containers/LoginView')
        resolve(login)
      }, 'login')
    }
  },
  '/electrical': {
    name: 'electrical',
    component: resolve => {
      require.ensure([], () => {
        let todo = require('./containers/_shared/EmptyView')
        resolve(todo)
      }, 'electrical')
    }
  },
  '/firePower': {
    name: 'firePower',
    component: resolve => {
      require.ensure([], () => {
        let navigation = require('./containers/_shared/EmptyView')
        resolve(navigation)
      }, 'firePower')
    }
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/login',
  '/fireDoor': '/fireDoor/monitor'
})

router.start(AppView, '#app')
