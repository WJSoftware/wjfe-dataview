<script lang="ts">
    import WjDataView, { defineData, type WjDvColumn } from '$lib/WjDataView.svelte';
    import WjDataViewTheme from '$lib/WjDataViewTheme.svelte';
    import type { GeoSaleByCountry, GeoSaleColumn } from '../../data-models.js';
    import EditInGitHub from '../../demolib/EditInGitHub.svelte';
    import { globalOptions } from '../../demolib/GlobalOptions.svelte.js';
    import { amountFormatterFactory, currencyFormatter } from '../../demolib/numberFormatters.js';
    import Numeric from '../../demolib/Numeric.svelte';
    import { themeOptions } from '../../demolib/themeOptions.svelte.js';
    import type { PageData } from './$types.js';
    import ByCityView from './ByCityView.svelte';
    import Cell from './Cell.svelte';
    import { dataViewOptions } from './dataViewOptions.js';
    import DrilldownButton from './DrilldownButton.svelte';
    import FirstLevelInfo from './FirstLevelInfo.svelte';
    import HeaderCell from './HeaderCell.svelte';
    import SecondLevelInfo from './SecondLevelInfo.svelte';
    import ThirdLevelInfo from './ThirdLevelInfo.svelte';
    import Toolbar from './Toolbar.svelte';

    type Props = {
        data: PageData;
    };
    
    let {
        data
    }: Props = $props();

    let dvOptions = $state(dataViewOptions());
    let columns1 = $state<WjDvColumn<GeoSaleByCountry, GeoSaleColumn>[]>([
        {
            key: 'country',
            text: 'Country',
            get: getCountry,
        },
        {
            key: 'sales_amount',
            text: 'Total Amount',
            alignment: 'end',
            dataType: 'real-amount',
            numberFormatter: amountFormatterFactory(2),
        },
        {
            key: 'quantity_sold',
            text: 'Total Quantity',
            alignment: 'end',
            dataType: 'int-amount',
            numberFormatter: amountFormatterFactory(0),
        },
        {
            key: 'total_sales',
            text: 'Total Sales',
            alignment: 'end',
            dataType: 'currency',
            numberFormatter: currencyFormatter,
        },
        {
            key: 'total_costs',
            text: 'Total Costs',
            alignment: 'end',
            dataType: 'currency',
            numberFormatter: currencyFormatter,
        },
    ]);
    let data1 = $state(defineData(data.byCountry, m => m.country_code));

    function getCountry(record: { country_code: string; country_name: string; }) {
        return `${record['country_name']} (${record['country_code']})`;
    }
</script>

<hgroup class="mb-3">
    <h1>WjDataView Demo</h1>
    <h4>Worldwide Sales Data Rollup</h4>
</hgroup>
<div class="d-flex flex-column flex-fill">
    <Toolbar bind:options={dvOptions} title="Global Overview" moreInfoTarget="firstLevelCanvas">
        <div class="input-group input-group-sm">
            <span class="input-group-text" title="Drilldown:"><i class="bi bi-bar-chart-steps"></i></span>
            <input type="checkbox" id="noViewportInChildren" class="btn-check" bind:checked={globalOptions.noViewportInChildren}>
            <label
                for="noViewportInChildren"
                class="btn btn-outline-primary btn-sm"
                title="No viewports in children"
            >
                <i class="bi bi-eye-slash"></i>
            </label>
        </div>
    </Toolbar>
    <div
        class="flex-fill position-relative"
    >
        <WjDataViewTheme theme={themeOptions.currentTheme}>
            <WjDataView
                bind:columns={columns1}
                bind:data={data1}
                striped={dvOptions.striping}
                rowTracking={dvOptions.rowTracking}
                rowSelectionHighlight={dvOptions.rowSelectionHighlight}
                gridLines={dvOptions.gridLines}
                defaultWidth={15}
                class="position-absolute top-0 bottom-0"
                controlColumn={{
                    width: 3,
                    alignment: 'center',
                }}
                style="z-index: 5"
            >
                {#snippet controlDataCell(ctx)}
                    <DrilldownButton bind:row={ctx.row} />
                {/snippet}
                {#snippet rowExpansion(ctx)}
                        <ByCityView
                            sourceData={data}
                            countryCode={ctx.row['country_code']}
                            countryName={ctx.row['country_name']}
                        />
                {/snippet}
                {#snippet headerCell(ctx)}
                        <HeaderCell bind:col={ctx.col} />
                {/snippet}
                {#snippet dataCell(ctx)}
                    <Cell>
                        {#if ctx.col.key === 'country'}
                            <img
                                style:height="1em"
                                src="https://countryflagsapi.netlify.app/flag/{ctx.row['country_code']}.svg"
                                alt="Country's flag"
                            >
                            {ctx.getFn(ctx.row)}
                        {:else if ctx.col.dataType !== 'string'}
                            <Numeric value={ctx.getFn(ctx.row)} formatter={ctx.col.numberFormatter} />
                        {:else}
                            {ctx.getFn(ctx.row)}
                        {/if}
                    </Cell>
                {/snippet}
            </WjDataView>
        </WjDataViewTheme>
        <EditInGitHub editUrl="https://github.com/WJSoftware/wjfe-dataview/blob/main/src/routes/sales/%2Bpage.svelte" />
    </div>
</div>
<FirstLevelInfo />
<SecondLevelInfo />
<ThirdLevelInfo />
