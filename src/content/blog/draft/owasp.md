1. broken access control

- users can access resources they shouldn't. e.g. edit other user's data
- e.g. /api/user/123/profile , change 123-124 and access someone else's profile
- fix:
  - proper validation on api endpoints

2. cryptographic failures

- passwords stored in plaintext, weak encryption, no HTTPS
- database breach exposes plaintext passwords

3. injection

- SQL injection, command injection, xss
- **methods to stop this**

4. insecure design

- flawed architecture. missing security controls
- e.g. password reset without rate limiting -> brute force attacks

5. security misconfiguration

- default passwords, unnecessary features enabled, stack traces exposed

6. vulnerable and outdated components

- using libraries with known vulnerabilities
- fix:
  - `npm audit`
  - `snyk`, `dependabot`, `renovate`
  - commit `package-lock.json`
  - stay current: react/node lts versions.
  - `npx depcheck` - find unused dependencies
  - CI/CD integration:
    ```zsh
      # .github/workflows/security.yml
      - run: npm audit --audit-level=high
    ```

7. identification and authentication failures

- weak passwords, session fixation, credential stuffing
- fix:
  - enforce strong passwords (`zxcvbn` package checks password strength)
  - session management. regenerate session on login.
  - MFA
  - rate limiting and account lockout
  - credential stuffing defense. use captcha on login. implement device fingerprinting. monitor for impossible travel. notify users of new device logins
  - JWT best practices
  - react/frontend guards. httpOnly cookies
  - exposing user enumeration ("user doesn't exist", "wrong password"), predictable session IDs, no session timeout, allowing default credentials, showing detailed error messages.

8. software and data integrity failures

- unsigned updates, insecure CI/CD, untrusted deserialization
- npm package gets compromised, injected into your build
- fix:
  - only consume trusted repositories. Consider hosting an internal known-good repository that's vetted.
  - lock dependencies. But a version can get removed and republished with malicious code
  - use integrity hashes. package-lock.json includes integrity hashes
  - use `npm audit` regularly
  - minimize dependencies
  - vet packages before installing. `npm view <package>` to see maintainers
  - tools that monitor packages. `socket.dev` , `snyk` , `renovate/dependabot`
  - sandboxing / permissions (emerging). `node --experimental-permission --allow-fs-read="* script.js"`
  - always install from lockfile. `npm ci`
  - private registry / proxy. `team -> private npm proxy -> caches and scans -> public npm`
  - monitor runtime behaviour. log unexpected network calls. alert on filesystem changes. use content security policy (CSP) in browsers.

9. security logging and monitoring failures

- not logging security events. no alerts for breaches
- e.g. attacker active for months before detection.
- fix:
  - log all auditable events
  - mask sensitive data
  - centralize logs
  - implement actionable alerting
  - establish an incident response plan

10. server-side request forgery (SSRF)

- server fetches attacker-controller URL
- a server may have features to fetch data from a user-supplied URL, without proper input validation. An attacker changes the URL parameter to point to an internal or unintended address. The vulnerable server makes the request on behalf of the attacker, treating it as a legitimate, internal request.
- preventions:
  - input allow-listing
  - disable redirections
  - network segmentation
