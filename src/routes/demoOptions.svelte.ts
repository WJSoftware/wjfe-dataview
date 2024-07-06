import { GridBorders } from "$lib/WjDataView.svelte";

export const demoOptions = $state({
    striped: true,
    rowHighlight: true,
    rowSelectionBg: true,
    records: 200,
    borders: [] as GridBorders[],
    get gridBorders() {
        return this.borders.reduce((p, c) => p | c, GridBorders.None);
    }
});
