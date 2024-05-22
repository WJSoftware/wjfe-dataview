<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import WjDataView, { type WjDvColumn, type WjDvRow } from "$lib/WjDataView.svelte";
    import WjDataViewTheme from "$lib/WjDataViewTheme.svelte";
    import type { Person } from "../data-models.js";
    import Toolbar from "./Toolbar.svelte";
    import { demoOptions } from "./demoOptions.svelte.js";
    import { themeOptions } from "./themeOptions.svelte.js";

    let {
        data,
    }: {
        data: { data: PersonGridRow[]; }
    } = $props();

    type PersonGridRow = WjDvRow<Person>;

    let columns = $state<WjDvColumn<Record<string, any>, PersonGridRow>[]>([
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

    $effect(() => reloadData(demoOptions.records));

    function reloadData(records: number) {
        const url = new URL($page.url);
        url.searchParams.set('records', records.toString());
        goto(url);
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
    <div class="offcanvas offcanvas-end bg-info bg-glass" id="helpCanvas" data-bs-backdrop="false">
        <div class="offcanvas-header">
            <h3 class="offcanvas-title">WjDataView</h3>
        </div>
        <div class="offcanvas-body">
            <p>
                The data view component shows data in tabular format.
            </p>
            <p>
                The following is the list of features.  Some of these may not be evident if the browser's width is 
                enough to show all data at once, such as the pinnable columns.  To overcome this, either make the 
                browser window smaller, or resize some columns until the data goes off view.
            </p>
            <h4>List of Features</h4>
            <ul>
                <li>Scrollable viewport</li>
                <li>Striped rows</li>
                <li>Row highlighting on hover</li>
                <li>Hideable columns</li>
                <li>Pinnable columns</li>
                <li>Resizable columns</li>
                <li>Customizable header content</li>
                <li>Customizable data cell content</li>
                <li>Customizable appearance via CSS variables</li>
            </ul>
            <h4>Can it be used to edit data?</h4>
            <p>
                The short answer is <strong>Yes!</strong>  The cell contents are rendered by providing a custom 
                snippet named <span class="code">dataCell</span>.  However, note that <span class="code">WjDataView</span> 
                will not provide any form of keyboard navigation of any kind.
            </p>
            <p>
                Having said this, use <span class="code">dataCell</span> to provide cell content with controls such as 
                textboxes, checkboxes, radio buttons, selects, etc.
            </p>
        </div>
    </div>
    <Toolbar />
    <div
        class="flex-fill position-relative"
    >
        <WjDataViewTheme theme={themeOptions.currentTheme}>
            <WjDataView
                bind:columns
                data={data.data}
                striped={demoOptions.striped}
                rowHighlight={demoOptions.rowHighlight}
                class="position-absolute top-0 bottom-0"
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
    .bg-glass {
        --bs-bg-opacity: 0.3;
        backdrop-filter: blur(7px) saturate(110%);
    }
    span.code {
        font-family: monospace;
        background-color: rgba(0, 0, 0, 0.2);
        padding: 0.2em 0.3em;
        border-radius: 0.2em;

        :global([data-bs-theme="dark"]) & {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
    :global([data-bs-theme="dark"]) .offcanvas.bg-info {
        color: var(--bs-white);
    }
    .theme-def {
        --wjdv-sky-bg-rgb: 200, 240, 250;
        --wjdv-sky-color: var(--bs-black);
        :global([data-bs-theme="dark"]) & {
            --wjdv-sky-bg-rgb: 30, 90, 120;
            --wjdv-sky-color: var(--bs-white);
        }
    }
</style>