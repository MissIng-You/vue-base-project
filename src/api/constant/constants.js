
// mvc api
const GET_MENU_LIST_API = '/Menu/GetMenuList'
const GET_FIRE_LIST_API = '/Fire/GetFireList'
const CHECK_LOGIN_API = '/Login/CheckLogin'

// device manage api
const GET_DEVICE_LIST_API = '/Device/SelectDeviceList'
const ADD_DEVICE_API = '/Device/AddDevice'
const UPDATE_DEVICE_API = '/Device/EditDevice'
const DELETE_DEVICE_API = '/Device/DeleteDevice'

// user manage api
const GET_USER_LIST_API = '/User/SelectUserList'
const GET_USER_BY_ID_API = '/User/SelectUserByID'
const ADD_USER_API = '/User/AddUser'
const UPDATE_USER_API = '/User/EditUser'
const DELETE_USER_API = '/User/DeleteUser'

// role manage api
const GET_ROLE_LIST_API = '/Role/SelectRoleList'
const ADD_ROLE_API = '/Role/AddRole'
const UPDATE_ROLE_API = '/Role/EditRole'
const DELETE_ROLE_API = '/Role/DeleteRole'

const ApiContainersRelative = {
  GET_MENU_LIST_API,
  GET_FIRE_LIST_API,
  CHECK_LOGIN_API,

  GET_USER_LIST_API,
  GET_USER_BY_ID_API,
  ADD_USER_API,
  UPDATE_USER_API,
  DELETE_USER_API,

  GET_ROLE_LIST_API,
  ADD_ROLE_API,
  UPDATE_ROLE_API,
  DELETE_ROLE_API,

  GET_DEVICE_LIST_API,
  ADD_DEVICE_API,
  UPDATE_DEVICE_API,
  DELETE_DEVICE_API
}

export default ApiContainersRelative
