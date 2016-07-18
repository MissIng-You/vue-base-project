import Vue from 'vue'
import ApiContainers from '../constant'

let {
  GET_ROLE_LIST_API,
  GET_ROLE_BY_ID_API,
  ADD_ROLE_API,
  UPDATE_ROLE_API,
  DELETE_ROLE_API } = ApiContainers

const postService = (url, query, resolve, reject) => {
  return Vue.http.post(url, query)
    .then(resolve, reject)
}

const roleService = {
  getRoleList: (query, resolve, reject) => {
    return postService(GET_ROLE_LIST_API, query, resolve, reject)
  },
  getRoleById: (query, resolve, reject) => {
    return postService(GET_ROLE_BY_ID_API, query, resolve, reject)
  },
  addRole: (data, resolve, reject) => {
    return postService(ADD_ROLE_API, data, resolve, reject)
  },
  updateRole: (data, resolve, reject) => {
    return postService(UPDATE_ROLE_API, data, resolve, reject)
  },
  deleteRole: (data, resolve, reject) => {
    return postService(DELETE_ROLE_API, data, resolve, reject)
  }
}

// export role-service.js
export default roleService

