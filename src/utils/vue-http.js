
// import vue resource in ../../main.js
import Vue from 'vue'

const VueHttp = {
  get: Vue.http.get,
  post: Vue.http.post,
  jsonp: Vue.http.jsonp
}

export default VueHttp
