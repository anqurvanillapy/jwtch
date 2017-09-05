export default class LocalStorage {
  constructor () { this._store = {} }
  getItem (k) { return this._store[k] }
  setItem (k, v) { this._store[k] = v }
}
