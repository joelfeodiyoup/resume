## What it is

When you're not sure what kind of data will be held, or you want to allow flexibility, then it might be tempting to make another table, three columns

```sql
CREATE TABLE Attributes (
  id String NOT NULL,
  attr_name String,
  attr_value String,
  PRIMARY KEY (id, attr_name),
  FOREIGN KEY (issue_id) REFERENCES SomeTable(id)
)
```

Then you can just store whatever you want there, less wasted space, etc.

But it's got a few problems. It's basically applying a system on top of RDBMS. There are probably better solutions.

## Issues

- you can't enforce what the attribute names are
  - normally you'd have the option to reference a foreign key to a table defining those names. Here you can't. They're meant to be flexible, and hold a variety of things
- you cant enforce referential integrity on the value
- you can't enforce the data type held as value. e.g. date, string, int
  - if you try to store dates, there could be inconsistent formats, and then the values that can't be compared
  - this probably also is inefficient in how the DB is storing things / search / whatever
- you can't enforce data rules
  - e.g. , normally you might want to say "this value is necessary" for a certain table
- when querying, you'll need to know the types of attributes to query for
  - e.g. you're going to need to join the original table rows with the attribute table, but on 'attr_name = 'date_reported' or whatever it is
  - if there is then inconsistent naming of attributes, then you'll need to complicate the query further by allowing multiple attribute names, and combining them

## Alternatives

### single table inheritance

implementation:

- add all the possible attributes as optional columns to the same database table
- rows only provide values for the things they'll be using

problems:

- application layer needs to manage this
- cannot have object shape enforcement. E.g. some subtype may require one value, but SQL has no knowledge of these sub types

best for:

- when you have a few subtypes and few sub type specific attributes
- you need to use a single-table database access pattern

### concrete table inheritance

implementation:

- make separate tables for your different types
- each table duplicates the common fields, and has distinct columns for the parts where they differ

problems:

- the shared/duplicated properties are intended to provide each with the same "base class" but there's not really any way to know if that's by design or coincidence.
- each classes are intended to have this similarity (some shared properties), yet they're separate tables. So to search amongst all of them, you probably need to create a view that combines them

### class table inheritance

A bit more like inheritance of classes from OOP.
