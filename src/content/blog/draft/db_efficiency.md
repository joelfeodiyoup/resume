## DB execution order

1. FROM + JOINS - tables
2. WHERE - rows. (probably this makes sense in row-oriented databases. Filtering by rows makes sense. Probably you should only reference column values you have an index for.)
3. GROUP BY - filter group
4. HAVING - filter group (having...)
5. SELECT - select which columns you want
6. DISTINCT - remove duplicate rows
7. ORDER BY - sort the final result set
8. LIMIT/OFFSET - slice the sorted results

**filter groups**

## explain/explain analyze

Learn to read query plans. (EXPLAIN output)

## index strategies

- b-tree
- hash
- partial
- covering indexes

## join algorithms

- nested loop vs hash join vs merge join

## statistics

th eplanner needs up-to-date states (ANALYZE)

## cardinality estimation

why the planner chooses certain paths

## partitioning strategies for large tables?

## connection pooling ?

- pgbouncer. critical for microservices
