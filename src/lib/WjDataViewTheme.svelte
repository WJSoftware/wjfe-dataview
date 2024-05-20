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
>
    {@render children()}
</div>
