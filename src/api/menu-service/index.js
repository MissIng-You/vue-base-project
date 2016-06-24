
// import vue-http.js.
import Vue from 'vue'
// import VueHttp from '../../utils/vue-http'

// const { get } = VueHttp

const getMenuList = (resolve, reject) => {
  return Vue.http.get('/api/menu-service/mock.json').then(resolve, reject)
}

// export menu-service.js
export default getMenuList
