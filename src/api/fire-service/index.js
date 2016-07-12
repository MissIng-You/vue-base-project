
// import vue-http.js.
import Vue from 'vue'
// import VueHttp from '../../utils/vue-http'

import ApiContainers from '../constant'

let { GET_FIRE_LIST_API } = ApiContainers

const getFireList = (query, resolve, reject) => {
  return Vue.http.get(GET_FIRE_LIST_API, query)
    .then(resolve, reject)
/*  let args = arguments.length
  switch (args) {
    case 1:
      return Vue.http.get(GET_FIRE_LIST_API).then(args[0])
    case 2:
      return Vue.http.get(GET_FIRE_LIST_API, args[0]).then(args[1])
    case 3:
      return Vue.http.get(GET_FIRE_LIST_API, args[0]).then(args[1], args[2])
    default:
      console.error('arguments count is more !')
  }*/
}

// export fire-service.js
export default getFireList

