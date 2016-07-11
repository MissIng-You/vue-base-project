import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import AppView from './containers/AppView'
// import HelloView from './containers/HelloView'
// import ArcgisView from './containers/ArcgisView'

// all styles
import './assets/styles/custom-scss/custom-bootstrap.scss'
import './assets/styles/font-awesome/css/font-awesome.min.css'
import 'animate.css'

Vue.config.debug = true
Vue.config.devtools = true

// custom define transition style.
Vue.transition('bounce', {
  enterClass: 'bounceInLeft',
  leaveClass: 'bounceOutRight'
})

Vue.transition('slide', {
  enterClass: 'slideInLeft',
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

router.alias({
  '/sidebar': '/sidebar/list'
})

router.map({
  '/list': {
    name: 'sidebar',
    component: function (resolve) {
      require.ensure([], function () {
        let sidebar = require('./containers/SidebarView')
        resolve(sidebar)
      }, 'sidebar')
    },
    subRoutes: {
      '/navigation': {
        component: function (resolve) {
          require.ensure([], function () {
            let navigation = require('./containers/ListboxView')
            resolve(navigation)
          }, 'list.navigation')
        }
      },
      '/add': {
        component: function (resolve) {
          require.ensure([], function () {
            let add = require('./containers/AddView')
            resolve(add)
          }, 'list.add')
        }
      },
      '/modify': {
        component: function (resolve) {
          require.ensure([], function () {
            let modify = require('./containers/ModifyView')
            resolve(modify)
          }, 'list.modify')
        }
      },
      '/delete': {
        component: function (resolve) {
          require.ensure([], function () {
            let deleteView = require('./containers/DeleteView')
            resolve(deleteView)
          }, 'list.delete')
        }
      },
      '/index': {
        component: function (resolve) {
          require.ensure([], function () {
            let index = require('./containers/IndexView')
            resolve(index)
          }, 'list.index')
        }
      }
    }
  },
  '/arcgis': {
    name: 'arcgis',
    component: resolve => {
      require.ensure([], () => {
        let arcgis = require('./containers/ArcgisView')
        resolve(arcgis)
      }, 'arcgis')
    }
  },
  '/baidu': {
    name: 'baidu',
    component: resolve => {
      require.ensure([], () => {
        let baidu = require('./containers/BaiduView')
        resolve(baidu)
      }, 'baidu')
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
  '/todo': {
    name: 'todo',
    component: resolve => {
      require.ensure([], () => {
        let todo = require('./containers/TodoView')
        resolve(todo)
      }, 'todo')
    }
  },
  '/nav': {
    name: 'nav',
    component: resolve => {
      require.ensure([], () => {
        let navigation = require('./containers/NavigationView')
        resolve(navigation)
      }, 'nav')
    }
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/login',
  '/list': '/list/navigation'
})

router.start(AppView, '#app')
