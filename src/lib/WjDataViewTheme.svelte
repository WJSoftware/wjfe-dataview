<script lang="ts">
    import type { Snippet } from "svelte";
    import type { Theme } from "./stockTheme.js";

    let {
        theme,
        children
    }: {
        theme: Theme;
        children: Snippet
    } = $props();
</script>

<div
    style:display="contents"
    style:--wjdv-bg-color-rgb={theme.table?.backgroundColor}
    style:--wjdv-bg-opacity={theme.table?.opacity}
    style:--wjdv-fg-color={theme.table?.color}
    style:--wjdv-striping-bg-color-rgb={theme.stripes?.backgroundColor}
    style:--wjdv-striping-bg-opacity={theme.stripes?.opacity}
    style:--wjdv-striping-fg-color={theme.stripes?.color}
    style:--wjdv-rowhighlight-bg-color-rgb={theme.rowHighlight?.backgroundColor}
    style:--wjdv-rowhighlight-bg-opacity={theme.rowHighlight?.opacity}
    style:--wjdv-rowhighlight-fg-color={theme.rowHighlight?.color}
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
    style:--wjdv-grid-line-width={theme.gridBorders?.width}
    style:--wjdv-grid-line-style={theme.gridBorders?.style}
    style:--wjdv-grid-line-color={theme.gridBorders?.color}
>
    {@render children()}
</div>
