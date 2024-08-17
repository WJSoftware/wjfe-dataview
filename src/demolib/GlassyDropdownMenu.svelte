<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        children?: Snippet;
        shadow?: boolean;
    };

    let {
        children,
        shadow,
        ...restProps
    }: Props = $props();
</script>

<div class="dropdown-menu bg-glass" class:shadow {...restProps}>
    {@render children?.()}
</div>

<style lang="scss">
    .bg-glass {
        background-color: rgba(var(--bs-body-bg-rgb), 0.3);
        backdrop-filter: blur(7px) saturate(110%);
    }
</style>
