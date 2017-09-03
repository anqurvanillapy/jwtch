export default class Jwtch {
  constructor (k = 'token') {
    // Token key in localStorage.
    this._tkkey = k

    // Headers with `Authorization'.
    this.headers = null

    // Warn of the user if token not found.  Note that `fetch' and
    // `localStorage' support is not guaranteed.
    this._init()
  }

  get tokenKey () { return this._tkkey }
  get token () {
    const tk = localStorage.getItem(this.tokenKey)
    let ret

    // Might be an object, instead of a plain token string.
    try {
      ret = JSON.parse(tk)['token']
    } catch (e) {
      ret = tk
    }

    return ret
  }

  _init () {
    if (!this.token) {
      console.warn('Token not found, go get one first before making requests')
    }

    this.headers = new Headers()
    this.headers.append('Authorization', `Bearer ${this.token}`)
  }

  fetch (url, options = {}) {
    // Ignore the token's absence, let the server reject it.
    if (options['headers']) {
      try {
        // May not be a Headers object.
        options.headers.append('Authorization', `Bearer ${this.token}`)
      } catch (e) {
        options.headers['Authorization'] = `Bearer ${this.token}`
      }
    } else options['headers'] = this.headers

    return fetch(url, options)
  }
}
