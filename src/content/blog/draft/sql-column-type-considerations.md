---
title: sql column type considerations
date: 2024-06-15
slug: sql-column-type-considerations
excerpt:
---

This is inspired by an interview question I received, where I am fairly sure the interviewer was incorrect. And I wanted to later investigate a little more.

The context was, I was explaining one option for representing tree structures in SQL, and why I would not necessarily choose one. In particular, 'path enumeration'. Each row would store, as one entry, the id path of its parents: '1234/5678/2222' meaning direct parent has id '2222', then the parent of that is '5678' etc. This way you could fairly easily find all the parent elements. This is a pattern that might fit some use cases, but has several bad points. (i.e. maybe optimises simplicity in exchange for some ugly scenarios), and I presented this as an option I wouldn't choose for a scenario.

i.e. each row contains two values:

- id: VarChar(16)
- parentIds: string (separated by some character, e.g. `/`)

One of the problems with this is that you can't very well assign a data type for `parentIds`. How long should it be? How deep can the tree be? I explained that. But in the interview, I was told "why would that matter?" It got down to the interviewers claiming that postgres could just expand this column as it wanted. There are variable width columns. However I also don't think that is a good idea. But maybe I was wrong? I'll look at it a bit more deeply.

## why set column lengths are important

The data needs to be stored on disk eventually, as a contiguous pages of values. More or less. In row-oriented databases it means the memory layout could be visualised as:

`[row1 id, row1 parentIds, row1 property 3, row2 id, row2 parentIds, row2 property 3, row 3 id, row3 parentIds, row3 property 3, ...]`

In reality databases use b-tree structures. Like sorted binary trees, but with many child nodes per element. This is to locate memory as close to each other as possible so that a large chunk of data could be read at once, rather than needing to jump around.

Postgres, in particular, stores the row indexes in these b-trees. In general, some databases might store the entire rows in the b-trees. (e.g. mysql and innodb store the actual rows at the leaf nodes)

I had a misunderstanding here. I thought that column width should need to be consistent. But actually postgres then points each of these b-trees to a 'page' which then stores potentially multiple rows. And each page does not need to have the same width columns.

My thinking was that it would need to, and then in that case, any column type that is dynamic would need to be a pointer to some separate table. This is actually not the case.

So, in particular `VARCHAR(1000)` specifies the maximum size that could be stored.

## postgres TOAST

postgres does have something called TOAST. `The Oversized-Attribute Storage Technique`. Essentially, if a column exceeds about 2kB in size, it will be moved to a 'TOAST' table.

Some more detail:

Postgres b-trees point to 'pages' where the row data lives. These pages typically have a limit of 8kB. Multiple rows can live on a page. So, because of the page size limit, when some data exceeds about 2kB then it should be stored elsewhere. This chunk of data is not stored with the rest of the row data, and therefore requires an additional read.

In this case, probably a column containing a list of its parent ids is not going to reach 2kB in size.

## arrays?

The interviewer also suggested I could 'just use arrays' as the column type. You could, and it adds some type checking.

But:

- it doesn't enforce a size limit, and so the column could expand, resulting in TOAST, degrading performance.
- arrays are a feature of postgres. MySQL doesn't have native array columns
- the postgres documentation warns against this pattern:
  `"Arrays are not sets; searching for specific array elements can be a sign of database misdesign. Consider using a separate table with a row for each item that would be an array element."`

## the bigger issues with path enumeration

As a side point, the issue discussed here (column size on `parentIds`) is just one of the issues. Possibly not the main one. Other issues are:

- no referential integrity - can't use foreign keys to validate parent IDs exist
- can't index properly - can't efficiently query 'find all descendants of node X'
- string parsing overhead - every query needs to split/parse the path string
- update complexity
- no type safety

Each of those could have a lot more said on them.
