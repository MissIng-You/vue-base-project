
// get api constant by node env
const ApiContainersRelative = (() => {
  let apiConstant

  switch (process.env.NODE_ENV) {
    case 'production-vs-mock':
      apiConstant = require('./mock-constants').default
      break
    case 'production-vs':
      apiConstant = require('./constants').default
      break
    case 'production':
      apiConstant = require('./mock-constants').default
      break
    case 'development':
      apiConstant = require('./mock-constants').default
      break
    default:
      break
  }

  return apiConstant
})()

// get base url by node env
const getBaseUrlByNodeEnv = () => {
  let baseUrl = ''

  switch (process.env.NODE_ENV) {
    case 'production-vs-mock':
      baseUrl = '/wwwroot'
      break
    case 'production-vs':
      baseUrl = '/Ajax'
      break
    case 'production':
      baseUrl = '/'
      break
    case 'development':
      baseUrl = ''
      break
    default:
      break
  }

  return baseUrl
}

// concat "BASE_URL" into pre "ApiContainers"
const ApiContainers = (apiContainers => {
  let tempApiContainers = {}

  for (let [apiKey, apiValue] of Object.entries(apiContainers)) {
    tempApiContainers[apiKey] = getBaseUrlByNodeEnv() + apiValue
  }

  console.log(process.env.NODE_ENV)

  return tempApiContainers
})(ApiContainersRelative)

export default ApiContainers
