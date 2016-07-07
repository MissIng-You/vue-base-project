
// get base url by node env
const getBaseUrlByNodeEnv = () => {
  let baseUrl = ''

  switch (process.env.NODE_ENV) {
    case 'production-vs':
      baseUrl = '/wwwroot'
      break
    case 'production':
      baseUrl = '/'
      break
    case 'development':
      break
    default:
      break
  }

  return baseUrl
}

const GET_MENU_LIST_API = '/api/menu-service/mock.json'

const ApiContainersRelative = {
  GET_MENU_LIST_API
}

// concat "BASE_URL" into pre "ApiContainers"
const ApiContainers = ((apiContainers => {
  let tempApiContainers = {}

  for (let [apiKey, apiValue] of Object.entries(apiContainers)) {
    tempApiContainers[apiKey] = getBaseUrlByNodeEnv() + apiValue
  }

  console.log(process.env.NODE_ENV)

  return tempApiContainers
})(ApiContainersRelative))

export default ApiContainers
