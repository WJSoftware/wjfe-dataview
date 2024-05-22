# @wjfe/dataview

> Svelte v5 table component suitable for examination of extensive tabular data.

## Overview

The data view component renders a table with functionality suitable for close examination of the presented data.  It 
provides conveniences like pinnable columns and row highlighting on hover, useful to users when following data with 
their eyes.

> **[Demo Website](https://wj-dataview.vercel.app)**

The component tries to be as unopinionated as possible in terms of styling and tries to provide as little styling as 
possible.  Certain features, however, impose some appearance requirements.  For example, pinning columns in the grid 
requires opaque background colors or else the data from other columns will be seen through the pinned columns when 
the data view is scrolled horizontally.

To theme the table to your needs or otherwise make it play well with your styling framework of choice (Bootstrap, 
Tailwind CSS, Bulma, etc.), you may style it in accordance to what is shown in the **Theming the Data View** section.

## Quickstart

Install the package:

```powershell
npm i @wjfe/dataview
```

Now import the data view component and use it:

```typescript
import { WjDataView } from '@wjfe/dataview';
```

The only two required properties are `columns` and `data`.  The former defines the columns in the data view; the 
latter provides the data that shows in each column.  By default, the `key` property of each column is treated as the 
key to retrieve data from the data row, but this can be overridden by providing `get` functions.

Each column must have the `key` and the `text` properties.  Any other property is optional.  `key` is a unique string, 
and by default, it is assumed to be the name of a property in the data objects given to the grid via the `data` 
property.

```html
<script lang="ts">
    import { WjDataView } from '@wjfe/dataview';
    import { type MyDataModel } from 'path/to/my-model-types.js';

    type MyDataModelGridRow = WjDvRow<MyDataModel>;
    type MyColumn = WjDvColumn<Record<string, any>, MyDataModelGridRow>;
    const columns = $state<MyColumn[]>([
        {
            key: 'id',
            text: 'ID'
        },
        {
            key: 'tagName',
            text: 'Tag'
        }
    ]);
    // Obtain the data somehow.  This could be part of the results of the universal or server load() SvelteKit 
    // function, or could be obtained in non-SvelteKit projects with a fetch() call.
    let data: $state<MyDataModel[]> = getDataSomehow();
</script>
...
<WjDataView {columns} {data}>
    <!-- snippets go here -->
</WjDataView>
```

This example would render the data view with two columns, whose captions will read `ID` and `Tag`.  The data shown in 
each column will be extracted from the `MyDataModel.id` and `MyDataModel.tagName` properties of each of the data 
objects in the `data` array.

## Theming the Data View

As stated in the overview, the data view's appearance can be customized.  The component has been styled using CSS 
variables with some defaults.  If you wish, you may redefine the variables at will (the variables are listed at the 
end of the section), but it is best to use the theme component `WjDataViewTheme` that provides a friendlier way than 
directly defining the CSS variables.

### The WjDataViewTheme Component

This component is a mere convenience to setting up themes for data view components.  It works by defining the CSS 
variables in a `<div>` element with its CSS `display` attribute set to `contents` that wraps the target `WjDataView` 
component.

> **TIP**:  The `WjDataViewTheme` component doesn't have to be the immediate parent of a `WjDataView`.  It can be 
> placed higher in the hierarchy to, for example, cover more than one `WjDataView` component.

The theme component has a single `theme` property of type `Theme`:

```typescript
export type ComponentColor = {
    backgroundColor?: string;
    opacity?: number;
    color?: string;
};

export type ResizerColor = {
    backgroundColor?: string;
    borderColor?: string;
};

export type Theme = {
    table?: ComponentColor;
    stripes?: ComponentColor;
    rowHighlight?: ComponentColor;
    pinnedColumnsDivider?: {
        width?: string;
        style?: 'dashed' | 'dotted' | 'double' | 'groove' | 'inset' | 'outset' | 'ridge' | 'solid' | 'unset';
        color?: string;
    },
    resizer?: {
        width?: string;
        overlay?: {
            opacity?: number;
            item?: ResizerColor;
            positiveDelta?: ResizerColor;
            negativeDelta?: ResizerColor;
        }
    };
};
```

While the amount of properties are a lot, each one of them are optional.  Simply set the properties that you wish to 
customize.  The properties that aren't set will take the default documented in the table further down this document.

For example, Bootstrap consumers might want to ensure that the data view always uses the body's background color.  In 
this case, we could create the following theme in a `dataViewThemes.ts` (potential) file:

```typescript
import { type Theme } from '@wjfe/dataview';

export const bootstrapTheme: Theme = {
    table: {
        backgroundColor: 'var(--bs-body-bg-rgb)'
    },
    stripes: {
        backgroundColor: 'var(--bs-emphasis-color-rgb)'
    },
    rowHighlight: {
        backgroundColor: 'var(--bs-primary-rgb)',
        opacity: 0.2
    }
};
```

> Besides setting the table's background color, it also uses the emphasis color for striping, and changes the 
> highlight color to the primary color with 20% opacity, all for good measure.

As seen, one can take advantage of CSS variables to define values.  Bootstrap provides light and dark modes, and these 
variables have different definitions depending on the mode, making the data view's theme immediately responsive to 
mode selection changes.

This is not perfect, however, because Bootstrap doesn't have `-rgb` variables for every color, so not everything goes 
as smoothly.  Create CSS variables that adjust to the color mode to perfect the theme.

> **IMPORTANT**:  All background colors are composed using the provided color and an opacity value.  This is why the 
> color must be specified in RGB format, or with a CSS variable that defines it in RGB format.  Formats like `#rrggbb` 
> simply won't work.

Anyway, use the `WjDataViewTheme` component as a wrapper for any `WjDataView` components that you may have.  This 
wrapper doesn't have to be the immediate parent, so put it wherever is best according to your needs.

```html
<script lang="ts">
    import { bootstrapTheme } from '../dataViewThemes.js';
</script>

<WjDataViewTheme theme={bootstrapTheme}>
    <WjDataView ...>
        <!-- Snippets go here -->
    </WjDataView>
</WjDataViewTheme>
```

The complete list of CSS variables that can be set for the data view component are:

| CSS Variable | Light Default | Dark Default | Description |
| - | - | - | - |
| `--wjdv-bg-color-rgb` | `255, 255, 255` | `0, 0, 0` | Data view's background color. |
| `--wjdv-bg-opacity` | `1` | `1` | Background's opacity. |
| `--wjdv-fg-color` | `inherit` | `inherit` | Foreground (or text) color.  Usually this one doesn't need to be set. |
| `--wjdv-striping-bg-color-rgb` | `0, 0, 0` | `255, 255, 255` | Striping background color.  Set the opacity as well. |
| `--wjdv-striping-bg-opacity` | `0.04` | `0.07` | Striping background color's opacity. |
| `--wjdv-striping-fg-color` | `inherit` | `inherit` | Foreground (or text) color for striped rows. |
| `--wjdv-rowhighlight-bg-color-rgb` | `0, 0, 0` | `255, 255, 255` | Background color for row highlighting on hover. |
| `--wjdv-rowhighlight-bg-opacity` | `0.07` | `0.15` | Opacity for row highlighting.  Usually set higher than the striping one or the effect doesn't look very good. |
| `--wjdv-rowhighlight-fg-color` | `inherit` | `inherit` | Foreground (or text) color for highlighted rows. |
| `--wjdv-sticky-divider-width` | `0.1em` | `0.1em` | Width of the border that divides pinned columns from unpinned ones. |
| `--wjdv-sticky-divider-style` | `solid` | `solid` | Style of the border that divides pinned columns from unpinned ones. |
| `--wjdv-sticky-divider-color` | `darkgray` | `lightgray` | Color of the border that divides pinned columns from unpinned ones. |
| `--wjdv-resizer-width` | `0.4em` | `0.4em` | Column resizer's width. |
| `--wjdv-resizer-overlay-opacity` | `0.7` | `0.7` | Opacity of the entire resizer overlay. |
| `--wjdv-resizer-overlay-bg-color` | `lightblue` | `#0578ea` | Background color of the overlay section that represents the original column's size. |
| `--wjdv-resizer-overlay-border-color` | `blue` | `#13aeff` | Border color of the overlay section that represents the original column's size. |
| `--wjdv-resizer-deltapos-bg-color` | `lightgreen` | `lightgreen` | Background color of the overlay setion that represents the column's size increase. |
| `--wjdv-resizer-deltapos-border-color` | `green` | `green` | Border color of the overlay setion that represents the column's size increase. |
| `--wjdv-resizer-deltaneg-bg-color` | `pink` | `pink` | Background color of the overlay setion that represents the column's size reduction. |
| `--wjdv-resizer-deltaneg-border-color` | `red` | `red` | Border color of the overlay setion that represents the column's size reduction. |

## Reference

### Props

| Property | Type | Default Value | Description |
| - | - | - | - |
| `columns` | `WjDvColumn<TCol, TRow>[]` | (none) | Defines the columns the data view component will create. |
| `data` | `WjDvRow<TRow>[]` | (none) | The data that is shown by the data view component. |
| `get` | `(row: TRow, key: string) => any` | (function) | Function that retrieves a column's value using the row and provided key for columns that don't provide one. |
| `defaultWidth` | `number` | `10` | The width for colums that don't specify its own width, in `em`'s. |
| `rowHighlight` | `boolean` | `true` | Turns the row-highlighting-on-hover feature on and off. |
| `striped` | `boolean` | `true` | Turns the striping of rows on and off. |
| `pinnedDivider` | `boolean` | `true` | Turns the divider between pinned and unpinned columns on and off. |
| `class` | `string` | `undefined` | Additional CSS classes that are applied to the data view's viewport (the top-level element). |

### Snippets (formerly slots)

| Name | Signature | Description |
| - | - | - |
| `headerCell` | `(col: WjDvColumn<TCol, TRow>)` | Renders header cells' content.  The snippet is passed the column definition. |
| `dataCell` | `(col: WjDvColumn<TCol, TRow>, row: WjDvRow<TRow>])` | Renders data cells' content.  The snippet is passed the column definition and the data object for the row being rendered. |

### Events

None.

## Roadmap

- [x] Scrollable viewport
- [x] Striped look
- [x] Row highlighting effect on hover
- [x] Column alignment
- [x] Text wrap control
- [x] Hideable columns
- [x] Pinnable columns
- [x] Customizable appearance
- [x] Theme component
- [x] headerCell snippet
- [x] dataCell snippet
- [x] Resizable columns
- [ ] headerControl snippet
- [ ] dataControl snippet
- [ ] Expansible rows (expansionRow snippet)
- [ ] Make cell/row/column padding themeable
- [ ] dataRow snippet
