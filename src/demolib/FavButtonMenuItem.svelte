<script lang="ts">
    import { combineClasses } from "$lib/utils.js";
    import type { Snippet } from "svelte";
    import FavMenuItem from "./FavMenuItem.svelte";

    type Props = {
        pinPreference: boolean | undefined;
        class?: string;
        children: Snippet;
        onClick?: () => void;
    };

    let {
        pinPreference = $bindable(),
        class: cssClass,
        children,
        onClick,
    }: Props = $props();
</script>

<FavMenuItem bind:pinPreference>
    <button
        type="button"
        class={combineClasses("btn btn-neutral rounded-0 text-start flex-fill pe-4", cssClass)}
        onclick={() => onClick?.()}
    >
        {@render children()}
    </button>
</FavMenuItem>
