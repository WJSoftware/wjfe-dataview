<script lang="ts">
    import WjDataView, { defineData, GridLines } from '$lib/WjDataView/WjDataView.svelte';
    import type { GeoSalesResult } from '../../data-models.js';
    import AllColumnsDropdown from '../../demolib/AllColumnsDropdown.svelte';
    import { globalOptions } from '../../demolib/GlobalOptions.svelte.js';
    import HeaderCell from '../../demolib/HeaderCell.svelte';
    import Numeric from '../../demolib/Numeric.svelte';
    import Cell from './Cell.svelte';
    import { salesColumns } from './columnHierarchy.svelte.js';
    import DataViewCaption from './DataViewCaption.svelte';
    import type { WjDataViewOptions } from './Toolbar.svelte';
    import Toolbar from './Toolbar.svelte';

    type Props = {
        sourceData: GeoSalesResult;
        countryCode: string;
        city: string;
    };

    let { sourceData, countryCode, city }: Props = $props();

    let data = $state(defineData(sourceData.detail.filter((r) => r.country_code === countryCode && r.city === city)));
    let dvOptions = $state<WjDataViewOptions>({
        gridLines: GridLines.None,
        rowSelectionHighlight: true,
        rowTracking: true,
        striping: true,
        fillerPattern: 'diagstriped',
    });
</script>

<Toolbar bind:options={dvOptions} moreInfoTarget="thirdLevelCanvas" />
<WjDataView
    bind:columns={salesColumns.detailed}
    bind:data
    noViewport={globalOptions.noViewportInChildren}
    rowTracking={dvOptions.rowTracking}
    rowSelectionHighlight={dvOptions.rowSelectionHighlight}
    striped={dvOptions.striping}
    gridLines={dvOptions.gridLines}
    fillerPattern={dvOptions.fillerPattern}
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
        <AllColumnsDropdown bind:columns={salesColumns.detailed} />
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
