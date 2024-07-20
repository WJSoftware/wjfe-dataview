<script lang="ts">
    import { GridLines } from "$lib/WjDataView.svelte";
    import { demoOptions } from "./demoOptions.svelte.js";
    import { allThemes, getStockTheme, themeOptions } from "./themeOptions.svelte.js";

    const numRecordsOptions = [100, 200, 300, 400];
    const stockThemeKey = 'Stock';
    let themeKey = $state('Bootstrap');

    $effect(() => {themeOptions.currentTheme = themeKey === stockThemeKey ? getStockTheme() : allThemes[themeKey]; });
</script>

<div class="btn-toolbar my-2 py-1 px-1 gap-2 border border-1 rounded">
    <span class="toolbar-name fw-bold px-2 py-1 rounded-start">Features</span>
    <button
        class="btn btn-sm btn-info"
        title="Click to show additional information"
        data-bs-toggle="offcanvas"
        data-bs-target="#helpCanvas"
    >
        <i class="bi bi-info-circle"></i>
    </button>
    <div class="input-group">
        <span class="input-group-text" title="Row Options:"><i class="bi bi-list-check"></i></span>
        <div class="btn-group btn-sm">
            <input type="checkbox" id="striped" bind:checked={demoOptions.striped} class="btn-check" />
            <label for="striped" class="btn btn-outline-primary rounded-0">Striped</label>
            <input type="checkbox" id="rowTracking" bind:checked={demoOptions.rowTracking} class="btn-check" />
            <label for="rowTracking" class="btn btn-outline-primary">Row Tracking</label>
            <input type="checkbox" id="rowSelectionHighlight" bind:checked={demoOptions.rowSelectionHighlight} class="btn-check" />
            <label for="rowSelectionHighlight" class="btn btn-outline-primary">Selection Highlight</label>
        </div>
    </div>
    <input type="checkbox" id="controlColumn" bind:checked={demoOptions.showControlColumn} class="btn-check" />
    <label for="controlColumn" class="btn btn-outline-primary">Control Column</label>
    <div class="input-group">
        <span class="input-group-text" title="Row Count:"><i class="bi bi-person-lines-fill"></i></span>
        <div class="btn-group btn-sm">
            {#each numRecordsOptions as nro, index (nro)}
                <input
                    type="radio"
                    id="numRecords_{nro}"
                    class="btn-check"
                    bind:group={demoOptions.records}
                    value={nro}
                />
                <label
                    for="numRecords_{nro}"
                    class="btn btn-outline-primary"
                    class:rounded-0={index === 0}
                >
                    {nro}
                </label>
            {/each}
        </div>
    </div>
    <div class="input-group">
        <div class="input-group-text">
            <span title="Theme:"><i class="bi bi-palette"></i></span>
        </div>
        <select class="form-control" bind:value={themeKey}>
            <option value={stockThemeKey}>{stockThemeKey}</option>
            {#each Object.keys(allThemes) as themeKey (themeKey)}
                <option value={themeKey}>{themeKey}</option>
            {/each}
        </select>
    </div>
    <div class="input-group">
        <span title="Borders:" class="input-group-text"><i class="bi bi-border-all"></i></span>
        <div class="btn-group btn-sm">
            <input type="checkbox" id="rowGridLine" class="btn-check" value={GridLines.Row} bind:group={demoOptions.grid_lines} />
            <label for="rowGridLine" class="btn btn-outline-primary rounded-0" title="Row borders">
                <i class="bi bi-border-bottom"></i>
            </label>
            <input type="checkbox" id="colGridLine" class="btn-check" value={GridLines.Column} bind:group={demoOptions.grid_lines} />
            <label for="colGridLine" class="btn btn-outline-primary" title="Column borders">
                <i class="bi bi-border-right"></i>
            </label>
        </div>
    </div>
</div>

<style lang="scss">
    .toolbar-name {
        background: linear-gradient(to right top, rgb(246, 121, 102), var(--bs-body-bg));
        :global([data-bs-theme="dark"]) & {
            background: linear-gradient(to right top, rgb(102, 30, 2), var(--bs-body-bg));
        }
    }
</style>