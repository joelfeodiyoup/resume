---
title: Domain modeling approaches
date: 2026-06-05
slug: domain-modeling-approaches
tags: architecture, design patterns, DDD, typescript
excerpt: Exploring three domain modeling philosophies—rich domain model (DDD), anemic domain model, and functional domain model—and how to choose the right approach for your business logic.
---

How to handle data within the code.

Within the business logic there are some different approaches to model the domain. Hexagonal architecture can use any of these three. They have pros and cons, and the best choice just depends on your aims.

### rich domain model (DDD approach)

- domain objects contain both data and behaviour
- business logic lives in domain entities, value objects, aggregates
- **philosophy**: object-oriented, encapsulation-focused
- `thing.doSomething()` - tell the object what to do

```typescript
class Order {
  private items: OrderItem[] = []
  addItem(item: OrderItem) {
    if (this.status === 'completed') {
      throw new Error('cannot modify completed order')
    }
    this.items.push(item)
  }
}
// Port (interface)
interface OrderRepository {
  save(order: Order): Promise<void>
}
```

### anemic domain model

- domain objects are just data structures (DTOs/POJOs)
- business logic lives in separate service classes
- **philosophy**: procedural, separation of data and behaviour
- martin fowler calls this an 'anti-pattern' in OOP contexts. But valid in others.
- `service.doSomething(thing)` - do something to the data

```typescript
interface Order {
  id: string
  items: OrderItem[]
}
class OrderService {
  addItem(order: Order, item: OrderItem): Order {
    if (order.status === 'completed') {
      throw new Error('cannot modify completed order')
    }
    order.items.push(items)
  }
}
// same port structure
interface OrderRepository {
  save(order: Order): Promise<void>
}
```

There is no restriction here on code outside calling `order.items.push(whatever)`. Whereas with rich domain model, `order.items` is a private internal object. It can only be called through the internal method, which controls the business logic.

### functional domain model

- domain concepts as immutable data + pure functions
- business logic as composable functions operating on data
- **philosophy**: immutability, function composition
- fits with CQRS/event-sourcing

```typescript
type Order = { id: string; items: readonly OrderItem[] }
const addItem = (order: Order, item: OrderItem): Order => ({
  ...order,
  items: [...order.items, item],
})

// same port structure
interface OrderRepository {
  save(order: Order): Promise<void>
}
```
