import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import NProgress from 'nprogress'
import AppView from './containers/AppView'
// import HelloView from './containers/HelloView'
// import ArcgisView from './containers/ArcgisView'

// all styles
import 'animate.css'
import './assets/styles/custom-scss/custom-bootstrap.scss'
import './assets/styles/font-awesome/css/font-awesome.min.css'
import 'nprogress/nprogress.css'

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
  NProgress.inc(0.25)
  console.log('request params:')
  console.log(request)

  next((response) => {
    NProgress.done()
    console.log('response data:')
    console.log(response)
  })
})

// install router
Vue.use(Router)

// routing
var router = new Router({
  hashbang: false,
  history: true,
  saveScrollPosition: true,
  transitionOnLoad: true,
  linkActiveClass: 'active'
})

/* const lazyLoading = (path, pkgName) => {
  return function (resolve) {
    require.ensure([], function () {
      let component = require(path)
      resolve(component)
    }, pkgName)
  }
} */

router.map({
  '/fireDoor': {
    name: 'fireDoor',
   /* component: lazyLoading('./containers/SidebarView', 'fireDoor'),*/
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
      '/fireManage': {
        component: function (resolve) {
          require.ensure([], function () {
            let navigation = require('./containers/fire-door/FireManageView')
            resolve(navigation)
          }, 'fireDoor.fireManage')
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
      },
      '/communityManage': {
        component: function (resolve) {
          require.ensure([], function () {
            let index = require('./containers/community/CommunityManageView')
            resolve(index)
          }, 'fireDoor.communityManage')
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
  NProgress.start()
  window.scrollTo(0, 0)
})

router.afterEach(function () {
  NProgress.done()
})

router.redirect({
  '*': '/login',
  '/fireDoor': '/fireDoor/monitor'
})

router.start(AppView, '#app')
