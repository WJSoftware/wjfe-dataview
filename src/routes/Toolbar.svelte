<script lang="ts">
    import { demoOptions } from "./demoOptions.svelte.js";
    import { allThemes, getStockTheme, themeOptions } from "./themeOptions.svelte.js";

    const numRecordsOptions = [100, 200, 300, 400];
    let themeKey = $state('Bootstrap');
    const stockThemeKey = 'Stock';

    $effect(() => {themeOptions.currentTheme = themeKey === stockThemeKey ? getStockTheme() : allThemes[themeKey]; });
</script>

<div class="btn-toolbar py-3 gap-2">
    <button
        class="btn btn-sm btn-info"
        title="Click to show additional information"
        data-bs-toggle="offcanvas"
        data-bs-target="#helpCanvas"
    >
        <i class="bi bi-info-circle"></i>
    </button>
    <div class="btn-group btn-sm">
        <input type="checkbox" id="striped" bind:checked={demoOptions.striped} class="btn-check" />
        <label for="striped" class="btn btn-outline-primary">Striped</label>
        <input type="checkbox" id="rowHighlight" bind:checked={demoOptions.rowHighlight} class="btn-check" />
        <label for="rowHighlight" class="btn btn-outline-primary">Row Highlight</label>
        <input type="checkbox" id="rowSelectionBg" bind:checked={demoOptions.rowSelectionBg} class="btn-check" />
        <label for="rowSelectionBg" class="btn btn-outline-primary">Row Selection BG</label>
    </div>
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
</div>
