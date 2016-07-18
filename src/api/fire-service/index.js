import Vue from 'vue'
import ApiContainers from '../constant'

let {
  GET_FIRE_LIST_API,
  GET_FIRE_BY_ID_API,
  ADD_FIRE_API,
  UPDATE_FIRE_API,
  DELETE_FIRE_API } = ApiContainers

const postService = (url, query, resolve, reject) => {
  return Vue.http.post(url, query)
    .then(resolve, reject)
}

const fireService = {
  getFireList: (query, resolve, reject) => {
    return postService(GET_FIRE_LIST_API, query, resolve, reject)
  },
  getFireById: (query, resolve, reject) => {
    return postService(GET_FIRE_BY_ID_API, query, resolve, reject)
  },
  addFire: (data, resolve, reject) => {
    return postService(ADD_FIRE_API, data, resolve, reject)
  },
  updateFire: (data, resolve, reject) => {
    return postService(UPDATE_FIRE_API, data, resolve, reject)
  },
  deleteFire: (data, resolve, reject) => {
    return postService(DELETE_FIRE_API, data, resolve, reject)
  }
}

// export fire-service.js
export default fireService

