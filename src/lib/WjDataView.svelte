<script context="module" lang="ts">
    export type ColAlignment = 'start' | 'center' | 'end';

    export type WjDvRowProps = {
        expanded?: boolean;
        selected?: boolean;
    };

    export type WjDvRow<TRow extends Record<string, any> = Record<string, any>> = TRow & {
        id: string | number;
        wjdv?: WjDvRowProps;
    };

    export type WjDvColumn<TCol extends Record<string, any> = Record<string, any>, TRow extends Record<string, any> = Record<string, any>> = TCol & {
        key: string;
        text: string;
        width?: number;
        minWidth?: number;
        resizable?: boolean;
        pinned?: boolean;
        hidden?: boolean;
        alignment?: ColAlignment;
        noTextWrap?: boolean;
        get?: (row: TRow) => any;
    };
</script>

<script lang="ts" generics="TCol extends Record<string, any> = Record<string, any>, TRow extends Record<string, any> = Record<string, any>">
    import { slide } from "svelte/transition";

    import Resizer from "./Resizer.svelte";
    import { combineClasses } from "./utils.js";
    import { type Snippet } from "svelte";

    let {
        columns = $bindable(),
        data = $bindable(),
        get = (r, k) => r[k],
        defaultWidth = 10,
        rowHighlight = true,
        rowSelectionBg = true,
        striped = true,
        pinnedDivider = true,
        headerCell,
        dataCell,
        rowExpansion,
        class: cssClass,
        ...restProps
    }: {
        /**
         * Defines the columns the data view component will create.
         */
        columns: WjDvColumn<TCol, TRow>[];
        /**
         * The data that is shown by the data view component.
         */
        data: WjDvRow<TRow>[];
        /**
         * Function that retrieves a column's value using the row and provided key for columns that don't provide one.
         * 
         * **HINT**:  Its signature matches that of `dot-prop`'s `getProperty()` function.
         * @param row Data object for the row being rendered (hence its name).
         * @param key Key of the column being rendered.
         */
        get?: (row: TRow, key: string) => any;
        /**
         * The width for colums that don't specify its own width, in `em`'s.
         */
        defaultWidth?: number;
        /**
         * Turns the row-highlighting-on-hover feature on and off.
         */
        rowHighlight?: boolean;
        /**
         * Turns the row-highlighting-on-selection feature on and off.
         */
        rowSelectionBg?: boolean;
        /**
         * Turns the striping of rows on and off.
         */
        striped?: boolean;
        /**
         * Turns the divider between pinned and unpinned columns on and off.
         */
        pinnedDivider?: boolean;
        /**
         * Snippet used to render the contents of header cells.
         */
        headerCell?: Snippet<[WjDvColumn<TCol, TRow>]>;
        /**
         * Snippet used to render the contents of data cells.
         */
        dataCell?: Snippet<[WjDvColumn<TCol,TRow>, WjDvRow<TRow>]>;
        /**
         * Snipped used to render the extra row contents of rows with the `wjdv.expanded` property set to `true`.
         */
        rowExpansion?: Snippet<[WjDvRow<TRow>]>;
        /**
         * Additional CSS classes that are applied to the data view's viewport (the top-level element).
         */
        class?: string;
    } = $props();

    type ColumnInfo = {
        column: WjDvColumn<TCol, TRow>;
        left?: number;
    }

    const segregatedColumns = $derived(columns.reduce<{
        accPinnedWidth: number;
        accUnpinnedWidth: number;
        pinned: ColumnInfo[];
        unpinned: ColumnInfo[];
    }>((p, c) => {
        if (!c.hidden) {
            if (c.pinned) {
                p.pinned.push({
                    column: c,
                    left: p.accPinnedWidth
                });
                p.accPinnedWidth += columnWidth(c);
            }
            else {
                p.unpinned.push({
                    column: c,
                    left: p.accUnpinnedWidth
                });
                p.accUnpinnedWidth += columnWidth(c);
            }
        }
        return p;
    }, { accPinnedWidth: 0, accUnpinnedWidth: 0, pinned: [], unpinned: [] }));

    function columnWidth(col: WjDvColumn<TCol, TRow>) {
        return col.width ?? defaultWidth;
    }
</script>

{#snippet colHeaders(cols: ColumnInfo[])}
    {#each cols as ci, index (ci.column.key)}
    <div
        class={combineClasses('col-header', {
            'sticky-header': !!ci.column.pinned,
            'sticky-divider': pinnedDivider && index + 1 === cols.length
        })}
        role="columnheader"
        style:width={`${columnWidth(ci.column)}em`}
        style:left={ci.left !== undefined && !!ci.column.pinned ? `${ci.left}em` : undefined}
        style:z-index={!!ci.column.pinned ? cols.length - index : undefined}
    >
        <div>
            {#if headerCell}
                {@render headerCell(ci.column)}
            {:else}
                <div class="default-header-content">
                    {ci.column.text}
                </div>
            {/if}
            {#if ci.column.resizable ?? true}
                <Resizer minSize={ci.column.minWidth} resize={newSize => ci.column.width = newSize} />
            {:else}
                <div></div>
            {/if}
        </div>
    </div>
    {/each}
{/snippet}

{#snippet colData(row: WjDvRow<TRow>, cols: ColumnInfo[])}
    {#each cols as ci, index (ci.column.key)}
    {@const getFn = ci.column.get ?? (r => get(r, ci.column.key))}
    <div
        class={combineClasses('dataview-cell-bg', {
            'sticky-data': !!ci.column.pinned,
            'sticky-divider': pinnedDivider && index + 1 === cols.length
        })}
        role="cell"
        style:width={`${ci.column.width ?? defaultWidth}em`}
        style:left={ci.left !== undefined ? `${ci.left}em` : undefined}
    >
        <div class="dataview-cell-s">
            <div class={combineClasses("dataview-cell-d", {
                'align-start': ci.column.alignment === 'start',
                'align-center': ci.column.alignment === 'center',
                'align-end': ci.column.alignment === 'end',
                'no-wrap': ci.column.noTextWrap ?? false,
            })}>
                {#if dataCell}
                    {@render dataCell(ci.column, row)}
                {:else}
                    <div class="default-content">
                        {getFn(row)}
                    </div>
                {/if}
            </div>
        </div>
    </div>
    {/each}
{/snippet}

<div class={combineClasses('dataview-container', cssClass)}>
    <div class="dataview" role="table" {...restProps}>
        <div class="header-group" role="rowheader">
            <div role="row">
                {#if segregatedColumns.pinned.length}
                    {@render colHeaders(segregatedColumns.pinned)}
                {/if}
                {@render colHeaders(segregatedColumns.unpinned)}
                <div class="col-header extra-header">&nbsp;</div>
            </div>
        </div>
        <div class={combineClasses('dataview-body', { striped, 'row-highlight': rowHighlight })} role="rowgroup">
            {#each data as row (row.id)}
            <div class="dataview-row-bg" class:selected={rowSelectionBg && row.wjdv?.selected} role="row">
                <div class="dataview-row-s">
                    <div class="dataview-row-h">
                        <div class="dataview-row-d">
                            {#if segregatedColumns.pinned.length}
                                {@render colData(row, segregatedColumns.pinned)}
                            {/if}
                            {@render colData(row, segregatedColumns.unpinned)}
                            <div class="dataview-cell">&nbsp;</div>
                        </div>
                        {#if row.wjdv?.expanded && rowExpansion}
                            <div class="dataview-row-expansion">
                                {@render rowExpansion(row)}
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    // Content classes.
    .align-start {
        text-align: left;
    }

    .align-center {
        text-align: center;
    }

    .align-end {
        text-align: right;
    }

    .no-wrap {
        text-wrap: nowrap;
    }

    div.default-header-content {
        font-weight: bold;
    }

    div.default-content, div.default-header-content {
        padding: 0.1em 0.3em;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    // Core styles.
    div.dataview-container {
        height: 100%;
        width: 100%;
        overflow: scroll;
        position: relative;
        --wjdv-bg-color: rgba(var(--wjdv-bg-color-rgb, 255, 255, 255), var(--wjdv-bg-opacity, 1));
        --wjdv-color: var(--wjdv-fg-color, inherit);
        --wjdv-striping-bg-color: rgba(var(--wjdv-striping-bg-color-rgb, 0, 0, 0), var(--wjdv-striping-bg-opacity, 0.04));
        --wjdv-striping-color: var(--wjdv-striping-fg-color, inherit);
        --wjdv-rowhighlight-bg-color: rgba(var(--wjdv-rowhighlight-bg-color-rgb, 0, 0, 0), var(--wjdv-rowhighlight-bg-opacity, 0.07));
        --wjdv-rowhighlight-color: rgba(--wjdv-rowhighlight-fg-color, inherit);
        --wjdv-sticky-divider: var(--wjdv-sticky-divider-width, 0.1em) var(--wjdv-sticky-divider-style, solid) var(--wjdv-sticky-divider-color, darkgray);
        --wjdv-selected-bg-color: rgba(var(--wjdv-selected-bg-color-rgb, 227, 240, 254), var(--wjdv-selected-bg-opacity, 1));
        --wjdv-selected-color: var(--wjdv-selected-fg-color, inherit);
    }

    div.dataview {
        display: table;
        color: var(--wjdv-color);
        min-width: 100%; // Needed so the extra column can occupy the rest of the width and keep a nice look.
        background-color: var(--wjdv-bg-color);
    }

    div.header-group {
        position: sticky;
        z-index: 2;
        top: 0;
        background-color: rgba(var(--wjdv-bg-color-rgb, 255, 255, 255), 1);

        & > div {
            display: flex;
            flex-direction: row;
        }
    }

    div.col-header {
        // box-shadow: inset 0 -0.4em 1em rgba(0, 0, 0, 0.1);
        &.sticky-header {
            position: sticky;
            top: 0;
            background-color: rgba(var(--wjdv-bg-color-rgb, 255, 255, 255), 1);
        }

        & > div {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            position: relative;
            
            & > :global(*:first-child) {
                flex: 1;
                overflow: hidden;
            }

            & > :global(*:last-child) {
                flex-grow: 0;
                flex-shrink: 0;
            }
        }
    }

    div.extra-header {
        flex: 1 1 0;
    }

    div.dataview-body {
        display: flex;
        flex-direction: column;

        &.striped {
            & > div.dataview-row-bg:nth-of-type(2n) {
                & > div.dataview-row-s {
                    background-color: var(--wjdv-striping-bg-color);
                    color: var(--wjdv-striping-color);
                }

                // The following is correct, but Svelte says it is an unused CSS selector.
                // It's been re-written outside the SCSS block with :global() as workaround.

                // & div.sticky-data div.dataview-cell-s {
                //     background-color: var(--wjdv-striping-bg-color);
                //     color: var(--wjdv-striping-color);
                // }
            }
        }

        &.row-highlight div.dataview-row-h {
            &:hover {
                background-color: var(--wjdv-rowhighlight-bg-color);

                // The following is correct, but Svelte says it is an unused CSS selector.
                // It's been re-written outside the SCSS block with :global() as workaround.

                // div.sticky-data div.dataview-cell-d {
                //     background-color: var(--wjdv-rowhighlight-bg-color) !important;
                // }
            }
        }
    }

    // WORKAROUNDS:  :global() isn't needed, but Svelte keeps on filtering it out alleging it is unused.
    :global(div.dataview-body.striped) > div.dataview-row-bg:nth-of-type(2n) div.sticky-data :global(div.dataview-cell-s) {
        background-color: var(--wjdv-striping-bg-color);
        color: var(--wjdv-striping-color);
    }
    :global(div.dataview-body.row-highlight) div.dataview-row-h:hover div.sticky-data :global(div.dataview-cell-d) {
        background-color: var(--wjdv-rowhighlight-bg-color) !important;
    }

    div.dataview-row-s {
        display: flex;
        flex-direction: column;
    }
    
    div.dataview-row-d {
        display: flex;
        flex-direction: row;

        & div.dataview-cell-d {
            overflow: hidden;
        }

        & div.dataview-cell-bg {

            &.sticky-data {
                position: sticky;
                z-index: 1;
            }
        }
    }

    div.dataview-row-bg.selected {
        background-color: var(--wjdv-selected-bg-color);
        color: var(--wjdv-selected-color);
        
        & div.dataview-cell-bg.sticky-data {
            background-color: var(--wjdv-selected-bg-color);
            color: var(--wjdv-selected-color);
        }
    }

    div.dataview-cell-bg.sticky-data {
        background-color: var(--wjdv-bg-color);
    }

    div.dataview-cell-s, div.dataview-cell-d {
        height: 100%;
    }

    .sticky-divider {
        &.sticky-data, &.sticky-header {
            border-right: var(--wjdv-sticky-divider);
        }
    }
</style>