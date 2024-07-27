<script lang="ts" generics="TCol extends Record<string, any> = Record<string, any>, TRow extends Record<string, any> = Record<string, any>">
    import type { WjDvColumn } from '$lib/WjDataView.svelte';

    type Props = {
        col: WjDvColumn<TRow, TCol>;
    };

    let {
        col = $bindable(),
    }: Props = $props();
</script>

<div class="d-flex flex-row ps-2">
    <span class="fw-semibold text-nowrap text-truncate">{col.text}</span>
    <button class="btn btn-sm ms-auto" onclick={() => col.pinned = !col.pinned}>
        <span title="Click to {col.pinned ? 'un' : ''}pin">
            <i class="bi bi-pin-{col.pinned ? 'fill' : 'angle'}"></i>
        </span>
    </button>
</div>
