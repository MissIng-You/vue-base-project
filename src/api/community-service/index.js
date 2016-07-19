import Vue from 'vue'
import ApiContainers from '../constant'

let {
  GET_COMMUNITY_LIST_API,
  GET_COMMUNITY_BY_ID_API,
  ADD_COMMUNITY_API,
  UPDATE_COMMUNITY_API,
  DELETE_COMMUNITY_API } = ApiContainers

const postService = (url, query, resolve, reject) => {
  return Vue.http.post(url, query)
    .then(resolve, reject)
}

const communityService = {
  getCommunityList: (query, resolve, reject) => {
    return postService(GET_COMMUNITY_LIST_API, query, resolve, reject)
  },
  getCommunityById: (query, resolve, reject) => {
    return postService(GET_COMMUNITY_BY_ID_API, query, resolve, reject)
  },
  addCommunity: (data, resolve, reject) => {
    return postService(ADD_COMMUNITY_API, data, resolve, reject)
  },
  updateCommunity: (data, resolve, reject) => {
    return postService(UPDATE_COMMUNITY_API, data, resolve, reject)
  },
  deleteCommunity: (data, resolve, reject) => {
    return postService(DELETE_COMMUNITY_API, data, resolve, reject)
  }
}

// export community-service.js
export default communityService

