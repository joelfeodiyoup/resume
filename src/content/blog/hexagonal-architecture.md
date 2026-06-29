---
title: Hexagonal architecture
date: 2026-06-05
slug: hexagonal-architecture
tags: architecture, SOLID, design patterns, testing
excerpt: Understanding hexagonal architecture (ports and adapters pattern) as a way to make systems testable and technology-agnostic by separating business logic from infrastructure through interfaces.
---

tl;dr : I think of it as N(3)-tier, but where the middle layer, business logic, relies upon an interface rather than a concrete class. There's a bit more to it. But it's largely about separating things by using interfaces.

`Inbound Adapters -> [Inbound Port] -> Business Logic -> [Outbound Port] <- Outbound Adapters`

The inventor created it mainly to make systems testable and technology-agnostic. Personally I think of it as this and as an architecture that optimises for 'clean' architecture, for SOLID principles.

Robert Martin came up with 'SOLID principles' in 2000. Alistair Cockburn wrote about hexagonal architecture in 2005 (but had been using the concept since the 1990s). It seems that Hexagonal was created as an output of SOLID, but that they both independently came to similar ideas.

## abstraction of infrastructure

The main benefit. It's basically N-tier architecture but where the business layer relies upon an interface rather than a concrete implementation.

```typescript
// N-tier, non-hexagonal
import { DBService } from './dbservice'

class BusinessLogic {
  // relies upon a concrete implementation
  constructor(private readonly DBService: dbService) {}
}
```

```typescript
// hexagonal business logic
interface IDataRepository {
  save(
    data: Data,
  ): Promise<{ success: true; data: Data } | { success: false; error: string }>
}
class BusinessLogic {
  constructor(private readonly IDataRepository: dataRepository) {}
}
```

This sets out the goal: code cares only about what it needs to do, by defining an interface, not the way that its implemented (a specific db); and the code can be tested by mocking that interface in dependency inversion.

Hexagonal architecture names them `ports -> interfaces` , `adapters -> concrete implementations of an adapter, resolved by the dependency injection container.

## use cases

There's a term `use-cases`. But it's just the public interface of that business logic. E.g., above, it should be something like this:

```typescript
interface IBusinessLogic {
  createAccount(user: User): Promise<>
}
class BusinessLogic implements IBusinessLogic {
  createAccount(user){}
  private someInternalMethod() {}
}
```

I think you could use your judgement on whether you need this. The benefit is that incoming classes (controllers, message consumers, cli handlers, etc) could then mock this and test that they work correctly. If you don't want to test that (i.e. you cover it in integration tests) then it would be unnecessary extra work to define interfaces. It just depends.

## some helpful tips

Personally I find that sometimes coming up with the right abstractions is difficult. i.e. the interface for what that business logic needs to do, separated from the implementation. Some ideas to help:

- write concrete implementation first, then abstract
- ask 'what' not 'how'. What it needs to accomplish
- interfaces should be verbs, not technology names
- 'swap test'. Could it be swapped, with this implementation definition? Does it make sense?

Some common file naming can help for infrastrcture:

outbound:

- `.repository` - database access
- `.client`
- `.messaging` / `.message-broker`
- `.cache`
- `.notification`
- `.logging`
- `.monitoring`
- `.auth` - external authentication providers
- etc

inbound:

- `.controller` - HTTP REST controllers
- `.graphql` - gql resolvers
- `.grpc` - grpc service implementations
- `.cli` - command-line interface handlers
- `.websocket`
- etc

## implementing in NestJS

```
src/
  orders/
    application/
      create-order.service.ts   # business logic (use case)
      ports/
        order.repository.ts     # outbound port interface
        payment.gateway.ts      # outbound port interface
    adapters/
      inbound/
        order.controller.ts     # HTTP adapter
      outbound/
        order.repository.impl.ts
        payment.gateway.impl.ts
    orders.module.ts            # wire up DI
```

In `orders.module.ts`:

```typescript
@Module({
  providers: [
    CreateOrderService,
    { provide: 'OrderRepository', useClass: OrderRepositoryImpl },
    { provide: 'PaymentGateway', useClass: PaymentGatewayImpl },
  ],
  controllers: [OrderController],
})
```

Business logic injects using `@Inject('OrderRepository')`. Controllers inject the service class directly (no interface needed unless you want it).
