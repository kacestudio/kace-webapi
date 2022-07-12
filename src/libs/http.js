const axios = require("axios").default
const querystring = require("querystring")

const _getParametersFromRequest = function (request) {
  const options = {}

  if (request.getQueryParameters()) {
    options.params = request.getQueryParameters()
  }

  if (
    request.getHeaders() &&
    request.getHeaders()["Content-Type"] === "application/json"
  ) {
    options.data = JSON.stringify(request.getBodyParameters())
  } else if (
    request.getHeaders() &&
    request.getHeaders()["Content-Type"] === "application/x-www-form-urlencoded"
  ) {
    options.data = querystring.stringify(request.getBodyParameters())
  } else if (request.getBodyParameters()) {
    options.data = request.getBodyParameters()
  }

  if (request.getHeaders()) {
    options.headers = request.getHeaders()
  }

  return options
}

class Http {
  static _makeRequest(method, options, url) {
    const config = {
      method: method,
      url: String(url)
    }

    if (options.params) {
      config.params = options.params
    }

    if (options.headers) {
      config.headers = options.headers
    }

    if (options.data) {
      config.data = options.data
    }

    return axios(config)
  }

  static get(request) {
    const options = _getParametersFromRequest(request)

    return Http._makeRequest("get", options, request.getURI())
  }

  static post(request) {
    const options = _getParametersFromRequest(request)

    return Http._makeRequest("post", options, request.getURI())
  }

  static delete(request) {
    const options = _getParametersFromRequest(request)

    return Http._makeRequest("delete", options, request.getURI())
  }

  static put(request) {
    const options = _getParametersFromRequest(request)

    return Http._makeRequest("put", options, request.getURI())
  }
}

export default Http
