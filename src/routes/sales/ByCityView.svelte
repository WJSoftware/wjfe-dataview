<script lang="ts">
    import WjDataView, { defineData, GridLines } from "$lib/WjDataView/WjDataView.svelte";
    import type { GeoSaleByCity, GeoSaleColumn, GeoSalesResult } from "../../data-models.js";
    import AllColumnsDropdown from "../../demolib/AllColumnsDropdown.svelte";
    import { globalOptions } from "../../demolib/GlobalOptions.svelte.js";
    import HeaderCell, { type HeaderColumn } from "../../demolib/HeaderCell.svelte";
    import { amountFormatterFactory, currencyFormatter } from "../../demolib/numberFormatters.js";
    import Numeric from "../../demolib/Numeric.svelte";
    import Cell from "./Cell.svelte";
    import DataViewCaption from "./DataViewCaption.svelte";
    import DetailedView from "./DetailedView.svelte";
    import DrilldownButton from "./DrilldownButton.svelte";
    import Toolbar, { type WjDataViewOptions } from "./Toolbar.svelte";

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

    let columns = $state<HeaderColumn<GeoSaleByCity, GeoSaleColumn>[]>([
        {
            key: 'city',
            text: 'City',
            alignment: 'start',
            dataType: 'string',
            pinnedFunctions: {},
        },
        {
            key: 'sales_amount',
            text: 'Total Amount',
            alignment: 'end',
            dataType: 'real-amount',
            numberFormatter: amountFormatterFactory(2),
            pinnedFunctions: {},
        },
        {
            key: 'quantity_sold',
            text: 'Total Quantity',
            alignment: 'end',
            dataType: 'int-amount',
            numberFormatter: amountFormatterFactory(0),
            pinnedFunctions: {},
        },
        {
            key: 'total_sales',
            text: 'Total Sales',
            alignment: 'end',
            dataType: 'currency',
            numberFormatter: currencyFormatter,
            pinnedFunctions: {},
        },
        {
            key: 'total_costs',
            text: 'Total Costs',
            alignment: 'end',
            dataType: 'currency',
            numberFormatter: currencyFormatter,
            pinnedFunctions: {},
        },
    ]);
    let data = $state(defineData(
        sourceData.byCity.filter(r => r.country_code === countryCode),
        r => `${r.country_code}_${r.city}`
    ));
    let dvOptions = $state<WjDataViewOptions>({
        gridLines: GridLines.None,
        rowSelectionHighlight: true,
        rowTracking: true,
        striping: true,
    });
</script>

<Toolbar bind:options={dvOptions} moreInfoTarget="secondLevelCanvas" />
<WjDataView
    bind:columns
    bind:data
    noViewport={globalOptions.noViewportInChildren}
    rowTracking={dvOptions.rowTracking}
    rowSelectionHighlight={dvOptions.rowSelectionHighlight}
    striped={dvOptions.striping}
    gridLines={dvOptions.gridLines}
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
        <DataViewCaption title="Per-City Summary: {countryName}" />
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
        <AllColumnsDropdown bind:columns />
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
