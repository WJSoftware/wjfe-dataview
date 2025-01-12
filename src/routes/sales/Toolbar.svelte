<script module lang="ts">
    export type WjDataViewOptions = {
        rowTracking: boolean;
        rowSelectionHighlight: boolean;
        striping: boolean;
        gridLines: GridLinesEnum;
        fillerPattern: WjDataViewProps['fillerPattern'];
    };
</script>

<script lang="ts">
    import { nextControlId } from '$lib/utils.js';
    import { GridLines, type GridLinesEnum, type WjDataViewProps } from '$lib/WjDataView/WjDataView.svelte';
    import type { Snippet } from 'svelte';

    type Props = {
        options: WjDataViewOptions;
        moreInfoTarget?: string;
        children?: Snippet;
    };

    let { options = $bindable(), moreInfoTarget, children }: Props = $props();

    let grid_lines = $state<GridLinesEnum[]>([]);
    const ctrlId = nextControlId();

    $effect.pre(() => {
        options.gridLines = grid_lines.reduce((p, c) => (p | c) as GridLinesEnum, GridLines.None);
    });
</script>

<div class="btn-toolbar my-2 py-1 px-1 gap-2 border border-1 rounded">
    {#if moreInfoTarget}
        <button
            type="button"
            class="btn btn-sm btn-info"
            title="Click to show additional information"
            aria-label="Click to show additional information"
            data-bs-toggle="offcanvas"
            data-bs-target="#{moreInfoTarget}"
        >
            <i class="bi bi-info-circle"></i>
        </button>
    {/if}
    <div class="input-group input-group-sm">
        <span class="input-group-text" title="Row Options:"><i class="bi bi-list-check"></i></span>
        <div class="btn-group btn-group-sm">
            <input type="checkbox" id="{ctrlId}_striped" bind:checked={options.striping} class="btn-check" />
            <label for="{ctrlId}_striped" class="btn btn-outline-primary rounded-0">Striped</label>
            <input type="checkbox" id="{ctrlId}_rowTracking" bind:checked={options.rowTracking} class="btn-check" />
            <label for="{ctrlId}_rowTracking" class="btn btn-outline-primary">Row Tracking</label>
            <input
                type="checkbox"
                id="{ctrlId}_rowSelectionHighlight"
                bind:checked={options.rowSelectionHighlight}
                class="btn-check"
            />
            <label for="{ctrlId}_rowSelectionHighlight" class="btn btn-outline-primary">Selection Highlight</label>
        </div>
    </div>
    <div class="input-group input-group-sm">
        <span title="Borders:" class="input-group-text"><i class="bi bi-border-all"></i></span>
        <div class="btn-group btn-group-sm">
            <input
                type="checkbox"
                id="{ctrlId}_rowGridLine"
                class="btn-check"
                value={GridLines.Row}
                bind:group={grid_lines}
            />
            <label for="{ctrlId}_rowGridLine" class="btn btn-outline-primary rounded-0" title="Row borders">
                <i class="bi bi-border-bottom"></i>
            </label>
            <input
                type="checkbox"
                id="{ctrlId}_colGridLine"
                class="btn-check"
                value={GridLines.Column}
                bind:group={grid_lines}
            />
            <label for="{ctrlId}_colGridLine" class="btn btn-outline-primary" title="Column borders">
                <i class="bi bi-border-right"></i>
            </label>
        </div>
    </div>
    <div class="input-group input-group-sm">
        <span title="Filler Pattern:" class="input-group-text"><i class="bi bi-sign-dead-end-fill"></i></span>
        <div class="btn-group btn-group-sm">
            <input
                type="radio"
                class="btn-check"
                id="{ctrlId}_fillerPatternCheckered"
                value="checkered"
                bind:group={options.fillerPattern}
            />
            <label for="{ctrlId}_fillerPatternCheckered" class="btn btn-outline-primary rounded-0" title="Checkered">
                Checkered
            </label>
            <input
                type="radio"
                class="btn-check"
                id="{ctrlId}_fillerPatternTriangles"
                value="triangles"
                bind:group={options.fillerPattern}
            />
            <label for="{ctrlId}_fillerPatternTriangles" class="btn btn-outline-primary" title="Triangles">
                Triangles
            </label>
            <input
                type="radio"
                class="btn-check"
                id="{ctrlId}_fillerPatternDiagonals"
                value="diagstriped"
                bind:group={options.fillerPattern}
            />
            <label for="{ctrlId}_fillerPatternDiagonals" class="btn btn-outline-primary" title="Diagonals">
                Diagonals
            </label>
        </div>
    </div>
    {@render children?.()}
</div>
