import Http from "./http"

class Request {
  constructor(builder) {
    if (!builder) {
      throw new Error("No builder supplied to contructor")
    }

    this.baseURL = builder.baseURL || ""
    this.queryParameters = builder.queryParameters
    this.bodyParameters = builder.bodyParameters
    this.headers = builder.headers
    this.path = builder.path
  }

  _getter(key) {
    return function () {
      return this[key]
    }
  }

  _httpMethodFromString(method) {
    switch (method.toLowerCase()) {
      case "get":
        return Http.get
      case "post": 
        return Http.post
      case "put":
        return Http.put 
      case "delete":
        return Http.delete
      default:
        return Http.get
    }
  }

  getBaseURL = this._getter("baseURL")
  getPath = this._getter("path")
  getQueryParameters = this._getter("queryParameters")
  getBodyParameters = this._getter("bodyParameters")
  getHeaders = this._getter("headers")

  getURI() {
    let uri = this.baseURL || ""

    if (this.path) {
      uri += this.path
    }

    return uri
  }

  getQueryParameterString() {
    let queryParameters = this.getQueryParameters()

    if (queryParameters) {
      return (
        "?" +
        Object.keys(queryParameters)
          .filter(function (key) {
            return queryParameters[key] !== undefined
          })
          .map(function (key) {
            return key + "=" + queryParameters[key]
          })
          .join("&")
      )
    }
  }

  getURL() {
    let uri = this.getURI()
    if (this.getQueryParameters()) {
      return uri + this.getQueryParameterString()
    } else {
      return uri
    }
  }

  execute(method) {
    const httpMethod = this._httpMethodFromString(method)
    return new Promise((resolve, reject) => {
      httpMethod(this)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  static builder() {
    return new Builder() 
  }
}

class Builder {
  _setter(key) {
    return function (value) {
      this[key] = value
      return this
    }
  }

  withBaseURL = this._setter("baseURL")
  withPath = this._setter("path")

  _assigner(key) {
    return function () {
      for (let i = 0; i < arguments.length; i++) {
        this[key] = this._assign(this[key], arguments[i])
      }

      return this
    }
  }

  withQueryParameters = this._assigner("queryParameters")
  withBodyParameters = this._assigner("bodyParameters")
  withHeaders = this._assigner("headers")

  withAuth(accessToken) {
    if (accessToken) {
      this.withHeaders({ Authorization: "Bearer " + accessToken })
    }

    return this
  }

  _assign(src, obj) {
    if (obj && Array.isArray(obj)) {
      return obj
    }

    if (obj && typeof obj == "string") {
      return obj
    }

    if (obj && Object.keys(obj).length > 0) {
      return Object.assign(src || {}, obj)
    }

    return src
  }

  build() {
    return new Request(this)
  }
}

export default Request
