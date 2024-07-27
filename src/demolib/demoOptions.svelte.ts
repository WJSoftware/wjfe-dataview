import { GridLines, type GridLinesEnum } from "$lib/WjDataView.svelte";

export const demoOptions = $state({
    striped: true,
    rowTracking: true,
    rowSelectionHighlight: true,
    records: 200,
    grid_lines: [] as GridLinesEnum[],
    get gridLines() {
        return this.grid_lines.reduce((p, c) => (p | c) as GridLinesEnum, GridLines.None);
    },
    showControlColumn: true,
});
