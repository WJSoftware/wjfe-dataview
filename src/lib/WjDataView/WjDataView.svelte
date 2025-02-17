<script module lang="ts">
    /**
     * Possible column alignments.
     */
    export type ColAlignment = 'start' | 'center' | 'end';

    /**
     * Properties that `WjDataView` mutates inside the data objects's `wjdv` property.
     *
     * **TIP**:  Use the `defineData()` function to easily comply with data row requirements.
     */
    export type WjDvRowProps = {
        /**
         * Optional.  Boolean value that determines if the row is expanded.
         */
        expanded?: boolean;
        /**
         * Optional.  Boolean value that determines if the row is selected.
         */
        selected?: boolean;
    };

    /**
     * Type of (data) row objects being fed to the `WjDataView` component.
     *
     * **TIP**:  Use the `defineData()` function to easily comply with data row requirements.
     */
    export type WjDvRow<TRow extends Record<string, any> = {}> = TRow & {
        /**
         * Mandatory row identifier that is used to key the row user interface element.
         */
        id: string | number;
        /**
         * Container object for properties that the `WjDataView` component mutates during the course of its execution.
         */
        wjdv: WjDvRowProps;
    };

    /**
     * Defines the signature of property-getter functions.
     * @param row The data row object from where to extract the property value.
     */
    export type GetterFn<TRow extends Record<string, any> = {}> = (row: WjDvRow<TRow>) => any;

    export type ColumnShape = {
        /**
         * Column's width, in *em*'s.  The default value is 10 em's.
         */
        width?: number;
        /**
         * Minimum column's width, in *em*'s.  The default value is 3 em's.
         */
        minWidth?: number;
        /**
         * Boolean value that tells the component to use `minWidth` as column width if `width` hasn't been set.
         *
         * This is a useful alternative to the component's `defaultWidth` property for individual columns.
         */
        useMinWidthAsWidth?: boolean;
        /**
         * Boolean value that indicates if the column can be resized.  The default value is `true`.
         */
        resizable?: boolean;
    };

    /**
     * Type that defines the necessary and optional properties of column definition objects.
     */
    export type WjDvColumn<TRow extends Record<string, any> = {}, TCol extends Record<string, any> = {}> = TCol &
        ColumnShape & {
            /**
             * Column's key.  A string value that is meant to be unique amongst the list of columns.
             *
             * It is used to key the rendered column elements, and if no `get` property is defined, it also serves as
             * property name to obtain data row data values.
             *
             * **HINT**: If you're interested in using the `dot-prop` package to retrieve property values, it is a good
             * idea for keys to be the dot-prop path of properties.
             */
            key: string;
            /**
             * Column's caption.
             */
            text: string;
            /**
             * Boolean value that indicates if the column is pinned.  The default value is `false`.
             */
            pinned?: boolean;
            /**
             * Boolean value that indicates if the column is hidden.  The default value is `false`.
             */
            hidden?: boolean;
            /**
             * Column alignment.  The default value is to be unset, so no explicit alignment takes place.
             */
            alignment?: ColAlignment;
            /**
             * Prevents data to wrap to a new line.  The default value is `false`.
             */
            noTextWrap?: boolean;
            /**
             * A function that returns the data that is to be rendered in the column.
             * @param row The data row object that is about to be rendered.
             * @returns The data meant to be rendered for this column.
             */
            get?: GetterFn<TRow>;
            /**
             * Adds additional CSS classes to the column's header cell.
             */
            headerClass?: string;
            /**
             * Adds additional CSS classes to the column's data cells.
             *
             * **NOTE**:  This is applied to every data cell in the column.
             */
            dataClass?: string;
            /**
             * Collects the names of all synchronizable properties.
             * 
             * **NOTE**:  This property is not meant to be set externally.  It is used internally by the component to
             * determine which properties are to be synchronized across columns.
             */
            syncProps?: Exclude<keyof WjDvColumn<TRow, TCol>, 'syncProps' | 'sync'>[];
            /**
             * Provides reactive synchronization of column properties.
             * 
             * **NOTE**:  This property is not meant to be set externally.  It is used internally by the component to
             * synchronize column properties.
             * 
             * One may, however, check for its existence to determine if a column is synchronized with another column.
             */
            sync?: {
                expectedLeft: number;
                value: Record<Exclude<keyof WjDvColumn<TRow, TCol>, 'syncProps' | 'sync'>, any>;
            };
        };

    /**
     * Defines the control column.
     *
     * Defining the control column is done the same as regular columns, with the following differences:
     *
     * + No `key` property.
     * + No `pinned` property, as the control column is always pinned.
     * + No `get` function.
     * + The `text` property is optional.
     */
    export type ControlColumn<
        TRow extends Record<string, any> = {},
        TCol extends Record<string, any> = {},
    > = Omit<WjDvColumn<TRow, TCol>, 'key' | 'pinned' | 'get' | 'text'> & {
        text?: string;
    };

    /**
     * Defines the target for unknown property spreading.
     *
     * + `'table'`:  Spreads any unknown properties on the table element.
     * + `'viewport'`:  Spreads any unknown properties on the viewport element.
     * + `'root'`:  Spreads any unknown poroperties on the root element, which depends on the value of the
     * `noViewport` property.
     */
    export type PropSpreadingTarget = 'root' | 'table' | 'viewport';

    /**
     * Defines the row context, which is an object that carries information about the row being rendered.
     */
    export type RowContext<TRow extends Record<string, any> = {}> = {
        /**
         * The row data object being rendered.
         */
        row: WjDvRow<TRow>;
        /**
         * The index of the row being rendered.
         */
        rowIndex: number;
    };

    /**
     * Defines the column context, which is an object that carries information about the column being rendered.
     */
    export type ColumnContext<
        TRow extends Record<string, any> = {},
        TCol extends Record<string, any> = {},
    > = {
        /**
         * The column object being rendered.
         */
        col: WjDvColumn<TRow, TCol>;
        /**
         * The index of the column being rendered.
         */
        colIndex: number;
    };

    /**
     * Defines the cell context, which is an object that carries information about the row and column being rendered.
     */
    export type DataCellContext<
        TRow extends Record<string, any> = {},
        TCol extends Record<string, any> = {},
    > = RowContext<TRow> &
        ColumnContext<TRow, TCol> & {
            /**
             * Getter function that will return the value meant to be rendered at the current cell.
             *
             * This function is already accounting for any getter functions that may have been set along the way,
             * namely:
             *
             * + The possible `get` function in the column's definition.
             * + The default `get` function passed as property to the component.
             * + The ultimate default getter function if nothing else has been defined.
             * @param row The row object from where to extract the cell value.
             */
            getFn: GetterFn<TRow>;
        };

    /**
     * Defines the possible grid line options for the `WjDataView` component.
     */
    export const GridLines = {
        /**
         * No lines.
         */
        None: 0x0,
        /**
         * Row lines.
         */
        Row: 0x1,
        /**
         * Column lines.
         */
        Column: 0x2,
        /**
         * All lines.
         */
        All: 0x3,
    } as const;

    /**
     * GridLines enumeration type.
     */
    export type GridLinesEnum = (typeof GridLines)[keyof typeof GridLines];

    /**
     * Validates pre-existing wjdv properties for data objects passed to `defineData`.
     * @param wjdv The pre-existing value of the wjdv property.
     * returns True if it is a valid value; false otherwise.
     */
    function validateWjdvContents(wjdv: unknown): wjdv is WjDvRowProps {
        switch (typeof wjdv) {
            case 'bigint':
            case 'boolean':
            case 'function':
            case 'number':
            case 'string':
            case 'symbol':
            case 'undefined':
                return false;
        }
        if (wjdv instanceof Date || wjdv instanceof Set || Array.isArray(wjdv)) {
            return false;
        }
        return true;
    }

    /**
     * Makes sure every data object in the provided array satisfies the data requirements imposed by the `WjDataView`
     * component.  The optional function parameter can accept a function that returns the value of the `id` property
     * for the data object, just in case the data doesn't already have an `id` property.
     *
     * **REMEMBER**:  `WjDataView` has 2 requirements on the data objects:  They must have an `id` property and the
     * `wjdv` property.  The purpose of this function is to ensure these requirements are met.  The use of the funtion
     * itself is optional, though, and you may ensure the requirements are met in any other way.
     *
     * @example
     * ```typescript
     * // Where "data" comes from, say, the load() function in +page.ts.
     * // The function provided as second argument is used to generate
     * const dataRows = defineData(data, m => crypto.randomUUID());
     * ```
     * @param {TData[]} data Array of data objects that will be used as source of data for a `WjDataView` component.
     * @param {(model: TData) => WjDvRow<TData>['id']} idGenFn Optional ID-generation function used to create unique
     * identifiers for the data objects.
     * @returns {WjDvRow<TData>[]} The same `data` array typed as `WjDvRow<TData>[]`.
     */
    export function defineData<TData extends Record<string, any>>(
        data: TData[],
        idGenFn?: (model: TData) => WjDvRow<TData>['id'],
    ) {
        for (let item of data) {
            const existingWjdv = (item as WjDvRow<TData>).wjdv;
            if (existingWjdv !== undefined && !validateWjdvContents(existingWjdv)) {
                throw new Error('Detected data object with a pre-defined "wjdv" property with an incompatible value.');
            }
            (item as WjDvRow<TData>).wjdv = existingWjdv ?? {};
            if (idGenFn && !item.id) {
                (item as WjDvRow<TData>).id = idGenFn(item);
            } else if (item.id === undefined) {
                throw new Error(
                    `'A data object in the array doesn't have the "id" property and no ID generation function was provided.  Either provide the generation function, or ensure the data comes with the "id" property.`,
                );
            }
        }
        return data as WjDvRow<TData>[];
    }

    /**
     * Defines the properties of the `WjDataView` component.
     */
    export type WjDataViewProps<
        TRow extends Record<string, any> = {},
        TCol extends Record<string, any> = {},
    > = {
        /**
         * Bindable.  Defines the columns the data view component will create.
         */
        columns: WjDvColumn<TRow, TCol>[];
        /**
         * Bindable.  The data that is shown by the data view component.
         */
        data: WjDvRow<TRow>[];
        /**
         * Function that retrieves a column's value using the row and provided key for columns that don't provide one.
         *
         * **HINT**:  Its signature matches that of `dot-prop`'s `getProperty()` function.
         * @param row Data object for the row being rendered (hence its name).
         * @param key Key of the column being rendered.
         */
        get?: (row: WjDvRow<TRow>, key: string) => any;
        /**
         * The width for colums that don't specify its own width, in `em`'s.
         */
        defaultWidth?: number;
        /**
         * Turns the row tracking feature on and off.
         */
        rowTracking?: boolean;
        /**
         * Turns the row-highlighting-on-selection feature on and off.
         */
        rowSelectionHighlight?: boolean;
        /**
         * Turns the striping of rows on and off.
         */
        striped?: boolean;
        /**
         * Turns the grid lines on and off.
         */
        gridLines?: GridLinesEnum;
        /**
         * Turns the divider between pinned and unpinned columns on and off.
         */
        pinnedDivider?: boolean;
        /**
         * Bindable.  Specifies the shape of the control column, which an extra column that is always the first pinned
         * column.
         *
         * If not provided, the control column is omitted.
         */
        controlColumn?: ControlColumn<TRow, TCol>;
        /**
         * Allows the exclusion of the component's viewport.
         *
         * The typical use case is for child `WjDataView` components.  Eliminating its own viewport makes its header
         * row stick to the parent `WjDataView`'s viewport.
         */
        noViewport?: boolean;
        /**
         * Establishes the target for property spreading.
         *
         * Any unknown properties passed to the component as spreaded as attributes on the specified target element.
         */
        propSpreadingTarget?: PropSpreadingTarget;
        /**
         * Sets the desired pattern for the filler columns that may appear when columns are cross-synchronized.
         */
        fillerPattern?: 'checkered' | 'diagstriped' | 'triangles';
        /**
         * Additional CSS classes that are applied to the data view's viewport (the top-level element).
         */
        class?: string;
        /**
         * Adds additional CSS classes to the individual header cells.
         *
         * Use this to style the header cells.  If what you want is set a background color, the recommended way is to
         * fake it using `box-shadow`.  If you set `background-color`, however, remember to use fully opaque colors or
         * the headers of pinned columns won't hide the scrolled columns behind them.
         *
         * @example
         * ```html
         * <style>
         *     .header-background {
         *         box-shadow: 0 9999px 9999px rgba(0, 0, 0, 0.08) inset;
         *     }
         * </style>
         * ```
         *
         * **IMPORTANT**:  This property exists for individual column definitions (of type `WjDvColumn`).  When said
         * property is present, this component-level property is not applied and instead the column-specific one is.
         *
         * Therefore, use this one for the "base" look of headers, then use the one in column definitions to do fancy
         * variations, probably depending on the business data's state.
         */
        headerClass?: string;
        /**
         * Snippet used to render the contents of header cells.
         * @param ctx Column context object containg the column and column index of the column being rendered.
         */
        headerCell?: Snippet<[ColumnContext<TRow, TCol>]>;
        /**
         * Snippet used to render the contents of data cells.
         * @param ctx Data cell context object containg the row and column context as well as the get function to
         * obtain the cell's value.
         */
        dataCell?: Snippet<[DataCellContext<TRow, TCol>]>;
        /**
         * Snippet used to render the extra row contents of rows with the `wjdv.expanded` property set to `true`.
         * @param ctx Row context object containing the row and row index of the row being rendered.
         */
        rowExpansion?: Snippet<[RowContext<TRow>]>;
        /**
         * Renders the contents of the control column's header cell.
         */
        controlHeaderCell?: Snippet;
        /**
         * Renders the contents of the control column's data cells.
         * @param ctx Row context object containing the row and row index of the row being rendered.
         */
        controlDataCell?: Snippet<[RowContext<TRow>]>;
        /**
         * Renders the content of the data view's caption.
         *
         * The caption is placed on top of the headers and fixes to the viewport along with the header row.  The
         * contents placed here are flagged as the data view's caption to accessibility tools like screen readers.
         */
        caption?: Snippet;
        [x: string]: any;
    };
</script>

<script
    lang="ts"
    generics="TCol extends Record<string, any> = {}, TRow extends Record<string, any> = {}"
>
    import { onMount, type Snippet } from 'svelte';
    import Resizer from '../Resizer/Resizer.svelte';
    import { combineClasses, nextControlId } from '../utils.js';

    let {
        columns = $bindable(),
        data = $bindable(),
        get = (r, k) => r[k],
        defaultWidth = 10,
        rowTracking = true,
        rowSelectionHighlight = true,
        striped = true,
        gridLines = GridLines.None,
        pinnedDivider = true,
        controlColumn = $bindable(),
        noViewport = false,
        propSpreadingTarget = 'root',
        fillerPattern = 'diagstriped',
        class: cssClass,
        headerClass,
        headerCell,
        dataCell,
        rowExpansion,
        controlHeaderCell,
        controlDataCell,
        caption,
        ...restProps
    }: WjDataViewProps<TRow, TCol> = $props();

    type ColumnInfo = {
        column: WjDvColumn<TRow, TCol>;
        left?: number;
        isFiller?: boolean;
    };

    const controlColKey = '__ctrl';
    const thisId = nextControlId('wjdv');

    let segregatedColumns = $state<{
        accPinnedWidth: number;
        accUnpinnedWidth: number;
        pinned: ColumnInfo[];
        unpinned: ColumnInfo[];
    }>({ pinned: [], unpinned: [], accPinnedWidth: 0, accUnpinnedWidth: 0 });

    $effect.pre(() => {
        const pinnedCols: WjDvColumn<TRow, TCol>[] = [];
        const unpinnedCols: WjDvColumn<TRow, TCol>[] = [];
        if (controlColumn && !controlColumn.hidden) {
            pinnedCols.push({
                ...controlColumn,
                key: controlColKey,
                pinned: true,
            } as WjDvColumn<TRow, TCol>);
        }
        for (let c of columns) {
            if (c.hidden) {
                continue;
            }
            if (c.pinned) {
                pinnedCols.push(c);
            } else {
                unpinnedCols.push(c);
            }
        }
        const pinnedLayout = columnLayout(pinnedCols, 0);
        const unpinnedLayout = columnLayout(unpinnedCols, pinnedLayout.accumWidth);
        segregatedColumns = {
            accPinnedWidth: pinnedLayout.accumWidth,
            accUnpinnedWidth: unpinnedLayout.accumWidth,
            pinned: pinnedLayout.columns,
            unpinned: unpinnedLayout.columns,
        };
    });

    onMount(() => {
        return () => {
            for (let col of columns) {
                if (col.sync) {
                    col.sync.expectedLeft = 0;
                }
            }
        };
    });

    /**
     * Returns the column's width according to the following logic:
     *
     * + If the column specifies a `width` value, then it is returned.
     * + If `useMinWidthAsWidth` is `true` and there is a `minWidth` value, then use this one.
     * + In all other cases, return the value of the `defaultWidth` component's property.
     * @param col Column of interest.
     */
    function columnWidth(col: ColumnShape) {
        return col.width ?? (col.useMinWidthAsWidth ? col.minWidth : null) ?? defaultWidth;
    }

    function effectiveSpreadingTarget(): Exclude<PropSpreadingTarget, 'root'> {
        if ((propSpreadingTarget === 'root' && noViewport) || propSpreadingTarget === 'table') {
            return 'table';
        }
        return 'viewport';
    }

    function createFillerColumn(column: WjDvColumn<TRow, TCol>, width: number) {
        return {
            key: `filler_${column.key}`,
            text: '',
            width,
            pinned: column.pinned,
            resizable: false,
        } as WjDvColumn<TRow, TCol>;
    }

    function columnLayout(columns: WjDvColumn<TRow, TCol>[], initialAccumWidth: number) {
        const result: { accumWidth: number; columns: ColumnInfo[] } = {
            accumWidth: initialAccumWidth,
            columns: [],
        };
        for (let c of columns) {
            if (c.sync && result.accumWidth < c.sync.expectedLeft) {
                // A filler column is needed.
                result.columns.push({
                    column: createFillerColumn(c, c.sync.expectedLeft - result.accumWidth),
                    left: result.accumWidth,
                    isFiller: true,
                });
                result.accumWidth = c.sync.expectedLeft;
            } else if (c.sync) {
                c.sync.expectedLeft = result.accumWidth;
            }
            result.columns.push({
                column: c,
                left: result.accumWidth,
            });
            result.accumWidth += columnWidth(c);
        }
        return result;
    }
</script>

{#snippet colHeaders(cols: ColumnInfo[])}
    {#each cols as ci, index (ci.column.key)}
        <div
            class={combineClasses('col-header', ci.column.headerClass ?? headerClass, {
                'sticky-header': !!ci.column.pinned,
                'sticky-divider': pinnedDivider && index + 1 === cols.length,
                'col-grid-line': !!(gridLines & GridLines.Column),
                filler: !!ci.isFiller,
                [`filler-${fillerPattern}`]: !!ci.isFiller,
            })}
            role="columnheader"
            style:width={`${columnWidth(ci.column)}em`}
            style:left={ci.left !== undefined && !!ci.column.pinned ? `${ci.left}em` : undefined}
            style:z-index={!!ci.column.pinned ? cols.length - index : undefined}
        >
            <div>
                {#if ci.column.key === controlColKey}
                    {@render controlHeaderCell?.()}
                {:else if headerCell && !ci.isFiller}
                    {@render headerCell({ col: ci.column, colIndex: index })}
                {:else}
                    <div class="default-header-content">
                        {ci.column.text}
                    </div>
                {/if}
                {#if ci.column.resizable ?? true}
                    <Resizer minSize={ci.column.minWidth} resize={(newSize) => (ci.column.width = newSize)} />
                {:else}
                    <div></div>
                {/if}
            </div>
        </div>
    {/each}
{/snippet}

{#snippet colData(row: WjDvRow<TRow>, rowIndex: number, cols: ColumnInfo[])}
    {#each cols as ci, index (ci.column.key)}
        {@const getFn = ci.column.get ?? ((r) => get(r, ci.column.key))}
        <div
            class={combineClasses('dataview-cell-bg', ci.column.dataClass, {
                'sticky-data': !!ci.column.pinned,
                'sticky-divider': pinnedDivider && index + 1 === cols.length,
                'col-grid-line': !!(gridLines & GridLines.Column),
                filler: !!ci.isFiller,
                [`filler-${fillerPattern}`]: !!ci.isFiller,
            })}
            role="cell"
            style:width={`${columnWidth(ci.column)}em`}
            style:left={ci.left !== undefined ? `${ci.left}em` : undefined}
        >
            <div class="dataview-cell-s">
                <div
                    class={combineClasses('dataview-cell-d', `align-${ci.column.alignment ?? 'start'}`, {
                        'no-wrap': ci.column.noTextWrap ?? false,
                    })}
                >
                    {#if ci.column.key === controlColKey}
                        {@render controlDataCell?.({ row, rowIndex })}
                    {:else if dataCell && !ci.isFiller}
                        {@render dataCell({ col: ci.column, colIndex: index, row, rowIndex, getFn })}
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

{#snippet table()}
    <div
        class={combineClasses('dataview', noViewport ? cssClass : undefined, { 'no-vp': noViewport })}
        role="table"
        aria-labelledby={caption ? `${thisId}_caption` : undefined}
        {...effectiveSpreadingTarget() === 'table' ? restProps : {}}
    >
        <div class="header-group">
            {#if caption}
                <div class="dataview-caption" role="caption" id="{thisId}_caption">
                    {@render caption()}
                </div>
            {/if}
            <div role="row" class:row-grid-line={!!(gridLines & GridLines.Row)}>
                {#if segregatedColumns.pinned.length}
                    {@render colHeaders(segregatedColumns.pinned)}
                {/if}
                {@render colHeaders(segregatedColumns.unpinned)}
                <div class={combineClasses('col-header extra-header', headerClass)} role="columnheader">&nbsp;</div>
            </div>
        </div>
        <div class={combineClasses('dataview-body', { striped, 'row-tracking': rowTracking })} role="rowgroup">
            {#each data as row, rowIndex (row.id)}
                <div
                    class="dataview-row-bg"
                    class:selected={rowSelectionHighlight && row.wjdv.selected}
                    class:row-grid-line={!!(gridLines & GridLines.Row)}
                    role="row"
                    aria-selected={row.wjdv.selected ?? false}
                    aria-expanded={rowExpansion ? (row.wjdv.expanded ?? false) : undefined}
                    aria-owns={rowExpansion && row.wjdv.expanded ? `${thisId}_rowExpansion_${row.id}` : undefined}
                >
                    <div class="dataview-row-s">
                        <div class="dataview-row-h">
                            <div class="dataview-row-d">
                                {#if segregatedColumns.pinned.length}
                                    {@render colData(row, rowIndex, segregatedColumns.pinned)}
                                {/if}
                                {@render colData(row, rowIndex, segregatedColumns.unpinned)}
                                <div class="dataview-cell">&nbsp;</div>
                            </div>
                            {#if row.wjdv.expanded && rowExpansion}
                                <div class="dataview-row-expansion" id="{thisId}_rowExpansion_{row.id}">
                                    {@render rowExpansion({ row, rowIndex })}
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/snippet}

{#if noViewport}
    {@render table()}
{:else}
    <div
        class={combineClasses('dataview-container', cssClass)}
        {...effectiveSpreadingTarget() === 'viewport' ? restProps : {}}
    >
        {@render table()}
    </div>
{/if}

<!--
@component

# WjDataView

This is a data visualization component that renders data in a table.  This table provides several aids to make this 
visualization more enjoyable

## Main Features

1. **Pinnable colums**.  Set a column's `pinned` property to `true` to pin it to the left.
2. **Row mouse tracking**.  Turn it on and off with the `rowTracking` component property.
3. **Row selection highlighting**.  Turn it on and off with the `rowSelectionHighlight` component property.  The grid 
supports the concept of row selection but doesn't provide a user interface to actually select rows.  Set a row's 
`wjdv.selected` property to `true` and the component will highlight its row.
4. **Row striping**.  Turn it on and off with the `striped` component property.
5. **Row expansion**.  Again, no user interface is actually provided for row expansion, but supports the notion by 
allocating a physical space below the row of cells for content related to this row.  Expand a row by setting the row's 
`wjdv.expanded` property to `true`.
6. **Control column**.  Define it through the `controlColumn` component property.
7. **Themeable**.  Almost every aspect of the visual appearance can be customized.  Use the `WjDataViewTheme` 
component for easier themeing.

## Examples

### Basic Use

This is the simplest form of use:  Provide column definitions and data.  Columns require the `key` and the `text` 
properties; data items require an `id` and the special `wjdv` properties.  For data items, both can be fulfilled using 
the `defineData` function.

**IMPORTANT**:  The `columns` and `data` props must always be bound.

```typescript
import { defineData, WjDataView, type WjDvColumn } from "@wjfe/dataview";
import { myTheme } from './my/theme.js'; // Optional.  Build themese as per the documentation.

const columns: WjDvColumn[] = [
    {
        key: 'colA',
        text: 'Column A'
    },
    {
        key: 'colB',
        text: 'Column B'
    },
];

type MyData = {
    colA: string;
    colB: number;
}

const data = defineData<MyData>([
    {
        id: 1,
        colA: 'Hello',
        colB: 5
    },
    {
        id: 1,
        colA: 'World!',
        colB: 6
    },
]);
```

```svelte
<WjDataViewTheme theme={myTheme}>
    <WjDataView bind:columns bind:data>
    </WjDataView>
</WjDataViewTheme>
```

### Custom Content

Custom content is achieved by using the `headerCell` and `dataCell` snippets.

```typescript
import { defineData, WjDataView, type WjDvColumn } from "@wjfe/dataview";
import { myTheme } from './my/theme.js'; // Optional.  Build themese as per the documentation.

type MyData = {
    colA: string;
    colB: number;
};

const columns: WjDvColumn<MyData>[] = [
    {
        key: 'colA',
        text: 'Column A'
    },
    {
        key: 'colB',
        text: 'Column B'
    },
];

const data = defineData<MyData>([
    {
        id: 1,
        colA: 'Hello',
        colB: 5
    },
    {
        id: 1,
        colA: 'World!',
        colB: 6
    },
]);
```

```svelte
<WjDataViewTheme theme={myTheme}>
    <WjDataView bind:columns bind:data>
        {#snippet headerCell(ctx)}
            <strong>{ctx.col.text}</strong>
        {/snippet}
        {#snippet dataCell(ctx)}
            {#if ctx.col.key === 'colB'}
                {ctx.row.colB} letters
            {:else}
                {ctx.getFn(ctx.row)}
            {/if}
        {/snippet}
    </WjDataView>
</WjDataViewTheme>
```
-->

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

    div.default-content,
    div.default-header-content {
        padding: 0.1em 0.3em;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    div.dataview-caption {
        position: sticky;
        left: 0;
        width: fit-content;
    }

    // Core styles.
    div.dataview-container {
        height: 100%;
        width: 100%;
        overflow: scroll;
        position: relative;
        --wjdv-bg-color: rgba(var(--wjdv-bg-color-rgb, 255, 255, 255), var(--wjdv-bg-opacity, 1));
        --wjdv-color: var(--wjdv-fg-color, inherit);
        --wjdv-striping-bg-color: rgba(
            var(--wjdv-striping-bg-color-rgb, 0, 0, 0),
            var(--wjdv-striping-bg-opacity, 0.04)
        );
        --wjdv-striping-color: var(--wjdv-striping-fg-color, inherit);
        --wjdv-rowtracking-bg-color: rgba(
            var(--wjdv-rowtracking-bg-color-rgb, 0, 0, 0),
            var(--wjdv-rowtracking-bg-opacity, 0.07)
        );
        --wjdv-rowtracking-color: rgba(--wjdv-rowtracking-fg-color, inherit);
        --wjdv-sticky-divider: var(--wjdv-sticky-divider-width, 0.2em) var(--wjdv-sticky-divider-style, solid)
            var(--wjdv-sticky-divider-color, darkgray);
        --wjdv-selected-bg-color: rgba(
            var(--wjdv-selected-bg-color-rgb, 227, 240, 254),
            var(--wjdv-selected-bg-opacity, 1)
        );
        --wjdv-selected-color: var(--wjdv-selected-fg-color, inherit);
        --wjdv-grid-line: var(--wjdv-grid-line-width, 0.01em) var(--wjdv-grid-line-style, solid)
            var(--wjdv-grid-line-color, currentColor);
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

    .col-grid-line {
        border-right: var(--wjdv-grid-line);
        &:last-of-type {
            border-right: none;
        }
    }

    .row-grid-line {
        border-bottom: var(--wjdv-grid-line);
        &:last-of-type {
            border-right: none;
        }
    }

    .filler {
        --wjdv-i-filler-color: var(--wjdv-filler-color, #ddd);
        --wjdv-i-filler-pattern-size: var(--wjdv-filler-pattern-size, 5px);

        &.filler-checkered {
            background-image: linear-gradient(45deg, var(--wjdv-i-filler-color) 25%, transparent 25%),
                linear-gradient(135deg, var(--wjdv-i-filler-color) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, var(--wjdv-i-filler-color) 75%),
                linear-gradient(135deg, transparent 75%, var(--wjdv-i-filler-color) 75%);
            background-size: calc(var(--wjdv-i-filler-pattern-size) * 2) calc(var(--wjdv-i-filler-pattern-size) * 2);
            background-position:
                0 0,
                var(--wjdv-i-filler-pattern-size) 0,
                var(--wjdv-i-filler-pattern-size) calc(var(--wjdv-i-filler-pattern-size) * -1),
                0px var(--wjdv-i-filler-pattern-size);
        }

        &.filler-triangles {
            background-image: repeating-linear-gradient(
                135deg,
                var(--wjdv-i-filler-color) 0%,
                var(--wjdv-i-filler-color) 50%,
                transparent 50%,
                transparent 100%
            );
            background-size: calc(var(--wjdv-i-filler-pattern-size) * 2) calc(var(--wjdv-i-filler-pattern-size) * 2);
        }

        &.filler-diagstriped {
            background-image: repeating-linear-gradient(
                135deg,
                var(--wjdv-i-filler-color) 0%,
                var(--wjdv-i-filler-color) var(--wjdv-i-filler-pattern-size),
                transparent var(--wjdv-i-filler-pattern-size),
                transparent calc(var(--wjdv-i-filler-pattern-size) * 2)
            );
        }
    }

    div.col-header {
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

        &.row-tracking > div.dataview-row-bg > div.dataview-row-s > div.dataview-row-h {
            &:hover {
                background-color: var(--wjdv-rowtracking-bg-color);

                // The following is correct, but Svelte says it is an unused CSS selector.
                // It's been re-written outside the SCSS block with :global() as workaround.

                // div.sticky-data div.dataview-cell-d {
                //     background-color: var(--wjdv-rowtracking-bg-color) !important;
                // }
            }
        }
    }

    // WORKAROUNDS:  :global() isn't needed, but Svelte keeps on filtering it out alleging it is unused.
    :global(
            div.dataview-body.striped
                > div.dataview-row-bg:nth-of-type(2n)
                > div.dataview-row-s
                > div.dataview-row-h
                > div.dataview-row-d
                div.sticky-data
                div.dataview-cell-s
        ) {
        background-color: var(--wjdv-striping-bg-color);
        color: var(--wjdv-striping-color);
    }
    :global(
            div.dataview-body.row-tracking
                > div.dataview-row-bg
                > div.dataview-row-s
                > div.dataview-row-h:hover
                > div.dataview-row-d
                > div.sticky-data
                div.dataview-cell-d
        ) {
        background-color: var(--wjdv-rowtracking-bg-color);
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

    div.dataview-cell-s,
    div.dataview-cell-d {
        height: 100%;
    }

    .sticky-divider {
        &.sticky-data,
        &.sticky-header {
            border-right: var(--wjdv-sticky-divider);
        }
    }

    :global(div.dataview-body div.dataview:not(.no-vp) .header-group) {
        z-index: auto;
    }
</style>
