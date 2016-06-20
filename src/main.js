import Vue from 'vue'
import Router from 'vue-router'
import AppView from './containers/AppView'
// import HelloView from './containers/HelloView'
// import ArcgisView from './containers/ArcgisView'

// all styles
import './assets/styles/custom-scss/custom-bootstrap.scss'
import './assets/styles/font-awesome/css/font-awesome.min.css'

Vue.config.debug = true
Vue.config.devtools = true

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
  '/sidebar': {
    component: function (resolve) {
      require.ensure([], function () {
        let sidebar = require('./containers/SidebarView')
        resolve(sidebar)
      }, 'sidebar')
    }
  },
  '/arcgis': {
    component: resolve => {
      require.ensure([], () => {
        let arcgis = require('./containers/ArcgisView')
        resolve(arcgis)
      }, 'arcgis')
    }
  },
  '/baidu': {
    component: resolve => {
      require.ensure([], () => {
        let baidu = require('./containers/BaiduView')
        resolve(baidu)
      }, 'baidu')
    }
  },
  '/login': {
    component: resolve => {
      require.ensure([], () => {
        let login = require('./containers/LoginView')
        resolve(login)
      }, 'login')
    }
  },
  '/todo': {
    component: resolve => {
      require.ensure([], () => {
        let todo = require('./containers/TodoView')
        resolve(todo)
      }, 'todo')
    }
  },
  '/nav': {
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
  '*': '/baidu'
})

router.start(AppView, '#app')
