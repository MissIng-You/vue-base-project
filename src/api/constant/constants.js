
// mvc api
const GET_MENU_LIST_API = '/Menu/GetMenuList'
const GET_SUCCESS_FIRE_MONITOR_LIST_API = '/Fire/SelectRDFireDoorList'
const GET_ERROR_FIRE_MONITOR_LIST_API = '/Fire/SelectRDFireDoorList'
const CHECK_LOGIN_API = '/Login/CheckLogin'

// device manage api
const GET_DEVICE_LIST_API = '/Device/SelectDeviceList'
const GET_DEVICE_BY_ID_API = '/Device/SelectDeviceByID'
const ADD_DEVICE_API = '/Device/AddDevice'
const UPDATE_DEVICE_API = '/Device/EditDevice'
const DELETE_DEVICE_API = '/Device/DeleteDevice'

// fire manage api
const GET_FIRE_LIST_API = '/FireDoor/SelectFireList'
const GET_FIRE_BY_ID_API = '/FireDoor/SelectFireByID'
const ADD_FIRE_API = '/FireDoor/AddFire'
const UPDATE_FIRE_API = '/FireDoor/EditFire'
const DELETE_FIRE_API = '/FireDoor/DeleteFire'

// user manage api
const GET_USER_LIST_API = '/User/SelectUserList'
const GET_USER_BY_ID_API = '/User/SelectUserByID'
const ADD_USER_API = '/User/AddUser'
const UPDATE_USER_API = '/User/EditUser'
const DELETE_USER_API = '/User/DeleteUser'

// role manage api
const GET_ALL_ROLE_API = '/Role/SelectAllRole'
const GET_ROLE_LIST_API = '/Role/SelectRoleList'
const GET_ROLE_BY_ID_API = '/Role/SelectRoleByID'
const ADD_ROLE_API = '/Role/AddRole'
const UPDATE_ROLE_API = '/Role/EditRole'
const DELETE_ROLE_API = '/Role/DeleteRole'

// community manage api
const GET_ALL_COMMUNITY_API = '/Community/SelectAllCommunity'
const GET_COMMUNITY_LIST_API = '/Community/SelectCommunityList'
const GET_COMMUNITY_BY_ID_API = '/Community/SelectCommunityByID'
const ADD_COMMUNITY_API = '/Community/AddCommunity'
const UPDATE_COMMUNITY_API = '/Community/EditCommunity'
const DELETE_COMMUNITY_API = '/Community/DeleteCommunity'

const ApiContainersRelative = {
  GET_MENU_LIST_API,
  GET_SUCCESS_FIRE_MONITOR_LIST_API,
  GET_ERROR_FIRE_MONITOR_LIST_API,
  CHECK_LOGIN_API,

  // user api
  GET_USER_LIST_API,
  GET_USER_BY_ID_API,
  ADD_USER_API,
  UPDATE_USER_API,
  DELETE_USER_API,

  // role api
  GET_ALL_ROLE_API,
  GET_ROLE_LIST_API,
  GET_ROLE_BY_ID_API,
  ADD_ROLE_API,
  UPDATE_ROLE_API,
  DELETE_ROLE_API,

  // device api
  GET_DEVICE_LIST_API,
  GET_DEVICE_BY_ID_API,
  ADD_DEVICE_API,
  UPDATE_DEVICE_API,
  DELETE_DEVICE_API,

  // fire api
  GET_FIRE_LIST_API,
  GET_FIRE_BY_ID_API,
  ADD_FIRE_API,
  UPDATE_FIRE_API,
  DELETE_FIRE_API,

  // community api
  GET_ALL_COMMUNITY_API,
  GET_COMMUNITY_LIST_API,
  GET_COMMUNITY_BY_ID_API,
  ADD_COMMUNITY_API,
  UPDATE_COMMUNITY_API,
  DELETE_COMMUNITY_API
}

export default ApiContainersRelative
