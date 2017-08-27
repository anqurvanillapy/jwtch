const [
  fetch,
  localStorage,
  Headers
] = ['fetch', 'localStorage', 'Headers'].map(p => window[p])

export default class Jwtch {
  constructor (k = 'token') {
    // Token key in localStorage.
    this._tkkey = k

    // Headers with `Authorization'.
    this.headers = null

    // Check the availability of fetch and localStorage, and warn of the user
    // if token not found.
    this._init()
  }

  get tokenKey () { return this._tkkey }
  get token () { return localStorage.getItem(this.tokenKey) }

  _init () {
    if (!fetch || !localStorage) {
      throw new Error('fetch or localStorage not supported')
    }

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
      } catch (_) {
        options['headers'] = this.headers
      }
    } else options['headers'] = this.headers

    return fetch(url, options)
  }
}
