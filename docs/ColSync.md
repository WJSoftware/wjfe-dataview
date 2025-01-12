# Column Synchronization

> Since **v0.12.0**

It is now possible to synchronize any column property between two columns of different dataview instances, and its 
primary purpose is to make a column in a master dataview component visually align with an equivalent column in child 
dataview components that show up when users "drill-down" data rows.

A picture is worth a thousand words, so here's a screenshot of the [sales demo]():

![Column Synchronization Sample](./Col%20Sync%20Sample.png)

What you're seeing in the screenshot is the *Total Sales* column from the top dataview component (global data) 
perfectly aligned with the *Total Sales* column of a per-city dataview component.  To achieve this, the child dataview 
component has created a *filler* column to the left of its *Total Sales* column to be able to "catch up" with its 
partner column in the master dataview component.

This layout will maintain itself, regardless of changes in:

- Column width (any column in any of the dataview components)
- Column's minimum width
- Pinned status
- Hidden status

Furthermore, the feature allows synchronization of any of the column's properties, even user-defined ones.  Take the 
sales demo as example:  Synchronized columns also synchronize the pinned functions.  Try it yourself.  Pin a function 
in one of the synchronized columns and see how the same happens on the other partner columns.

## How to Use

Synchronizing columns is a 3-step process:

1. Create a cross-synchroizer object.
2. Use it to create synchronizable properties.
3. Synchronize the desired columns.

Since you'll be needing the column objects of at least 2 dataview instances, the recommended way is to create a new 
module that defines and exports the columns for the involved dataview instances:

```typescript
// dvColumns.svelte.ts
import { CrossSynchronizer, crossVisualSync, type WjDvColumn } from "@wjfe/dataview";
import type { MasterData, ChildData } from "./my/data-models.js";
/**
 * Some extra props you want/need in your project in every column you define.
 */
export type ColumnExtraProps = {
    isFiltered?: boolean;
    pinnedFunctions?: {
        pin?: boolean;
        hide?: boolean;
    }
}

export type MasterColumn = WjDvColumn<MasterData, ColumnExtraProps>;
export type ChildColumn = WjDvColumn<ChildData, ColumnExtraProps>;

// This is Step 1:
const synchronizer = new CrossSynchronizer();

// This is Step 2:
export const masterColumns = $state(synchronizer.createProperty<MasterColumn>([
    {
        key: 'id',
        text: 'ID',
        hidden: true,
    },
    ... // etc.  All your master columns.
    {
        key: 'total',
        text: 'Total',
    },
], ...crossVisualSync, 'pinnedFunctions'));
export const childColumns = $state(synchronizer.createProperty<ChildColumn>([
    {
        key: 'id',
        text: 'ID',
    },
    ... // etc.  All your child columns.
    {
        key: 'total',
        text: 'Total',
    },
], ...crossVisualSync, 'pinnedFunctions'));

// This is Step 3:

// Assume that there are 5 master columns and 9 child columns, and we want the fifth from master to synchronize with 
// the 9th from child.
synchronizer.syncColumns(masterColumns[4], childColumns[8]);
```

All the work is now done.  Whenever the master and at least one child are present on the application, the fifth master 
column and the 9th child column will visually align.  Furthermore, if one is pinned, then the other will pin too; if 
one is hidden, then the other will hide too; if one changes width or minimum width, then the other will do the same.

### About crossVisualSync

The cross-synchronization feature assumes nothing about what you want to do with the synchronization.  You are free to 
set synchronization up between columns for just user-defined properties if you want.  However, if you want to achieve 
the visual synchronization demonstrated in the sales demo as it has been described here, then the following properties 
**must** be synchronized:

- `width`
- `minWidth`
- `hidden`
- `pinned`
- `useMinWidthAsWidth`

Furthermore, every one of these properties in the other columns of the participating dataview components must have 
these created as synchronizable properties using `CrossSynchronizer.createProperty()`.  This is why the entire list of 
columns has been passed to this function in the example above.

If you haven't guessed already, `crossVisualSync` is a constant array that lists the aforementioned properties so you 
can easily specify them without missing anything.

## Usage Warnings

There are no special checks in the package to prevent you from doing "unlawful" things.  The most important one that 
you **must** avoid is to create synchronization pairs that cross each other.

To understand, have a look at this screenshot:

![Pair Crossing](./Pair%20Corssing.png)

If we were to visually synchronize the child column *Quantity Sold* with the parent column *Total Costs* while also 
having the columns *Total Sales* visually synchronized, the arrows cross each other.  This is physically impossible to 
achieve and you'll see a filler column infinitely wide appearing, and your application will become unresponsive, and 
you'll have to restart it.

The other *potentially* unlawful scenario would be to synchronize 2 columns of the same dataview component.  If you 
decide to try your luck, be sure to test thoroughly.

## Filler Columns

If you pay attention to the screenshots, you'll notice a striped column to the left of a synchronized column.  This is 
a filler column.  Filler columns appear in places where the horizontal position of a synchronized column must be 
adjusted to the right in order to align with a column of another dataview component.

The looks of filler columns is controlled by one component property, and two CSS variables:

+ `fillerPattern` property:  It controls which background pattern is used.  The possible values are `checkered`, 
`triangles` and `diagstriped`.
+ `--wjdv-filler-color` variable:  It controls the color of the pattern.
+ `--wjdv-filler-pattern-size` variable:  It controls the width (or size) of the pattern.
