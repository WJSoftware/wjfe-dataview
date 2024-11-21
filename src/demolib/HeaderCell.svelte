<script module>
    export type HeaderColumn<TRow extends Record<string, any> = Record<string, any>, TCol extends Record<string, any> = Record<string, any>> = 
        WjDvColumn<TRow, TCol> & {
            alignment: ColAlignment;
            pinnedFunctions: {
                pin?: boolean;
                hide?: boolean;
                align?: boolean;
                textWrap?: boolean;
            };
        };

    const allAlignments: ColAlignment[] = [
        'start',
        'center',
        'end'
    ];

    const alignmentIcons: Record<ColAlignment, string> = {
        'center': 'text-center',
        'end': 'text-right',
        'start': 'text-left'
    };
</script>
<script lang="ts" generics="TRow extends Record<string, any> = Record<string, any>, TCol extends Record<string, any> = Record<string, any>">
    import { nextControlId } from "$lib/utils.js";
    import type { ColAlignment, WjDvColumn } from "$lib/WjDataView/WjDataView.svelte";
    import FavButtonMenuItem from "./FavButtonMenuItem.svelte";
    import FavMenuItem from "./FavMenuItem.svelte";
    import GlassyDropdownMenu from "./GlassyDropdownMenu.svelte";
    import keyStateStore from './keyStateStore.svelte.js';

    type Props = {
        col: HeaderColumn<TRow, TCol>;
        maxWidth?: string;
    };

    let {
        col = $bindable(),
        maxWidth,
    }: Props = $props();

    let id = nextControlId();
    let pinIcon = $derived(`bi-pin-${col.pinned ? 'fill' : 'angle'}`);
    let textWrap = $state(!col.noTextWrap);
    let colAlignmentIndex = $derived(allAlignments.findIndex(a => a === (col.alignment ?? 'start')));
    let alignmentIcon = $derived(alignmentIcons[allAlignments[keyStateStore.ctrl ? previousAlignmentIndex() : nextAlignmentIndex()]]);

    $effect.pre(() => {
        col.noTextWrap = !textWrap;
    });
    $effect.pre(() => {
        if (typeof col.minWidth === 'number' && col.minWidth > (col.width ?? Number.MAX_VALUE)) {
            col.width = col.minWidth
        }
    });
    $effect.pre(() => {
        col.headerClass = col.pinned ? 'pinned-header' : undefined;
        col.dataClass = col.pinned ? 'pinned-cell' : undefined;
    })

    function nextAlignmentIndex() {
        return (colAlignmentIndex + 1) % allAlignments.length;
    }

    function previousAlignmentIndex() {
        return (colAlignmentIndex - 1 + allAlignments.length) % allAlignments.length;
    }

    function changeAlignment(ev: MouseEvent) {
        col.alignment = allAlignments[ev.ctrlKey ? previousAlignmentIndex() : nextAlignmentIndex()];
    }
</script>

<div class="d-flex flex-row ps-2">
    <div class="dropdown">
        <button
            type="button"
            data-bs-toggle="dropdown"
            data-bs-target="{id}_ddmenu"
            aria-expanded="false"
            class="btn btn-sm btn-neutral dropdown-toggle flex-shrink-1"
        >
            <span class="fw-semibold text-nowrap text-truncate">{col.text}</span>
        </button>
        <GlassyDropdownMenu shadow id="{id}_ddmenu">
            <h6 class="px-3">Minimum Width</h6>
            <div class="d-flex flex-column flex-nowrap px-3 py-1 fs-6">
                <input
                    type="range"
                    class="form-range"
                    list="{id}_{col.key}_minwidth_dl"
                    id="{id}_{col.key}_minwidth"
                    min="3"
                    max="15"
                    step="0.1"
                    bind:value={col.minWidth}
                >
                <datalist id="{id}_{col.key}_minwidth_dl">
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                </datalist>
                <span class="ms-1 force-max-content font-monospace fw-bold text-center">
                    {typeof col.minWidth !== 'number' ? '(not set)' : `${col.minWidth.toFixed(1)} em`}
                </span>
            </div>
            <div class="dropdown-divider"></div>
            <h6 class="px-3">Alignment</h6>
            <FavMenuItem noMenuItem bind:pinPreference={col.pinnedFunctions.align}>
                <div class="btn-toolbar px-3 flex-fill align-self-center">
                    <div class="btn-group btn-group-sm me-1">
                        <input type="radio" name="{id}_{col.key}_alignment" bind:group={col.alignment} value='start' class="btn-check" id="{id}_{col.key}_align_left">
                        <label for="{id}_{col.key}_align_left" title="Align left" class="btn btn-outline-primary">
                            <i class="bi bi-text-left"></i>
                        </label>
                        <input type="radio" name="{id}_{col.key}_alignment" bind:group={col.alignment} value='center' class="btn-check" id="{id}_{col.key}_align_center">
                        <label for="{id}_{col.key}_align_center" title="Align center" class="btn btn-outline-primary">
                            <i class="bi bi-text-center"></i>
                        </label>
                        <input type="radio" name="{id}_{col.key}_alignment" bind:group={col.alignment} value='end' class="btn-check" id="{id}_{col.key}_align_right">
                        <label for="{id}_{col.key}_align_right" title="Align right" class="btn btn-outline-primary">
                            <i class="bi bi-text-right"></i>
                        </label>
                    </div>
                </div>
            </FavMenuItem>
            <div class="dropdown-divider"></div>
            <FavButtonMenuItem
                class={textWrap ? 'active' : undefined}
                bind:pinPreference={col.pinnedFunctions.textWrap}
                onClick={() => textWrap = !textWrap}
            >
                <i class="bi bi-text-wrap"></i>
                Text wrap
            </FavButtonMenuItem>
            <div class="dropdown-divider"></div>
            <FavButtonMenuItem bind:pinPreference={col.pinnedFunctions.hide} onClick={() => col.hidden = true}>
                <i class="bi bi-eye-slash me-2"></i>
                Hide column
            </FavButtonMenuItem>
            <FavButtonMenuItem bind:pinPreference={col.pinnedFunctions.pin} onClick={() => col.pinned = !col.pinned}>
                <i class="bi {pinIcon} me-2"></i>
                {col.pinned ? 'Unpin' : 'Pin'} column
            </FavButtonMenuItem>
        </GlassyDropdownMenu>
    </div>
    <div class="d-flex flex-row flex-nowrap ms-auto">
        {#if col.pinnedFunctions.align}
            <button
                type="button"
                class="btn btn-neutral btn-sm ms-auto"
                title="Click: Next alignment; Ctrl + Click: Previous alignment"
                aria-label="Column alignment"
                onclick={changeAlignment}
            >
                <i class="bi bi-{alignmentIcon}"></i>
            </button>
        {/if}
        {#if col.pinnedFunctions.textWrap}
            <input type="checkbox" class="btn-check" id="{id}_textwrap" bind:checked={textWrap}>
            <label for="{id}_textwrap" class="btn btn-neutral btn-sm">
                <i class="bi bi-text-wrap"></i>
            </label>
        {/if}
        {#if col.pinnedFunctions.hide}
            <button
                type="button"
                class="btn btn-sm btn-neutral"
                onclick={() => col.hidden = true}
                aria-label="{col.hidden ? 'Show' : 'Hide'} column"
            >
                <span title="Click to {col.hidden ? 'show' : 'hide'}">
                    <i class="bi bi-eye-slash"></i>
                </span>
            </button>
        {/if}
        {#if col.pinnedFunctions.pin}
            <button
                type="button"
                class="btn btn-sm btn-neutral"
                onclick={() => col.pinned = !col.pinned}
                aria-label="{col.pinned ? 'Unp' : 'P'}in column"
            >
                <span title="Click to {col.pinned ? 'un' : ''}pin">
                    <i class="bi {pinIcon}"></i>
                </span>
            </button>
        {/if}
    </div>
</div>

<style>
    .force-max-content {
        min-width: max-content;
    }
</style>
