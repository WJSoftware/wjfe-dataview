<script lang="ts">
    import WjDataView, { defineData, GridLines, type WjDvColumn } from "$lib/WjDataView/WjDataView.svelte";
    import type { GeoSale, GeoSaleColumn, GeoSalesResult } from "../../data-models.js";
    import { globalOptions } from "../../demolib/GlobalOptions.svelte.js";
    import { amountFormatterFactory, currencyFormatter, fractionFormatter } from "../../demolib/numberFormatters.js";
    import Numeric from "../../demolib/Numeric.svelte";
    import Cell from "./Cell.svelte";
    import DataViewCaption from "./DataViewCaption.svelte";
    import HeaderCell from "./HeaderCell.svelte";
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

    let columns = $state<WjDvColumn<GeoSale, GeoSaleColumn>[]>([
        {
            key: 'id',
            text: 'ID',
        },
        {
            key: 'country_code',
            text: 'Country Code',
        },
        {
            key: 'country_name',
            text: 'Country',
        },
        {
            key: 'city',
            text: 'City',
        },
        {
            key: 'month',
            text: 'Month',
        },
        {
            key: 'year',
            text: 'Year',
        },
        {
            key: 'sales_amount',
            text: 'Sales Amount',
            dataType: 'real-amount',
            numberFormatter: amountFormatterFactory(2),
            alignment: 'end',
        },
        {
            key: 'product_category',
            text: 'Product Category',
            width: 12,
        },
        {
            key: 'quantity_sold',
            text: 'Quantity Sold',
            dataType: 'int-amount',
            numberFormatter: amountFormatterFactory(0),
            alignment: 'end',
        },
        {
            key: 'total_sales',
            text: 'Total Sales',
            dataType: 'currency',
            numberFormatter: currencyFormatter,
            alignment: 'end',
        },
        {
            key: 'total_costs',
            text: 'Total Costs',
            dataType: 'currency',
            numberFormatter: currencyFormatter,
            alignment: 'end',
        },
        {
            key: 'top_client',
            text: 'Top Client',
        },
        {
            key: 'top_client_fraction',
            text: 'Top Client Fraction',
            width: 13,
            dataType: 'real-amount',
            numberFormatter: fractionFormatter,
            alignment: 'center'
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
    class="mb-5"
>
    {#snippet caption()}
        <DataViewCaption title="Raw Data: {city}" />
    {/snippet}
    {#snippet headerCell(ctx)}
        <!-- svelte-ignore binding_property_non_reactive -->
        <HeaderCell bind:col={ctx.col} />
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
