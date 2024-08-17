<script lang="ts">
    import { nextControlId } from "$lib/utils.js";
    import type { Snippet } from "svelte";

    type Props = {
        pinPreference: boolean | undefined;
        noMenuItem?: boolean;
        children: Snippet;
    };

    let {
        pinPreference = $bindable(),
        noMenuItem = false,
        children,
    }: Props = $props();

    let thisId = nextControlId();
</script>

<div class="d-flex flex-row p-0" class:dropdown-item={!noMenuItem}>
    {@render children()}
    <input type="checkbox" class="btn-check" bind:checked={pinPreference} id="{thisId}_pinpref">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <label for="{thisId}_pinpref" class="btn btn-neutral rounded-0 flex-grow-0" onclick={(e) => e.stopPropagation()}>
        <!-- <i class="bi bi-{pinPreference ? 'star-fill' : 'star'}"></i> -->
        <i class="bi bi-stars"></i>
    </label>
</div>
