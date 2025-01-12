import type { WjDvColumn } from "./WjDataView/WjDataView.svelte";

class Sync {
    value = $state({} as Record<string, any>);
}

export function createProperty<TTarget, TValue>(target: TTarget, name: keyof TTarget, initial: TValue) {
    let value = $state(initial);
    Object.defineProperty(target, name, {
        get() {
            return this.sync?.value[name] ?? value;
        },
        set(newValue) {
            if (this.sync) {
                this.sync.value[name] = newValue;
            }
            value = newValue;
        },
        enumerable: true,
        configurable: true,
    });
    return target;
}

export type SyncType = 'sameView' | 'crossView';

export function createSynchronizableColumn<TColumn extends WjDvColumn>(column: TColumn, syncType: SyncType = 'crossView', ...additionalProps: (keyof TColumn)[]) {
    const mandatorySyncProps: Record<SyncType, (keyof TColumn)[]> = {
        'sameView': ['width', 'minWidth', 'pinned', 'hidden'],
        'crossView': ['width', 'minWidth', 'pinned', 'hidden', 'requiredLeft'],
    };
    const propsToSync = [
        ...mandatorySyncProps[syncType],
        ...additionalProps
    ];
    propsToSync.forEach(p => {
        const initialValue = column[p];
        delete column[p];
        createProperty(column, p, initialValue);
    });
    column.syncProps = propsToSync;
    return column;
}

function setSyncProps<TColumn extends WjDvColumn>(column: TColumn) {
    for (let p of column.syncProps!) {
        column[p] = column.sync[p];
    }
}

export function synchronizeColumns<TColumnA extends WjDvColumn, TColumnB extends WjDvColumn>(colA: TColumnA, colB: TColumnB) {
    let cleanup: () => void;
    if (colA.sync) {
        colB.sync = colA.sync;
        setSyncProps(colB);
    }
    else if (colB.sync) {
        colA.sync = colB.sync;
        setSyncProps(colA);
    }
    else {
        const so = new Sync();
        colA.sync = so;
        colB.sync = so;
        setSyncProps(colA);
        setSyncProps(colB);
    }
}