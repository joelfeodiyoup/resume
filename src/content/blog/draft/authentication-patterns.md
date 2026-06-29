## session token

- server stores session data (in memory, redis, DB)
- client gets an opaque session id (cookie or header)
- server looks up session on each request

## JWT

- server signs a token containing user info
- client stores token
- server verifies signature on each request
- can be implemented by:
  - JWT
  - encrypted tokens
  - signed JSON

## mTLS

- client has a cryptographic certificate
- TLS handshake proves identity
- http 'keep-alive' to reuse the connection
- common in service-to-service auth. Rare for user-facing apps

## OAuth / Delegated

- user authenticates elsewhere (Google, GitHub)
- app gets a token representing that authorization
- pattern, not implementation (can use JWTs or opaque tokens)

## API Keys

- long-lived tokens (no expiration or very long)
- often scoped to specific permissions
- usually for machine-to-machine

## Basic Auth

- `username:password` encoded in header on every request
- no session. no token storage
- terrible for browsers. Sometimes used for simple APIs
