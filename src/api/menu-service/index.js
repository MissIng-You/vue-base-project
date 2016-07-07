
// import vue-http.js.
import Vue from 'vue'
// import VueHttp from '../../utils/vue-http'

import ApiContainers from '../constants'

let { GET_MENU_LIST_API } = ApiContainers

const getMenuList = (resolve, reject) => {
  return Vue.http.get(GET_MENU_LIST_API).then(resolve, reject)
}

// export menu-service.js
export default getMenuList
