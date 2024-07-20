import { GridLines } from "$lib/WjDataView.svelte";

export const demoOptions = $state({
    striped: true,
    rowTracking: true,
    rowSelectionHighlight: true,
    records: 200,
    grid_lines: [] as GridLines[],
    get gridLines() {
        return this.grid_lines.reduce((p, c) => p | c, GridLines.None);
    },
    showControlColumn: true,
});
