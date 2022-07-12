import Request from "./libs/request"

class WebApi {
  constructor(credentials) {
    this._credentials = credentials || {}
  }

  setCredentials(credentials) {
    for (let key in credentials) {
      if (credentials.hasOwnProperty(key)) {
        this._credentials[key] = credentials[key]
      }
    }
  }

  getCredentials() {
    return this._credentials
  }

  resetCredentials() {
    this._credentials = null
  }

  setClientId(clientId) {
    this._setCredential("clientId", clientId)
  }

  setClientSecret(clientSecret) {
    this._setCredential("clientSecret", clientSecret)
  }

  setAccessToken(accessToken) {
    this._setCredential("accessToken", accessToken)
  }

  getClientId() {
    return this._getCredential("clientId")
  }

  getClientSecret() {
    return this._getCredential("clientSecret")
  }
  
  getAccessToken() {
    return this._getCredential("accessToken")
  }

  resetClientId() {
    this._resetCredential("clientId")
  }

  resetClientSecret() {
    this._resetCredential("clientSecret")
  }

  resetAccessToken() {
    this._resetCredential("accessToken")
  }

  _setCredential(key, value) {
    this._credentials = this._credentials || {}
    this._credentials[key] = value
  }

  _getCredential(key) {
    if (!this._credentials) return
    return this._credentials[key]
  }

  _resetCredential(key) {
    if (!this._credentials) return
    this._credentials[key] = null
  }

  request() {
    return Request.builder()
  }

  static mixin(properties) {
    Object.assign(this.prototype, properties)
  }
}

module.exports = WebApi
