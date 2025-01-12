<script lang="ts">
    import WjDataView, { defineData } from '$lib/WjDataView/WjDataView.svelte';
    import WjDataViewTheme from '$lib/WjDataViewTheme/WjDataViewTheme.svelte';
    import AllColumnsDropdown from '../../demolib/AllColumnsDropdown.svelte';
    import EditInGitHub from '../../demolib/EditInGitHub.svelte';
    import { globalOptions } from '../../demolib/GlobalOptions.svelte.js';
    import HeaderCell from '../../demolib/HeaderCell.svelte';
    import Numeric from '../../demolib/Numeric.svelte';
    import { themeOptions } from '../../demolib/themeOptions.svelte.js';
    import type { PageData } from './$types.js';
    import ByCityView from './ByCityView.svelte';
    import Cell from './Cell.svelte';
    import { salesColumns } from './columnHierarchy.svelte.js';
    import DataViewCaption from './DataViewCaption.svelte';
    import { dataViewOptions } from './dataViewOptions.js';
    import DrilldownButton from './DrilldownButton.svelte';
    import FirstLevelInfo from './FirstLevelInfo.svelte';
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
    let data1 = $state(defineData(data.byCountry, m => m.country_code));
</script>

<hgroup class="mb-3">
    <h1>WjDataView Demo</h1>
    <h4>Worldwide Sales Data Rollup</h4>
</hgroup>
<div class="d-flex flex-column flex-fill">
    <Toolbar bind:options={dvOptions} moreInfoTarget="firstLevelCanvas">
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
                bind:columns={salesColumns.master}
                bind:data={data1}
                striped={dvOptions.striping}
                rowTracking={dvOptions.rowTracking}
                rowSelectionHighlight={dvOptions.rowSelectionHighlight}
                gridLines={dvOptions.gridLines}
                fillerPattern={dvOptions.fillerPattern}
                defaultWidth={15}
                class="position-absolute top-0 bottom-0"
                controlColumn={{
                    width: 3,
                    resizable: false,
                    alignment: 'center',
                    pinnedFunctions: {},
                }}
                style="z-index: 5"
            >
                {#snippet caption()}
                    <DataViewCaption title="Global Overview" />
                {/snippet}
                {#snippet controlHeaderCell()}
                    <AllColumnsDropdown bind:columns={salesColumns.master} />
                {/snippet}
                {#snippet controlDataCell(ctx)}
                    <!-- svelte-ignore binding_property_non_reactive -->
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
                    <!-- svelte-ignore binding_property_non_reactive -->
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
