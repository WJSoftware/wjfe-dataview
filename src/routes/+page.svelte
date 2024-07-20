<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import WjDataView, { type WjDvColumn, type WjDvRow } from "$lib/WjDataView.svelte";
    import WjDataViewTheme from "$lib/WjDataViewTheme.svelte";
    import type { Person } from "../data-models.js";
    import MoreInfo from "./MoreInfo.svelte";
    import Toolbar from "./Toolbar.svelte";
    import { demoOptions } from "./demoOptions.svelte.js";
    import { themeOptions } from "./themeOptions.svelte.js";

    let {
        data,
    }: {
        data: { data: WjDvRow<Person>[]; }
    } = $props();

    let columns = $state<WjDvColumn<Person>[]>([
        {
            key: 'id',
            text: 'ID',
            width: 5,
            resizable: false,
            pinned: true
        },
        {
            key: 'first_name',
            text: 'First Name',
            minWidth: 5,
            hidden: false
        },
        {
            key: 'last_name',
            text: 'Last Name',
        },
        {
            key: 'email',
            text: 'E-Mail',
            pinned: true
        },
        {
            key: 'gender',
            text: 'Gender',
            alignment: 'center'
        },
        {
            key: 'birth_date',
            text: 'Birth Date',
            noTextWrap: true,
        },
        {
            key: 'country_code',
            text: 'Country Code',
        },
        {
            key: 'credit_score',
            text: 'Credit Score',
            alignment: 'end'
        },
        {
            key: 'net_worth',
            text: 'Net Worth',
            alignment: 'end'
        },
    ]);

    const allSelected = $derived.by(() => {
        let oneSelected: boolean | null = null;
        let oneUnselected: boolean | null = null;
        for (let person of data.data) {
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
        for (let person of data.data) {
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
                bind:data={data.data}
                striped={demoOptions.striped}
                rowTracking={demoOptions.rowTracking}
                rowSelectionHighlight={demoOptions.rowSelectionHighlight}
                gridBorders={demoOptions.gridBorders}
                defaultWidth={15}
                class="position-absolute top-0 bottom-0"
                controlColumn={demoOptions.showControlColumn ? ({
                    definition: {
                        width: 4,
                        minWidth: 4
                    },
                    headerCell: controlHeaderCell,
                    dataCell: controlDataCell
                }) : undefined}
            >
                {#snippet headerCell(col)}
                    <div class="d-flex flex-row ps-2">
                        <span class="fw-semibold text-nowrap text-truncate">{col.text}</span>
                        <button class="btn btn-sm ms-auto" onclick={() => col.pinned = !col.pinned}>
                            <span title="Click to {col.pinned ? 'un' : ''}pin">
                                <i class="bi bi-pin-{col.pinned ? 'fill' : 'angle'}"></i>
                            </span>
                        </button>
                    </div>
                {/snippet}
                {#snippet dataCell(col, row)}
                    <div class="data px-2 text-truncate">
                        {#if col.key === 'credit_score' || col.key === 'net_worth'}
                            {@render Numeric(row[col.key])}
                        {:else}
                            {row[col.key as keyof typeof row]}
                        {/if}
                    </div>
                {/snippet}
                {#snippet rowExpansion(row)}
                    <div class="card mx-3 my-2">
                        <h4 class="card-header">Data Drilldown</h4>
                        <div class="card-body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero voluptatibus libero laboriosam nisi explicabo quia ab nam mollitia, rem beatae soluta inventore doloribus. Iure omnis saepe blanditiis, fugit voluptates, sit eaque perferendis minima doloremque ea quia dolores hic ipsam! Odit esse voluptatibus minus corrupti harum, mollitia, temporibus corporis quam enim velit vitae eaque? Dolor sunt laudantium possimus ea iusto quam suscipit exercitationem dicta? Id reiciendis iusto magni vitae animi corrupti illum quaerat nisi repudiandae enim, saepe officiis ab cupiditate in, aliquid totam incidunt dolores nam recusandae at sequi ipsa? Ipsa, placeat! Debitis maiores quos eum nihil ducimus eligendi eaque.
                        </div>
                    </div>
                {/snippet}
            </WjDataView>
        </WjDataViewTheme>
        <a
            class="position-absolute bottom-0 end-0 rounded-circle btn btn-sm btn-secondary mb-3 me-3 semi-transparent"
            title="See an error?  Want to improve the demo?  Curious about the source code?  View/edit this page in GitHub."
            href="https://github.com/WJSoftware/wjfe-dataview/blob/main/src/routes/%2Bpage.svelte"
            target="_blank"
        >
            <i class="bi bi-pencil"></i>
        </a>
    </div>
</div>

{#snippet Numeric(value: number)}
    {@const formatter = new Intl.NumberFormat(browser ? navigator?.language : undefined, { maximumFractionDigits: 4 })}
    <span class="numeric">{formatter.format(value)}</span>

    <style>
        span.numeric {
            font-family: monospace;
        }
    </style>
{/snippet}

{#snippet controlHeaderCell()}
    <div class="ps-2">
        <input
        type="checkbox"
        class="form-check-input"
        indeterminate="{allSelected === null}"
        checked={!!allSelected}
        oninput="{ev => selectAllData(ev.currentTarget.checked)}"
        >
    </div>
{/snippet}

{#snippet controlDataCell(row, rowIndex)}
    <div class="px-2 d-flex flex-row gap-1">
        <input
            type="checkbox"
            class="form-check-input"
            bind:checked={row.wjdv.selected}
        >
        <button
            type="button"
            class="btn btn-sm btn-neutral"
            onclick={() => row.wjdv.expanded = !row.wjdv.expanded}
        >
            <i class="bi bi-chevron-bar-{row.wjdv.expanded ? 'contract' : 'expand'}"></i>
        </button>
    </div>
{/snippet}

<style lang="scss">
    .theme-def {
        --wjdv-sky-bg-rgb: 200, 240, 250;
        --wjdv-sky-color: var(--bs-black);
        --bs-row-selection-bg-color-rgb: 221, 235, 255;
        
        :global([data-bs-theme="dark"]) & {
            --wjdv-sky-bg-rgb: 30, 90, 120;
            --wjdv-sky-color: var(--bs-white);
            --bs-row-selection-bg-color-rgb: 21, 35, 55;
        }
    }

    .semi-transparent {
        opacity: 0.4;
        &:hover {
            opacity: 1;
        }
    }
</style>