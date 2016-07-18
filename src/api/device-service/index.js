import Vue from 'vue'
import ApiContainers from '../constant'

let {
  GET_DEVICE_LIST_API,
  GET_DEVICE_BY_ID_API,
  ADD_DEVICE_API,
  UPDATE_DEVICE_API,
  DELETE_DEVICE_API } = ApiContainers

const postService = (url, query, resolve, reject) => {
  return Vue.http.post(url, query)
    .then(resolve, reject)
}

const userService = {
  getDeviceList: (query, resolve, reject) => {
    return postService(GET_DEVICE_LIST_API, query, resolve, reject)
  },
  getDeviceById: (query, resolve, reject) => {
    return postService(GET_DEVICE_BY_ID_API, query, resolve, reject)
  },
  addDevice: (data, resolve, reject) => {
    return postService(ADD_DEVICE_API, data, resolve, reject)
  },
  updateDevice: (data, resolve, reject) => {
    return postService(UPDATE_DEVICE_API, data, resolve, reject)
  },
  deleteDevice: (data, resolve, reject) => {
    return postService(DELETE_DEVICE_API, data, resolve, reject)
  }
}

// export device-service.js
export default userService

