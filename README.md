# @wj/dataview

> Svelte v5 table component suitable for examination of extensive tabular data.

## Overview

The data view component renders a table with functionality suitable for close examination of the presented data.  It 
provides conveniences like pinnable columns and row highlighting on hover, useful to users when following data with 
their eyes.

The component tries to be as unopinionated as possible in terms of styling and tries to provide as little styling as 
possible.  Certain features, however, impose some appearance requirements.  For example, pinning columns in the grid 
requires opaque background colors or else the data from other columns will be seen through the pinned columns when 
the data view is scrolled horizontally.

To theme the table to your needs or otherwise make it play well with your styling framework of choice (Bootstrap, 
Tailwind CSS, Bulma, etc.), you may style it in accordance to what is shown in the **Theming the Data View** section.

## Quickstart

Install the package:

```powershell
npm i @wj/dataview
```

Now import the data view component and use it:

```typescript
import { WjDataView } from '@wj/dataview';
```

The only two required properties are `columns` and `data`.  The former defines the columns in the data view; the 
latter provides the data that shows in each column.  By default, the `key` property of each column is treated as the 
key to retrieve data from the data row, but this can be overridden by providing `get` functions.

> **[Demo Website](https://wjdataview.vercel.app)**

## Props

## Snippets (formerly slots)

## Events

## Theming the Data View

As stated in the overview, the data view's appearance can be customized.  The component has been styled using CSS 
variables with some defaults.  If you wish, you may redefine the variables at will (the variables are listed at the 
end of the section), but it is best to use the theme component `WjDataViewTheme` that provides a friendlier way than 
directly defining the CSS variables.

### The WjDataViewTheme Component

This component is a mere convenience to setting up themes for data view components.  It works by defining the CSS 
variables at the end of the section in a `<div>` element with its CSS `display` attribute set to `contets` that wraps 
the target `WjDataView` component.

> **TIP**:  The `WjDataViewTheme` component doesn't have to be the immediate parent of a `WjDataView`.  It can be 
> placed higher in the hierarchy to, for example, cover more than one `WjDataView` component.

The theme component has a single `theme` property of type `Theme`:

```typescript
export type ComponentColor = {
    backgroundColor?: string;
    opacity?: number;
    color?: string;
};

export type Theme = {
    table?: ComponentColor;
    stripes?: ComponentColor;
    rowHighlight?: ComponentColor;
    pinnedColumnsDivider?: {
        width?: string;
        style?: 'dashed' | 'dotted' | 'double' | 'groove' | 'inset' | 'outset' | 'ridge' | 'solid' | 'unset';
        color?: string;
    }
};
```

Since the amount of properties are a lot to set every time, the most effective way to create a theme is to spread the 
stock theme (light or dark) and then modify what's needed.

For example, Bootstrap consumers might want to ensure that the data view always uses the body's background color.  In 
this case, we could create the following theme in `dataViewThemes.ts`:

```typescript
import { stockLight, type Theme } from '@wj/dataview';

export const bootstrapTheme: Theme = {
    ...stockLight,
    table: {
        ...stockLight.table,
        backgroundColor: 'var(--bs-body-bg-rgb)'
    },
    stripes: {
        ...stockLight.stripes,
        backgroundColor: 'var(--bs-emphasis-color-rgb)'
    },
    rowHighlight: {
        ...stockLight.rowHighlight,
        backgroundColor: 'var(--bs-primary-rgb)',
        opacity: 0.2
    }
};
```

As seen, one can take advantage of CSS variables to define things.  In Bootstrap that provides light and dark modes, 
have different definitions for these CSS variables, making the data view's theme immediately responsive to theme 
selection changes.

This is not perfect, however, because Bootstrap doesn't have `-rgb` variables for every color, so not everything goes 
as smoothly.  Create responsive CSS variables to perfect the theme.

> **IMPORTANT**:  All background colors are composed using the provided color and an opacity value.  This is why the 
> color must be specified in RGB format, or with a CSS variable that defines it in RGB format.

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

## Roadmap

- [x] Scrollable viewport
- [x] Striped look
- [x] Row highlighting effect on hover
- [x] Column alignment
- [x] Hideable columns
- [x] Pinnable columns
- [x] Customizable appearance
- [x] Theme component
- [x] headerCell snippet
- [x] dataCell snippet
- [ ] headerControl snippet
- [ ] dataControl snippet
- [ ] Expansible rows (expansionRow snippet)
- [ ] Resizable columns
- [ ] Make cell/row/column padding themeable
- [ ] dataRow snippet
