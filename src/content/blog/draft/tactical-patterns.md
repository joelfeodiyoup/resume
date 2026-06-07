## data/state management

### CQRS

- **problem** read and write operation have different requirements
- **solution** separate models - one optimized for writes, one for reads
- **can be used with** event sourcing, or just regular databases

Use this when the differences are significant. I.e. read/write loads are very different and need different scaling, read/write models are getting complex in different ways, audit trail/event sourcing is required, complex reporting that slow down the write database

### event sourcing

- **problem** need audit trail, temporal queries, or rebuild state
- **solution** store events instead of current state
- **can be used with** CQRS (common pairing), or standalone

Rather than overwrite a value, the system records the sequence of events that led there. It's therefore deterministic and can be replayed. A state in the past can be determined. It's important when auditing etc is necessary.

## distributed system coordination

### saga pattern

- **problem** distribute transactions across microservices
- **solution** coordinate long-running transacations with compensating actions
- **can be used with** event-driven architecture, microservices

**more needed**

a **saga** coordinates a long-running transaction across multiple services. Each service:

1. performas a local transaction
2. publishes an event on success
3. has a **compensating action** to undo if something later fails.

Two orchestration styles:

- choreography (event-driven)
- orchestration (coordinator)

problems:

- compensating actions can fail
  - make compensating actions **idempotent**
  - retry with backoff
  - manual intervention
  - design compensations to be more reliable than the original action
- state can change between action and compensation
  - use versioning/optimistic locking for compensation
  - store enough context to make compensation meaningful
  - design compensations to be semantically correct, not just reverse operations
  - accept eventual consistency
- compensation isn't always a true "undo"
  - emails can't be unsent (send apology email instead)
  - money transferred reversal isn't instant, and could have fees
  - third party api calls may not have undo capability
- temporal coupling issues
  - reversing a charge of $100 may not be equivalent now after exchange rate changes

When to use:

- distributed across services
- long-running processes that can't hold locks
- when 2-phase commit isn't feasible

when to avoid:

- single database (use db transactions)
- short operations that can complete quickly
- when you can't define meaningful compensations

Alternatives:

- avoid distributed transactions (better service boundaries)
- event sourcing
- accept eventual consistency without compensation
  - accept failures, and be okay with the consequences. Eventually they figure itself out
  - e.g. payment failed: it's in an inconsistent state for a while, inventory locked, but eventually auto released.
  - use when compensation is risky/complex, and temporary inconsistency can be tolerated
  - trade immediate consistency for simpler code
- use a distributed transaction coordinator (if you must)
  - e.g. 2-phase commit. But it has issues. (locking, etc)

### 2-phase commit

- ask all participants 'can you commit this transaction'. If any says 'no', abort everything.
- locks resources during coordination
- single point of failure (coordinator)
- tight coupling (all services must support 2PC)
- low latency when it works

### service mesh

## communication patterns

- event-driven architecture
- message queue patterns
- request-response vs fire-and-forget
