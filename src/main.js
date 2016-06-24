import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
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
  leaveClass: 'slideOutRight'
})

Vue.transition('fade', {
  enterClass: 'fadeIn',
  leaveClass: 'fadeOut'
})

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
  '/sidebar': {
    name: 'sidebar',
    component: function (resolve) {
      require.ensure([], function () {
        let sidebar = require('./containers/SidebarView')
        resolve(sidebar)
      }, 'sidebar')
    },
    subRoutes: {
      '/list': {
        component: function (resolve) {
          require.ensure([], function () {
            let sidebar = require('./containers/ListboxView')
            resolve(sidebar)
          }, 'sidebar.list')
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
  '/sidebar': '/sidebar/list'
})

router.start(AppView, '#app')
