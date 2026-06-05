## system design

- how idempotency works
- modular monolith architecture 101
- apache kafka deep dive
- api design best practices
- how virtual machine works
- how saga pattern works
- how bloom filter works
- how consistent hashing works
- distributed systems 101
- how service discovery works
- how RPC works
- how actor model works
- capacity planning 101
- redis use cases
- how JWT works

https://newsletter.systemdesign.one/p/saga-design-pattern

1 How Virtual Machines Work
→ https://lnkd.in/d9xKvzhr

2 Modular Monolith Architecture
→ https://lnkd.in/edUqkCKR

3 How Apache Kafka Works
→ https://lnkd.in/eTtVAjTg

4 Redis Use Cases
→ https://lnkd.in/ekJMjMG3

5 How RPC Works
→ https://lnkd.in/eScZS9F5

6 How JWT Works
→ https://lnkd.in/ek9_BTUc

7 How Consistent Hashing Works
→ https://lnkd.in/eUP9DbCg

8 How Service Discovery Works
→ https://lnkd.in/eCYYwQfU

9 How Bloom Filter Works
→ https://lnkd.in/e2duES7s

10 How Idempotent API Works
→ https://lnkd.in/erMkqwq4

11 How Saga Design Pattern Works
→ https://lnkd.in/eFXC4-aJ

12 How Actor Model Works
→ https://lnkd.in/eqcb7MpP

13 API Design Best Practices
→ https://lnkd.in/eUEFzEC8

14 Capacity Planning 101
→ https://lnkd.in/ev358pj3

15 Distributed Systems - A Deep Dive
→ https://lnkd.in/eZCC7KPx

## hasing/encryption/etc

- encoding, hasing, encryption, compression, serialization, obfuscation

## software architecture optimization targets + their patterns

different architectures optimise for different aims.

- separation of concerns / testability
  - hexagonal, clean architecture, onion
  - trade-off: indirection overhead, more files/abstractions
- performance / cache efficiency
  - ECS (entity component system), data oriented, struct-of-arrays layouts
  - trade-off: hard to reason about object relationships, couples data layout to hot paths
- change velocity / feature independence
  - microservices, modular monolith, plugin architectures
  - trade-off: coordination overhead, potential duplication
- cognitive load / discoverability
  - "boring" crud + fat models, rails-style mvc, django-style apps
  - trade-offs: grows tangled at scale, harder to test in isolation
- reliability / fault isolation
  - bulkheads, circuit breakers, share-nothing architectures, actor models (erlang/akka)
  - trade-offs: complexity in orchestration, potential resource waste
- auditability / reproducibility
  - event sourcing, cqrs, append-only logs
  - trade-offs: storage costs, complexity in querying current state, eventual consistency

## testing - what to actually test?

avoid "rituals divorced from value".
