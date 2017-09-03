import fetch, { Headers } from 'node-fetch'
import LocalStorage from './polyfill.localStorage'
import Jwtch from './index'

// Node polyfills and setup.
window.fetch = fetch
window.Headers = Headers
window.localStorage = new LocalStorage()
window.localStorage.setItem('token', 'foo')
window.localStorage.setItem('tokenObject', '{"token":"foo"}')

const URL = 'https://httpbin.org'
const jwtch = new Jwtch()

test('Token should be extracted correctly', () => {
  const tmpJwtch4TokenString = new Jwtch('token')
  const tmpJwtch4TokenObject = new Jwtch('tokenObject')

  expect(tmpJwtch4TokenString.token).toBe('foo')
  expect(tmpJwtch4TokenObject.token).toBe('foo')
})

test('Response status code is 200', async () => {
  const res = await jwtch.fetch(URL)

  expect(res.ok).toBeTruthy()
})

test('Request should contain the bearer header with token', async () => {
  const res = await jwtch.fetch(`${URL}/anything`)
  const json = await res.json()
  const [bearer, tk] = json.headers['Authorization'].split(' ')

  expect(bearer).toBe('Bearer')
  expect(tk).toBe('foo')
})
