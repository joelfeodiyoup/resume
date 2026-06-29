---
title: DB Tree Permission System
date: 2024-06-15
slug: isometric-browser-game
tags: backend, nodejs, authentication, db, sql queries
url: https://github.com/joelfeodiyoup/recursive-database-draft
---

This is a solution to build a system that:

- stores objects (either 'Task' or 'Work Area') in a tree structure
- users can be assigned a 'role' at any given node in the tree
- permissions on any node are derived based upon which roles they have in ancestors or descendants

Solution demonstrates:

- DB schema design:
  - achieving polymorphism through **class table inheritance**
  - modelling a tree structure via **closure tables**, to optimise for fast reads
- slightly **complex SQL queries**
- some light hexagonal **architecture** in the API layer
- **unit testing** of permissions system
