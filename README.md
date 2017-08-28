# jwtch

`fetch` with JWT signing for browsers.

**WARNING**: Likely not production-ready, just a snippet for less repetitions.

## What?

It adds `Authorization : Bearer <token>` header to the request for JWT signing.
Simply an intermediate call of `Headers.append()`.  So **No black magic here**,
just for convenience.

## Usage

```js
// Well, if there's no top-level await magic.
(async () => {

// Specify the token key in localStorage, 'token' by default.
const jwtch = new Jwtch('token')

// Use it as `window.fetch`, and if the token is invalid, the server is sure to
// reject the request.
try {
  const res = await jwtch.fetch()
} catch (e) {
  // Alright it seems I'm not allowed.
}

})
```

## API

- `fetch(url, options)`, the same to `window.fetch`

## License

ISC
