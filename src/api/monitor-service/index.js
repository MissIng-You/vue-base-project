import Vue from 'vue'
import ApiContainers from '../constant'

let {
  GET_SUCCESS_FIRE_MONITOR_LIST_API,
  GET_ERROR_FIRE_MONITOR_LIST_API } = ApiContainers

const postService = (url, query, resolve, reject) => {
  return Vue.http.post(url, query)
    .then(resolve, reject)
}

const monitorService = {
  getSuccessFireMonitorList: (query, resolve, reject) => {
    return postService(GET_SUCCESS_FIRE_MONITOR_LIST_API, query, resolve, reject)
  },
  getErrorFireMonitorList: (query, resolve, reject) => {
    return postService(GET_ERROR_FIRE_MONITOR_LIST_API, query, resolve, reject)
  }
}

// export monitor-service.js
export default monitorService

