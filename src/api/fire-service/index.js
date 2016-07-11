
// import vue-http.js.
import Vue from 'vue'
// import VueHttp from '../../utils/vue-http'

import ApiContainers from '../constant'

let { GET_FIRE_LIST_API } = ApiContainers

const getFireList = (resolve, reject) => {
  return Vue.http.get(GET_FIRE_LIST_API).then(resolve, reject)
}

// export menu-service.js
export default getFireList
