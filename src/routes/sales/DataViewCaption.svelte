<script lang="ts">
    import type { Snippet } from "svelte";
    import Toolbar, { type WjDataViewOptions } from "./Toolbar.svelte";

    type Props = {
        title: string;
        dvOptions: WjDataViewOptions;
        moreInfoTarget: string;
        children?: Snippet;
    };

    let {
        title,
        dvOptions = $bindable(),
        moreInfoTarget,
        children,
    }: Props = $props();
</script>

<div class="d-flex flex-column flex-nowrap">
    <Toolbar bind:options={dvOptions} {moreInfoTarget}>
        {@render children?.()}
    </Toolbar>
    <div class="title fw-bold px-2 py-1 rounded-start">
        {title}
    </div>
</div>

<style lang="scss">
    .title {
        background: linear-gradient(to right, rgb(246, 121, 102), var(--bs-body-bg));
        :global([data-bs-theme="dark"]) & {
            background: linear-gradient(to right, rgb(102, 30, 2), var(--bs-body-bg));
        }
    }
</style>
