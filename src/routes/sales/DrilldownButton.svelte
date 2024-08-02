<script lang="ts" generics="TRow extends Record<string, any> = Record<string, any>">
    import type { WjDvRow } from '$lib/WjDataView/WjDataView.svelte';

    type Props = {
        row: WjDvRow<TRow>;
    };

    let {
        row = $bindable(),
    }: Props = $props();
</script>

<button type="button" class="btn btn-neutral btn-sm" onclick={() => row.wjdv.expanded = !row.wjdv.expanded}>
    <i class="bi bi-chevron-bar-{row.wjdv.expanded ? 'contract' : 'expand'}"></i>
</button>
