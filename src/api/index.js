
// import all services.
import getMenuList from './menu-service'
import checkLogin from './login-service'

import userService from './user-service'
import roleService from './role-service'
import fireService from './fire-service'
import deviceService from './device-service'
import monitorService from './monitor-service'
import communityService from './community-service'

const ApiService = {
  getMenuList,
  checkLogin,
  userService,
  roleService,
  fireService,
  deviceService,
  monitorService,
  communityService
}

// export all api services.
export default ApiService
