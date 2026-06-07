Personally, I find it interesting that sometimes OOP patterns/principles (clean code) can work against other concerns (performance). E.g. OOP might say to store data locally, inside a class instance. But if there are many of those instances, it can result in very inefficient reads, which could be catastrophic for the objectives of the code you're writing.

Here are some patterns I've found interesting.

## Entity Component System (ECS)

- Components: data
- Systems: behaviour
- Entities: IDs

Cache-friendly iteration over homogeneous data.

There is a really nice javascript library created for this: https://bitecs.dev/

## Data Oriented Design / Struct of Arrays

This is an optimization by changing the data organization of a tables of values.

This is really identical to the DB concept of column oriented vs row oriented.

Instead of an array of structs: `[{x:0,y:0, type:'some-type'}, {x:1,y:1, type: 'another-type'}]`, which is identical to 'row oriented database storage', you could use a struct of arrays: `{x: [0,1,...], y:[0,1,...],type: ['some-type', 'another-type', ...]}`

In most web apps, for most web devs, we probably use row oriented databases more, since they're more optimal for write operations. One row could relate to one of those entities, and you can just pull it out, replace one thing, and replace the whole thing in one go. If it was column oriented, then to write one object requires getting values from multiple entries. Most web devs are working on crud apps where updates are common, and read speed is not a major concenr.

But column oriented databases are used in analytics databases where reading and comparing values is the dominant action. Then, two columns can be read, and then just compared.

Cache locality. Organize data by how it's accessed rather than by object boundaries.

Javascript has less control of memory than some other languages, but modern JS enginers do optimize for:

- cache locality: contiguous arrays are faster to iterate
- hidden classes: consistent object shapes enable better JIT optimization
- SIMD potential: typed arrays can use CPU vector instructions

https://bitecs.dev/ also uses data oriented design / struct of arrays.

## Arena/region-based allocation

Allocate a big block upfront, dispense from it, free all at once. Eliminates per-object allocation overhead. Common in compilers, parsers, game frame allocations.

## Object pooling

## Loop-invariant allocation

(actually, for my example below, quite possibly the javascript compiler figures it out anyway. But for sake of example...)

pre-allocate objects, re-use them. Reduces GC.

This is about heap allocations (objects/arrays), not primitive variables.

```typescript
function (items: Item[]) {
  for (let item of items) {
    // variable created on each iteration
    const calculated = calculate(item);
    // ...
  }
}
```

```typescript
function (items: Item[]) {
  // variable assigned up front, better performance
  let calculated;
  for (let item of items) {
    calculated = calculate(item);
    // ...
  }
}
```

## Copy-on-write / persistent data structures

Structural sharing to avoid copies.

Trade-off: pointer indirection vs allocation cost.

In javascript:

- https://www.npmjs.com/package/immer
- https://immutable-js.com/

## zero-copy / shared memory architectures

Pass references/pointers instead of copying data.
