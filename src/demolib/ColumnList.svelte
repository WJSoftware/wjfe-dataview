<script module lang="ts">
    export type Column = { key: string; text: string; hidden?: boolean };
</script>

<script lang="ts">
    import { nextControlId } from '$lib/utils.js';

    type Props = {
        columns: Column[];
        newColumnThreshold?: number;
        maxColumns?: number;
        onClose?: () => void;
    };

    let { columns = $bindable(), newColumnThreshold = 5, maxColumns = 4, onClose }: Props = $props();

    let thisId = nextControlId();
    let numColumns = $derived(
        Math.min(
            maxColumns,
            Math.floor(columns.length / newColumnThreshold) + (columns.length % newColumnThreshold !== 0 ? 1 : 0),
        ),
    );
    let numRows = $derived(Math.floor(columns.length / numColumns) + (columns.length % numColumns !== 0 ? 1 : 0));
</script>

<div class="d-flex flex-row flex-nowrap px-4 pt-2 align-items-baseline">
    <h6 class="me-3">Available Columns</h6>
    <button
        type="button"
        class="btn btn-sm btn-secondary ms-auto me-2"
        onclick={() => columns.forEach((c) => (c.hidden = false))}>Select all</button
    >
    <button type="button" class="btn-close align-self-center" aria-label="Close" onclick={() => onClose?.()}></button>
</div>
<div class="px-4 py-2">
    <table class="table table-sm table-borderless">
        <tbody>
            {#each { length: numRows } as _, rowIndex}
                <tr>
                    {#each { length: numColumns } as _, colIndex}
                        {@const remainder = columns.length % numColumns}
                        {@const remainderConsumed = colIndex >= remainder}
                        {@const col =
                            remainderConsumed && remainder > 0 && rowIndex + 1 === numRows
                                ? undefined
                                : columns[
                                      (remainderConsumed ? remainder : colIndex) * numRows +
                                          (remainderConsumed ? colIndex - remainder : 0) *
                                              (numRows - (remainder > 0 ? 1 : 0)) +
                                          rowIndex
                                  ]}
                        <td>
                            {#if col}
                                <input
                                    type="checkbox"
                                    class="form-check-input"
                                    id="{thisId}_{col.key}"
                                    bind:checked={() => !col.hidden, (v) => (col.hidden = !v)}
                                />
                                <label for="{thisId}_{col.key}" class="me-3">{col.text}</label>
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    table {
        --bs-table-bg: transparent;
    }
</style>
