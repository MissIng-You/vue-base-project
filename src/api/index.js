
// import all services.
import getMenuList from './menu-service'
import getFireMonitorList from './monitor-service'
import checkLogin from './login-service'

import userService from './user-service'
import roleService from './role-service'
import fireService from './fire-service'
import deviceService from './device-service'

const ApiService = {
  getMenuList,
  getFireMonitorList,
  checkLogin,
  userService,
  roleService,
  fireService,
  deviceService
}

// export all api services.
export default ApiService
