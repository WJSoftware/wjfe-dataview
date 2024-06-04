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
            key: 'control',
            text: '',
            width: 4,
            resizable: false,
            pinned: true
        },
        {
            key: 'id',
            text: 'ID',
            width: 4,
            resizable: false,
            pinned: true
        },
        {
            key: 'first_name',
            text: 'First Name',
            width: 8,
            minWidth: 5,
            hidden: false
        },
        {
            key: 'last_name',
            text: 'Last Name',
            width: 8
        },
        {
            key: 'email',
            text: 'E-Mail',
            width: 12,
            pinned: true
        },
        {
            key: 'gender',
            text: 'Gender',
            width: 6.5,
            alignment: 'center'
        },
        {
            key: 'birth_date',
            text: 'Birth Date',
            width: 8,
            noTextWrap: true,
        },
        {
            key: 'country_code',
            text: 'Country Code',
            width: 9,
        },
        {
            key: 'credit_score',
            text: 'Credit Score',
            width: 8,
            alignment: 'end'
        },
        {
            key: 'net_worth',
            text: 'Net Worth',
            width: 9,
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
        <h1>WjDataView Demo Page</h1>
        <p>
            Use the toolbar to control various features of the data view control, such as row striping and highlighting.
        </p>
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-2"></div>
                <div class="col-lg-6 col-md-8">
                    <div class="alert alert-info mb-0 d-flex flex-row flex-nowrap gap-3">
                        <i class="bi bi-lightbulb-fill"></i>
                        <pre class="mb-0">npm i @wjfe/dataview

import &#123; WjDataView &#125; from '@wjfe/dataview';
                        </pre>
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
                rowHighlight={demoOptions.rowHighlight}
                rowSelectionBg={demoOptions.rowSelectionBg}
                class="position-absolute top-0 bottom-0"
            >
                {#snippet headerCell(col)}
                    {#if col.key === 'control'}
                    <div class="ps-2">
                        <input
                        type="checkbox"
                        class="form-check-input"
                        indeterminate="{allSelected === null}"
                        checked={!!allSelected}
                        oninput="{ev => selectAllData(ev.currentTarget.checked)}"
                        >
                    </div>
                    {:else}
                        <div class="d-flex flex-row ps-2">
                            <span class="fw-semibold text-nowrap text-truncate">{col.text}</span>
                            <button class="btn btn-sm ms-auto" onclick={() => col.pinned = !col.pinned}>
                                <span title="Click to {col.pinned ? 'un' : ''}pin">
                                    <i class="bi bi-pin-{col.pinned ? 'fill' : 'angle'}"></i>
                                </span>
                            </button>
                        </div>
                    {/if}
                {/snippet}
                {#snippet dataCell(col, row)}
                    {#if col.key === 'control'}
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
                    {:else}
                        <div class="data px-2 text-truncate">
                            {#if col.key === 'credit_score' || col.key === 'net_worth'}
                                {@render Numeric(row[col.key])}
                            {:else}
                                {row[col.key as keyof typeof row]}
                            {/if}
                        </div>
                    {/if}
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
</style>