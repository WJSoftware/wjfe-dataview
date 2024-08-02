<script context="module" lang="ts">
    const allAlignments: ColAlignment[] = [
        'start',
        'center',
        'end'
    ];

    const alignmentIcons: Record<ColAlignment, string> = {
        'center': 'text-center',
        'end': 'text-right',
        'start': 'text-left'
    };
</script>

<script lang="ts" generics="TCol extends Record<string, any> = Record<string, any>, TRow extends Record<string, any> = Record<string, any>">
    import type { ColAlignment, WjDvColumn } from '$lib/WjDataView/WjDataView.svelte';
    import keyStateStore from '../../demolib/keyStateStore.svelte.js';

    type Props = {
        col: WjDvColumn<TRow, TCol>;
    };

    let {
        col = $bindable(),
    }: Props = $props();

    let colAlignmentIndex = $derived(allAlignments.findIndex(a => a === (col.alignment ?? 'start')));
    let alignmentIcon = $derived(alignmentIcons[allAlignments[keyStateStore.ctrl ? previousAlignmentIndex() : nextAlignmentIndex()]]);

    function nextAlignmentIndex() {
        return (colAlignmentIndex + 1) % allAlignments.length;
    }

    function previousAlignmentIndex() {
        return (colAlignmentIndex - 1 + allAlignments.length) % allAlignments.length;
    }

    function changeAlignment(ev: MouseEvent) {
        col.alignment = allAlignments[ev.ctrlKey ? previousAlignmentIndex() : nextAlignmentIndex()];
    }
</script>

<div class="d-flex flex-row ps-2">
    <span class="fw-semibold text-nowrap text-truncate">{col.text}</span>
    <button
        type="button"
        class="btn btn-neutral btn-sm ms-auto"
        title="Click: Next alignment; Ctrl + Click: Previous alignment"
        onclick={changeAlignment}
    >
        <i class="bi bi-{alignmentIcon}"></i>
    </button>
    <button class="btn btn-neutral btn-sm" onclick={() => col.pinned = !col.pinned}>
        <span title="Click to {col.pinned ? 'un' : ''}pin">
            <i class="bi bi-pin-{col.pinned ? 'fill' : 'angle'}"></i>
        </span>
    </button>
</div>
