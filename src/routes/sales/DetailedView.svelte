<script lang="ts">
    import WjDataView, { defineData, GridLines } from "$lib/WjDataView/WjDataView.svelte";
    import type { GeoSale, GeoSaleColumn, GeoSalesResult } from "../../data-models.js";
    import AllColumnsDropdown from "../../demolib/AllColumnsDropdown.svelte";
    import { globalOptions } from "../../demolib/GlobalOptions.svelte.js";
    import HeaderCell, { type HeaderColumn } from "../../demolib/HeaderCell.svelte";
    import { amountFormatterFactory, currencyFormatter, fractionFormatter } from "../../demolib/numberFormatters.js";
    import Numeric from "../../demolib/Numeric.svelte";
    import Cell from "./Cell.svelte";
    import DataViewCaption from "./DataViewCaption.svelte";
    import type { WjDataViewOptions } from "./Toolbar.svelte";
    import Toolbar from "./Toolbar.svelte";

    type Props = {
        sourceData: GeoSalesResult;
        countryCode: string;
        city: string;
    };

    let {
        sourceData,
        countryCode,
        city,
    }: Props = $props();

    let columns = $state<HeaderColumn<GeoSale, GeoSaleColumn>[]>([
        {
            key: 'id',
            text: 'ID',
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'country_code',
            text: 'Country Code',
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'country_name',
            text: 'Country',
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'city',
            text: 'City',
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'month',
            text: 'Month',
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'year',
            text: 'Year',
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'sales_amount',
            text: 'Sales Amount',
            dataType: 'real-amount',
            numberFormatter: amountFormatterFactory(2),
            alignment: 'end',
            pinnedFunctions: {},
        },
        {
            key: 'product_category',
            text: 'Product Category',
            width: 12,
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'quantity_sold',
            text: 'Quantity Sold',
            dataType: 'int-amount',
            numberFormatter: amountFormatterFactory(0),
            alignment: 'end',
            pinnedFunctions: {},
        },
        {
            key: 'total_sales',
            text: 'Total Sales',
            dataType: 'currency',
            numberFormatter: currencyFormatter,
            alignment: 'end',
            pinnedFunctions: {},
        },
        {
            key: 'total_costs',
            text: 'Total Costs',
            dataType: 'currency',
            numberFormatter: currencyFormatter,
            alignment: 'end',
            pinnedFunctions: {},
        },
        {
            key: 'top_client',
            text: 'Top Client',
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'top_client_fraction',
            text: 'Top Client Fraction',
            width: 13,
            dataType: 'real-amount',
            numberFormatter: fractionFormatter,
            alignment: 'center',
            pinnedFunctions: {},
        },
    ]);
    let data = $state(defineData(
        sourceData.detail.filter(r => r.country_code === countryCode && r.city === city)
    ));
    let dvOptions = $state<WjDataViewOptions>({
        gridLines: GridLines.None,
        rowSelectionHighlight: true,
        rowTracking: true,
        striping: true,
    });
</script>

<Toolbar bind:options={dvOptions} moreInfoTarget="thirdLevelCanvas" />
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
        pinnedFunctions: {},
        alignment: 'start',
        width: 3,
        resizable: false,
    }}
    class="mb-5"
>
    {#snippet caption()}
        <DataViewCaption title="Raw Data: {city}" />
    {/snippet}
    {#snippet headerCell(ctx)}
        <!-- svelte-ignore binding_property_non_reactive -->
        <HeaderCell bind:col={ctx.col} />
    {/snippet}
    {#snippet controlHeaderCell()}
        <AllColumnsDropdown bind:columns />
    {/snippet}
    {#snippet dataCell(ctx)}
        <Cell>
            {#if ctx.col.numberFormatter}
                <Numeric value={ctx.getFn(ctx.row)} formatter={ctx.col.numberFormatter} />
            {:else}
                {ctx.getFn(ctx.row)}
            {/if}
        </Cell>
    {/snippet}
</WjDataView>
<hr class="border-3" />
