import type { WjDvColumn } from "$lib/WjDataView/WjDataView.svelte";
import { CrossSync } from "./CrossSync.svelte.js";

/**
 * List of properties that **must** be synchronized between columns of different dataview components if proper visual 
 * synchronization is to be achieved.
 */
export const crossVisualSync = [
    'hidden',
    'minWidth',
    'pinned',
    'useMinWidthAsWidth',
    'width'
] as const satisfies (keyof WjDvColumn)[];

/**
 * Class that orchestrates the synchronization of columns between different dataview components.
 */
export class CrossSynchronizer {
    #synchronizers = [] as CrossSync[];
    #createSynchronizer() {
        const sync = new CrossSync();
        this.#synchronizers.push(sync);
        return sync;
    }

    /**
     * Invalidates the layout of all columns that are being synchronized by this synchronizer.
     */
    invalidateLayout() {
        this.#resetExpectedLeft();
    }

    #resetExpectedLeft() {
        console.debug('Resetting expectedLeft on %d synchronizers...', this.#synchronizers.length);
        for (let sync of this.#synchronizers) {
            sync.expectedLeft = 0;
        }
    }

    #createProperty<
        TColumn
    >(column: TColumn, name: keyof TColumn) {
        let value = $state(column[name]);
        delete column[name];
        // @ts-expect-error TS2345
        const onChange = !crossVisualSync.includes(name) ? undefined : () => this.#resetExpectedLeft();
        Object.defineProperty(column, name, {
            get() {
                return this.sync?.value[name] ?? value;
            },
            set(newValue) {
                const changed = newValue !== this[name];
                if (this.sync) {
                    this.sync.value[name] = newValue;
                }
                value = newValue;
                if (changed) {
                    onChange?.();
                }
            },
            enumerable: true,
            configurable: true,
        });
        (column as WjDvColumn).syncProps ??= [];
        // @ts-expect-error TS2345 - Seems like a bug.
        column.syncProps.push(name);
    }

    /**
     * Creates special property or properties in every column in the array for the purposes of synchronizing their 
     * values with other column objects used in other dataview components.
     * @param column Array of columns to create properties for.
     * @param name Property or properties to create.
     */
    createProperty<TColumn>(
        column: TColumn[],
        ...name: Exclude<keyof TColumn, 'sync' | 'syncProps'>[]
    ): TColumn[];
    /**
     * Creates special property or properties in the column for the purposes of synchronizing their values with other 
     * column objects used in other dataview components.
     * @param column Column to create properties for.
     * @param name Property or properties to create.
     */
    createProperty<TColumn>(
        column: TColumn,
        ...name: Exclude<keyof TColumn, 'sync' | 'syncProps'>[]
    ): TColumn;
    createProperty<TColumn>(
        column: TColumn | TColumn[],
        ...name: Exclude<keyof TColumn, 'sync' | 'syncProps'>[]
    ) {
        const cols = Array.isArray(column) ? column : [column];
        for (let col of cols) {
            for (let n of name) {
                this.#createProperty<TColumn>(col, n);
            }
        }
        return column;
    }

    #initializeSyncObject(refColumn: WjDvColumn, otherColumn: WjDvColumn) {
        if (!refColumn.syncProps?.length) {
            throw new Error('The column has no synchronizable properties.');
        }
        for (let name of refColumn.syncProps) {
            // @ts-expect-error TS2322 Seems that TS doesn't realize that they are the same type.
            otherColumn[name] = refColumn[name];
        }
    }

    /**
     * Synchronizes the values of two columns.  If one of the columns is already synchronized with another column, the 
     * new column will be synchronized with the other two columns.
     * 
     * If both columns are already synchronized, an error will be thrown.
     * 
     * **IMPORTANT**:  When synchronization is set up, the values of all synchronizable properties in the first column 
     * take precedence over the values in the second column.
     * @param colA First column to synchronize.
     * @param colB Second column to synchronize.
     */
    syncColumns<
        TColumnA extends { sync?: CrossSync },
        TColumnB extends { sync?: CrossSync },
    >(colA: TColumnA, colB: TColumnB) {
        if (colA.sync && colB.sync) {
            throw new Error('Both columns are already synchronized.  To re-synchronize, de-syncronize one of them.');
        }
        else if (colA.sync) {
            colB.sync = colA.sync;
        }
        else if (colB.sync) {
            colA.sync = colB.sync;
        }
        else {
            const so = this.#createSynchronizer();
            colA.sync = so;
            colB.sync = so;
        }
        this.#initializeSyncObject(colA as unknown as WjDvColumn, colB as unknown as WjDvColumn);
    }
}
