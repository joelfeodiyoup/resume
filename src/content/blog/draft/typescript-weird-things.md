---
title: Typescript interfaces vs types
date: 2026-06-19
slug: ts-interfaces-vs-types
excerpt:
---

Some things in typescript are a bit weird, or sometimes can be a bit confusing. Sometimes they're just divergences that are difficult to remember. I'll list a few, to help myself.

## differences

**extension syntax**

It used to be that only interfaces could be extended. Actually I've had interviewers tell me this is the difference between the two, which confused me, making me question what I thought was possible. They both can be extended, just with different syntax.

```ts
// interfaces use 'extends'
interface Animal {
  name: string
}
interface Dog extends Animal {
  breed: string
}
```

```ts
// types use intersection (&)
type Animal = { name: string }
type Dog = Animal & { breed: string }
```

**declaration merging**

Interfaces definitions merge, as in the example below. This can be useful if you need to merge a 3rd party interface.

```ts
interface User {
  name: string
}
interface User {
  age: number
}
const u: User = { name: 'John', age: 123 } // interface merged
```

types cannot be merged like that:

```ts
type User = { name: string }
type User = { age: number } // error
```

To me this (declaration merging in interfaces) feels potentially dirty, like the days of intentionally overriding some global variable, but potentially by mistake. This is only really a problem when you leak out global interfaces. E.g. interfaces defined in `.d.ts`. So instead, you should wrap that in a module:

```ts
// in a .d.ts file
declare module 'my-types' {
  export interface Config {
    // 'export' makes it module-scoped
    theme: string
  }
}
```

**types can represent things interfaces cannot**

```ts
// union types
type Status = 'active' | 'inactive' | 'pending'

// primitives
type ID = string | number

// mapped types
type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}
type T = { age: number }
const r: Readonly<T> = {
  age: 123,
}
```

## generic differences for interfaces vs types

Actually they're the same

```ts
interface Box<T> {
  value: T
  getValue(): T
}
```

```ts
type Box<T> = {
  value: T
  getValue(): T
}
```

## marginal performance difference

interfaces are marginally more performant in large codebases. The typescript team has said the difference is "single-digit milliseconds" on massive codebases.

Why?

- interfaces create name references
- types with intersections are computed on-demand

-> modern optimizations are shrinking it more by caching intersection evaluations.
