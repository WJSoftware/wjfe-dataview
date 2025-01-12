<script lang="ts">
    import WjDataView, { defineData, GridLines } from "$lib/WjDataView/WjDataView.svelte";
    import type { GeoSalesResult } from "../../data-models.js";
    import AllColumnsDropdown from "../../demolib/AllColumnsDropdown.svelte";
    import { globalOptions } from "../../demolib/GlobalOptions.svelte.js";
    import HeaderCell from "../../demolib/HeaderCell.svelte";
    import Numeric from "../../demolib/Numeric.svelte";
    import Cell from "./Cell.svelte";
    import { salesColumns } from "./columnHierarchy.svelte.js";
    import DataViewCaption from "./DataViewCaption.svelte";
    import DetailedView from "./DetailedView.svelte";
    import DrilldownButton from "./DrilldownButton.svelte";
    import { type WjDataViewOptions } from "./Toolbar.svelte";

    type Props = {
        sourceData: GeoSalesResult;
        countryCode: string;
        countryName: string;
    };

    let {
        sourceData,
        countryCode,
        countryName,
    }: Props = $props();

    let data = $state(defineData(
        sourceData.byCity.filter(r => r.country_code === countryCode),
        r => `${r.country_code}_${r.city}`
    ));
    let dvOptions = $state<WjDataViewOptions>({
        gridLines: GridLines.None,
        rowSelectionHighlight: true,
        rowTracking: true,
        striping: true,
        fillerPattern: 'diagstriped',
    });
</script>

<WjDataView
    bind:columns={salesColumns.byCity}
    bind:data
    noViewport={globalOptions.noViewportInChildren}
    rowTracking={dvOptions.rowTracking}
    rowSelectionHighlight={dvOptions.rowSelectionHighlight}
    striped={dvOptions.striping}
    gridLines={dvOptions.gridLines}
    fillerPattern={dvOptions.fillerPattern}
    defaultWidth={12}
    controlColumn={{
        width: 3,
        alignment: 'center',
        resizable: false,
        pinnedFunctions: {},
    }}
    class="mb-5"
    style="z-index: 5"
>
    {#snippet caption()}
        <DataViewCaption title="Per-City Summary: {countryName}" bind:dvOptions moreInfoTarget="secondLevelCanvas" />
    {/snippet}
    {#snippet headerCell(ctx)}
        <!-- svelte-ignore binding_property_non_reactive -->
        <HeaderCell bind:col={ctx.col} />
    {/snippet}
    {#snippet dataCell(ctx)}
        <Cell>
            {#if ctx.col.dataType !== 'string'}
                <Numeric value={ctx.getFn(ctx.row)} formatter={ctx.col.numberFormatter} />
            {:else}
                {ctx.getFn(ctx.row)}
            {/if}
        </Cell>
    {/snippet}
    {#snippet controlHeaderCell()}
        <AllColumnsDropdown bind:columns={salesColumns.byCity} />
    {/snippet}
    {#snippet controlDataCell(ctx)}
        <!-- svelte-ignore binding_property_non_reactive -->
        <DrilldownButton bind:row={ctx.row} />
    {/snippet}
    {#snippet rowExpansion(ctx)}
        <DetailedView {sourceData} {countryCode} city={ctx.row.city} />
    {/snippet}
</WjDataView>
<hr class="border-3" />
