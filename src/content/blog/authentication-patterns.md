---
title: authentication patterns
date: 2026-07-02
slug: authentication-patterns
excerpt: Comparing authentication patterns as variations of state storage and cryptographic primitives—from session tokens to mTLS to a creative AWS Cognito hack.
tags: authentication, security, architecture, backend, cryptography
---

Recently, in an interview, I was asked which authentication patterns I know in depth. Honestly, I couldn't recite them—authentication is typically a solve-once problem. You choose a pattern during greenfield setup, then spend years building features on top of it.

If you're frequently choosing auth patterns, that might signal you're rewriting systems rather than maintaining them. Stable systems mean most engineers rarely touch auth initialization—they work within established patterns.

That said, I studied cryptography and number theory at university, so the underlying mathematics—hashing algorithms, public-key cryptography, digital signatures—are familiar territory. The patterns themselves are just different combinations of where you store state and which cryptographic primitives you apply. One day I'll dive back into the algorithmic details, but for now, here's a map of the authentication landscape.

Actually I think it's fascinating to compare them:

| Pattern       | State Location    | Token Type               | Server Stateful? |
| ------------- | ----------------- | ------------------------ | ---------------- |
| Session Token | server (redis/DB) | opaque ID                | Yes              |
| JWT           | signed JSON       | signed JSON              | No               |
| mTLS          | client (cert)     | X.509 certificate        | No               |
| OAuth         | third-party       | varies (JWT or opaque)   | Depends          |
| API Keys      | server (DB)       | long-lived token         | Yes              |
| Basic Auth    | client            | Base64 username:password | No               |

---

### session token

- server stores session data (in memory, redis, DB)
- client gets an opaque session id (cookie or header)
- server looks up session on each request

### JWT (/ token based)

- server signs a token, using a secret key, containing user info
- client stores token
- server verifies signature on each request, using that secret key
- can be implemented by:
  - JWT
  - encrypted tokens
  - signed JSON

### mTLS

- client has a cryptographic certificate
- TLS handshake proves identity
  - client "proves" it owns the private key for this certificate
  - server validates "this cert is signed by a Certificate Authority I trust, and you proved you own it"
- http 'keep-alive' to reuse the connection
- common in service-to-service auth. Rare for user-facing apps

### OAuth / Delegated

- user authenticates elsewhere (Google, GitHub)
- app gets a token representing that authorization
- pattern, not implementation (can use JWTs or opaque tokens)

### API Keys

- long-lived tokens (no expiration or very long)
- often scoped to specific permissions
- usually for machine-to-machine
- in some sense, similar to mTLS in that the client "has something". With mTLS, ownership of that key is proven via public/private key and certificate authority. With API keys it is simpler, by not having that check, but much simpler to set up

### Basic Auth

- `username:password` encoded in header on every request
- no session. no token storage
- bad for browsers. Sometimes used for simple APIs

## the pattern behind the pattern

Looking at these together, authentication patterns are essentially variations on two dimensions:

1. **where is state stored?** client-side (JWT, mTLS), server-side (sessions, API keys), or third-party (OAuth)
2. **what proves identity?** cryptographic signature (JWT, mTLS), opaque token lookup (sessions), or shared secret (API keys, basic auth)

The tradoffs ripple from these choices: stateless scales horizontally but can't revoke easily; stateful requires shared storage but gives fine-grained control. Understanding these fundamentals makes choosing (or extending) an auth pattern straightforward.

## notable mentions

The list above isn't exhaustive, and new patterns emerge regularly. Some others worth knowing:

- **SAML** - enterprise SSO standard (XML-based)
- **Magic Links / Passwordless** - email/SMS one-time codes
- **WebAuthn / FIDO2** - hardware tokens, biometrics
- **Cookie-based session** - variant of session tokens
- **HTTP Digest Auth** - hashed basic auth (legacy)
- **Kerberos** - ticket-based, Windows domains
- And various legacy protocols (OpenID, NTLM, LDAP)

Early in my career, I built a passwordless authentication system using AWS Cognito in an unorthodox way: when a user requested login, the system triggered Cognito's "password reset" flow to their phone. Upon confirming the reset (proving phone ownership), the backend would immediately reset their password to a new random value—which even the server never stored—then use that ephemeral credential to fetch and return their data. It was essentially using password reset as a one-time authentication token. A bit hacky. But it worked within Cognito's constraints at the time, and demonstrates how authentication patterns are just building blocks you can compose creatively.
