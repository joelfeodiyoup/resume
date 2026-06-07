It seems odd to me that hexagonal architecture so elegantly achieves SOLID. But do others? Apparently yes.

### clean architecture

- entities -> use-cases -> interface adapters -> frameworks
- layer responsibilities

### onion architecture

- domain model at center, infrastructure at edges
- nearly identical to hexagonal in practice
- different in...

### vertical slice architecture

- organize by feature, not layer
- dependency inversion, but less formal about ports/adapters
- better cohesion per feature, but potential duplication across features

## other alternatives

## event-driven architecture

## functional core, imperative shell

- pure functions (business logic) at core, side effects at edges
- achieves DIP through function composition instead of interfaces
- popular in FP languages (Haskell, Elixir)

## micro-kernel (plugin architecture)

- small core. everything else is a plugin
- examples: vscode, webpack, browsers
- trade-off: overhead of plugin system
