
// import all services.
import getMenuList from './menu-service'
import getFireList from './fire-service'
import checkLogin from './login-service'
import userService from './user-service'

const ApiService = {
  getMenuList,
  getFireList,
  checkLogin,
  userService
}

// export all api services.
export default ApiService
