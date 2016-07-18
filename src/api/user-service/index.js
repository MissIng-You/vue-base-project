import Vue from 'vue'
import ApiContainers from '../constant'

let {
  GET_USER_LIST_API,
  GET_USER_BY_ID_API,
  ADD_USER_API,
  UPDATE_USER_API,
  DELETE_USER_API } = ApiContainers

const postService = (url, query, resolve, reject) => {
  return Vue.http.post(url, query)
    .then(resolve, reject)
}

const userService = {
  getUserList: (query, resolve, reject) => {
    return postService(GET_USER_LIST_API, query, resolve, reject)
  },
  getUserById: (query, resolve, reject) => {
    return postService(GET_USER_BY_ID_API, query, resolve, reject)
  },
  addUser: (data, resolve, reject) => {
    return postService(ADD_USER_API, data, resolve, reject)
  },
  updateUser: (data, resolve, reject) => {
    return postService(UPDATE_USER_API, data, resolve, reject)
  },
  deleteUser: (data, resolve, reject) => {
    return postService(DELETE_USER_API, data, resolve, reject)
  }
}

// export user-service.js
export default userService

