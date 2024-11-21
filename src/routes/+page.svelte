<script lang="ts">
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import WjDataView, { type WjDvRow } from "$lib/WjDataView/WjDataView.svelte";
    import WjDataViewTheme from "$lib/WjDataViewTheme/WjDataViewTheme.svelte";
    import type { Person } from "../data-models.js";
    import AllColumnsDropdown from "../demolib/AllColumnsDropdown.svelte";
    import { demoOptions } from "../demolib/demoOptions.svelte.js";
    import EditInGitHub from "../demolib/EditInGitHub.svelte";
    import HeaderCell, { type HeaderColumn } from "../demolib/HeaderCell.svelte";
    import Numeric from "../demolib/Numeric.svelte";
    import { themeOptions } from "../demolib/themeOptions.svelte.js";
    import MoreInfo from "./MoreInfo.svelte";
    import Toolbar from "./Toolbar.svelte";

    let {
        data,
    }: {
        data: { data: WjDvRow<Person>[]; }
    } = $props();

    let gridData = $state([] as WjDvRow<Person>[]);

    $effect.pre(() => {
        gridData = data.data;
    });

    let columns = $state<HeaderColumn<Person>[]>([
        {
            key: 'id',
            text: 'ID',
            width: 5,
            resizable: false,
            pinned: true,
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'first_name',
            text: 'First Name',
            minWidth: 5,
            hidden: false,
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'last_name',
            text: 'Last Name',
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'full_name',
            text: 'Full Name',
            width: 9,
            get: (r) => `${r.gender === 'Female' ? 'Mrs.' : 'Mr.' } ${r.last_name}, ${r.first_name}`,
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'email',
            text: 'E-Mail',
            pinned: true,
            alignment: 'start',
            pinnedFunctions: {},
        },
        {
            key: 'gender',
            text: 'Gender',
            alignment: 'center',
            pinnedFunctions: {},
        },
        {
            key: 'birth_date',
            text: 'Birth Date',
            noTextWrap: true,
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
            key: 'credit_score',
            text: 'Credit Score',
            alignment: 'end',
            pinnedFunctions: {},
        },
        {
            key: 'net_worth',
            text: 'Net Worth',
            alignment: 'end',
            pinnedFunctions: {},
        },
    ]);

    const allSelected = $derived.by(() => {
        let oneSelected: boolean | null = null;
        let oneUnselected: boolean | null = null;
        for (let person of gridData) {
            if (person.wjdv.selected) {
                oneSelected = true;
            }
            if (!person.wjdv.selected) {
                oneUnselected = true;
            }
            if (oneSelected !== null && oneUnselected !== null) {
                // Indeterminate state.
                return null;
            }
        }
        return oneSelected === true;
    });

    $effect(() => reloadData(demoOptions.records));

    function reloadData(records: number) {
        if (($page.url.searchParams.get('records') ?? 200) == records) {
            return;
        }
        const url = new URL($page.url);
        url.searchParams.set('records', records.toString());
        goto(url);
    }

    function selectAllData(selected: boolean) {
        for (let person of gridData) {
            person.wjdv.selected = selected;
        }
    }
</script>

<div class="d-flex flex-column overflow-auto h-100 theme-def">
    <div>
        <hgroup>
            <h1>WjDataView</h1>
            <h4>Tabular Data Visualization</h4>
        </hgroup>
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-2"></div>
                <div class="col-lg-6 col-md-8">
                    <div class="alert alert-info mb-0 d-flex flex-row flex-nowrap gap-3">
                        <i class="bi bi-lightbulb-fill"></i>
                        <pre class="mb-0">npm i @wjfe/dataview

import &#123; WjDataView &#125; from '@wjfe/dataview';</pre>
                    </div>
                </div>
                <div class="col-lg-3 col-md-2"></div>
            </div>
        </div>
    </div>
    <MoreInfo />
    <Toolbar />
    <div
        class="flex-fill position-relative"
    >
        <WjDataViewTheme theme={themeOptions.currentTheme}>
            <WjDataView
                bind:columns
                bind:data={gridData}
                striped={demoOptions.striped}
                rowTracking={demoOptions.rowTracking}
                rowSelectionHighlight={demoOptions.rowSelectionHighlight}
                gridLines={demoOptions.gridLines}
                defaultWidth={15}
                class="position-absolute top-0 bottom-0"
                headerClass="header-background"
                controlColumn={{
                    width: 4,
                    minWidth: 4,
                    hidden: !demoOptions.showControlColumn,
                    headerClass: 'pinned-header',
                    dataClass: 'pinned-cell',
                }}
            >
                {#snippet controlHeaderCell()}
                    <div class="ps-2 d-flex flex-row flex-nowrap gap-1">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            indeterminate="{allSelected === null}"
                            checked={!!allSelected}
                            oninput="{ev => selectAllData(ev.currentTarget.checked)}"
                        >
                        <AllColumnsDropdown bind:columns />
                    </div>
                {/snippet}
                {#snippet controlDataCell(ctx)}
                    <div class="px-2 d-flex flex-row gap-1">
                        <!-- svelte-ignore binding_property_non_reactive -->
                        <input type="checkbox" class="form-check-input" bind:checked={ctx.row.wjdv.selected}>
                        <button
                            type="button"
                            class="btn btn-sm btn-neutral"
                            onclick={() => ctx.row.wjdv.expanded = !ctx.row.wjdv.expanded}
                            aria-label={ctx.row.wjdv.expanded ? 'contract' : 'expand'}
                        >
                            <i class="bi bi-chevron-bar-{ctx.row.wjdv.expanded ? 'contract' : 'expand'}"></i>
                        </button>
                    </div>
                {/snippet}
                {#snippet headerCell(ctx)}
                    <!-- svelte-ignore binding_property_non_reactive -->
                    <HeaderCell bind:col={ctx.col} maxWidth="20em" />
                {/snippet}
                {#snippet dataCell(ctx)}
                    <div class="data px-2" class:text-truncate={ctx.col.noTextWrap}>
                        {#if ctx.col.key === 'credit_score' || ctx.col.key === 'net_worth'}
                            <Numeric value={ctx.row[ctx.col.key]} />
                        {:else}
                            {ctx.getFn(ctx.row)}
                        {/if}
                    </div>
                {/snippet}
                {#snippet rowExpansion(ctx)}
                    <div class="card mx-3 my-2">
                        <h4 class="card-header">Data Drilldown</h4>
                        <div class="card-body">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero voluptatibus libero laboriosam nisi explicabo quia ab nam mollitia, rem beatae soluta inventore doloribus. Iure omnis saepe blanditiis, fugit voluptates, sit eaque perferendis minima doloremque ea quia dolores hic ipsam! Odit esse voluptatibus minus corrupti harum, mollitia, temporibus corporis quam enim velit vitae eaque? Dolor sunt laudantium possimus ea iusto quam suscipit exercitationem dicta? Id reiciendis iusto magni vitae animi corrupti illum quaerat nisi repudiandae enim, saepe officiis ab cupiditate in, aliquid totam incidunt dolores nam recusandae at sequi ipsa? Ipsa, placeat! Debitis maiores quos eum nihil ducimus eligendi eaque.</p>
                            <p>To see an actual data drill-down scenario, visit the <a href="{base}/sales">sales demo page</a>.</p>
                        </div>
                    </div>
                {/snippet}
            </WjDataView>
        </WjDataViewTheme>
        <EditInGitHub editUrl="https://github.com/WJSoftware/wjfe-dataview/blob/main/src/routes/%2Bpage.svelte" />
    </div>
</div>

<style lang="scss">
    :global(.header-background) {
        box-shadow: 0 9999px 9999px rgba(0, 0, 0, 0.1) inset;
    }
    :global(.pinned-header) {
        box-shadow: 0 9999px 9999px rgba(5, 128, 102, 0.25) inset;
    }
    :global(.pinned-cell) {
        box-shadow: 0 9999px 9999px rgba(13, 174, 139, 0.05) inset;
    }
</style>