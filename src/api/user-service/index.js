import Vue from 'vue'
import ApiContainers from '../constant'

let {
  GET_USER_LIST_API,
  GET_USER_BY_ID_API,
  ADD_USER_API,
  UPDATE_USER_API,
  DELETE_USER_API } = ApiContainers

const userService = {
  getUserList: (query, resolve, reject) => {
    return Vue.http.post(GET_USER_LIST_API, query)
      .then(resolve, reject)
  },
  getUserById: (query, resolve, reject) => {
    return Vue.http.post(GET_USER_BY_ID_API, query)
      .then(resolve, reject)
  },
  addUser: (data, resolve, reject) => {
    return Vue.http.post(ADD_USER_API, data)
      .then(resolve, reject)
  },
  updateUser: (data, resolve, reject) => {
    return Vue.http.post(UPDATE_USER_API, data)
      .then(resolve, reject)
  },
  deleteUser: (data, resolve, reject) => {
    return Vue.http.post(DELETE_USER_API, data)
      .then(resolve, reject)
  }
}

// export user-service.js
export default userService

