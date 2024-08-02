import { GridLines } from "$lib/WjDataView/WjDataView.svelte";
import type { WjDataViewOptions } from "./Toolbar.svelte";

export function dataViewOptions() {
    // return {
    //     gridLines: GridLines.None,
    //     rowSelectionHighlight: true,
    //     rowTracking: true,
    //     striping: true,
    // } as WjDataViewOptions;
    const newOpts = {} as WjDataViewOptions;
    newOpts.gridLines = GridLines.None;
    newOpts.rowSelectionHighlight = true;
    newOpts.rowTracking = true;
    newOpts.striping = true;
    return newOpts;
};
