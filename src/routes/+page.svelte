<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import WjDataView, { type WjDvColumn, type WjDvRow } from "$lib/WjDataView.svelte";
    import WjDataViewTheme from "$lib/WjDataViewTheme.svelte";
    import { stockDark, stockLight } from "$lib/stockTheme.js";
    import type { Person } from "../data-models.js";
    import { bootstrapTheme, mineralBlue, mineralGreen } from "./themes.js";

    let {
        data,
    }: {
        data: { data: PersonGridRow[]; }
    } = $props();



    type PersonGridRow = WjDvRow<Person>;

    const columns = $state<WjDvColumn<Record<string, any>, PersonGridRow>[]>([
        {
            key: 'id',
            text: 'ID',
            width: 4,
            pinned: true
        },
        {
            key: 'first_name',
            text: 'First Name',
            width: 8,
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
    let striped = $state(true);
    let rowHighlight = $state(true);

    const numRecordsOptions = [100, 200, 300, 400];
    let numRecords = $state(+($page.url.searchParams.get('records') ?? '200'));

    $effect(() => reloadData(numRecords));

    function reloadData(records: number) {
        const url = new URL($page.url);
        url.searchParams.set('records', records.toString());
        goto(url);
    }
</script>

<div class="d-flex flex-column overflow-auto h-100">
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
                        <pre class="mb-0">npm i @wj/dataview

import &#123; WjDataView &#125; from '@wj/dataview';
                        </pre>
                    </div>
                </div>
                <div class="col-lg-3 col-md-2"></div>
            </div>
        </div>
    </div>
    <div class="btn-toolbar py-3 gap-2">
        <div class="btn-group btn-sm">
            <input type="checkbox" id="striped" bind:checked={striped} class="btn-check" />
            <label for="striped" class="btn btn-outline-primary">Striped</label>
            <input type="checkbox" id="rowHighlight" bind:checked={rowHighlight} class="btn-check" />
            <label for="rowHighlight" class="btn btn-outline-primary">Row Highlight</label>
        </div>
        <div class="btn-group btn-sm">
            <div class="input-group-text">
                <span title="Row Count:"><i class="bi bi-person-lines-fill"></i></span>
            </div>
            {#each numRecordsOptions as nro (nro)}
            <input
                type="radio"
                id="numRecords_{nro}"
                class="btn-check"
                bind:group={numRecords}
                value={nro}
            />
            <label for="numRecords_{nro}" class="btn btn-outline-primary">
                {nro}
            </label>
            {/each}
        </div>
    </div>
    <div
        class="flex-fill position-relative"
    >
        <WjDataViewTheme theme={bootstrapTheme}>
            <WjDataView
                {columns}
                data={data.data}
                {striped}
                {rowHighlight}
                class="position-absolute top-0 bottom-0"
            >
                {#snippet headerCell(col)}
                    <div class="d-flex flex-row px-2">
                        <span class="fw-semibold text-nowrap text-truncate">{col.text}</span>
                        <button class="btn btn-sm ms-auto" onclick={() => col.pinned = !col.pinned}>
                            <i class="bi bi-pin-{col.pinned ? 'fill' : 'angle'}"></i>
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
            </WjDataView>
        </WjDataViewTheme>
    </div>
</div>

{#snippet Numeric(value: number)}
    {@const formatter = new Intl.NumberFormat('es-cr', { maximumFractionDigits: 4 })}
    <span class="numeric">{formatter.format(value)}</span>

    <style>
        span.numeric {
            font-family: monospace;
        }
    </style>
{/snippet}