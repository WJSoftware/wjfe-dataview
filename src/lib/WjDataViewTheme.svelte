<script lang="ts">
    import type { Snippet } from "svelte";
    import type { Theme } from "./stockTheme.js";

    type Props = {
        /**
         * Theme object that carries the desired appearance personalizations.
         */
        theme: Theme;
        /**
         * Renders the provided child content.
         */
        children: Snippet;
    };

    let {
        theme,
        children
    }: Props = $props();
</script>

<div
    style:display="contents"
    style:--wjdv-bg-color-rgb={theme.table?.backgroundColor}
    style:--wjdv-bg-opacity={theme.table?.opacity}
    style:--wjdv-fg-color={theme.table?.color}
    style:--wjdv-striping-bg-color-rgb={theme.stripes?.backgroundColor}
    style:--wjdv-striping-bg-opacity={theme.stripes?.opacity}
    style:--wjdv-striping-fg-color={theme.stripes?.color}
    style:--wjdv-rowtracking-bg-color-rgb={theme.rowTracking?.backgroundColor}
    style:--wjdv-rowtracking-bg-opacity={theme.rowTracking?.opacity}
    style:--wjdv-rowtracking-fg-color={theme.rowTracking?.color}
    style:--wjdv-sticky-divider-width={theme.pinnedColumnsDivider?.width}
    style:--wjdv-sticky-divider-style={theme.pinnedColumnsDivider?.style}
    style:--wjdv-sticky-divider-color={theme.pinnedColumnsDivider?.color}
    style:--wjdv-resizer-width={theme.resizer?.width}
    style:--wjdv-resizer-overlay-opacity={theme.resizer?.overlay?.opacity}
    style:--wjdv-resizer-overlay-bg-color={theme.resizer?.overlay?.item?.backgroundColor}
    style:--wjdv-resizer-overlay-border-color={theme.resizer?.overlay?.item?.borderColor}
    style:--wjdv-resizer-deltapos-bg-color={theme.resizer?.overlay?.positiveDelta?.backgroundColor}
    style:--wjdv-resizer-deltapos-border-color={theme.resizer?.overlay?.positiveDelta?.borderColor}
    style:--wjdv-resizer-deltaneg-bg-color={theme.resizer?.overlay?.negativeDelta?.backgroundColor}
    style:--wjdv-resizer-deltaneg-border-color={theme.resizer?.overlay?.negativeDelta?.borderColor}
    style:--wjdv-selected-bg-color-rgb={theme.rowSelection?.backgroundColor}
    style:--wjdv-selected-bg-opacity={theme.rowSelection?.opacity}
    style:--wjdv-selected-fg-color={theme.rowSelection?.color}
    style:--wjdv-grid-line-width={theme.gridLines?.width}
    style:--wjdv-grid-line-style={theme.gridLines?.style}
    style:--wjdv-grid-line-color={theme.gridLines?.color}
>
    {@render children()}
</div>

<!--
@component

# WjDataViewTheme

This is a helper component that helps to set CSS variables for `WjDataView` components.  There are over 2 dozen 
different properties, and as per usual CSS naming convention, their names are very elaborated.

This component translates an object of type `Theme`, which is hierarchically ordered and with friendlier names, into 
CSS variable definitions.

## Examples

This is a basic Bootstrap theme:

```typescript
const bootstrapTheme: Theme = {
    table: {
        backgroundColor: 'var(--bs-body-bg-rgb)'
    },
    stripes: {
        backgroundColor: 'var(--bs-emphasis-color-rgb)'
    },
    rowTracking: {
        backgroundColor: 'var(--bs-primary-rgb)',
        opacity: 0.2
    },
    rowSelection: {
        backgroundColor: 'var(--bs-row-selection-bg-color-rgb)',
    }
};
```

The CSS variable used last doesn't really exist in Bootstrap.  It has been defined like this:

```scss
.theme-def {
    --bs-row-selection-bg-color-rgb: 221, 235, 255;
    
    :global([data-bs-theme="dark"]) & {
        --bs-row-selection-bg-color-rgb: 21, 35, 55;
    }
}
```

By using CSS variables that react towards the theme mode selection, `WjDataView` components will react and change 
naturally.
-->