<script lang="ts">
    import ColumnList, { type Column } from "./ColumnList.svelte";
    import GlassyDropdownMenu from "./GlassyDropdownMenu.svelte";

    type Props = {
        columns: Column[];
    };

    let {
        columns = $bindable(),
    }: Props = $props();

    let btn: HTMLButtonElement;

    function getDd() {
        return (globalThis as any).bootstrap.Dropdown.getInstance(btn);
    }
</script>
<div class="dropdown">
    <button
        class="btn btn-neutral btn-sm"
        type="button"
        data-bs-toggle="dropdown"
        title="Columns"
        aria-expanded="false"
        aria-label="Select visible columns"
        data-bs-auto-close="false"
        bind:this={btn}
    >
        <i class="bi bi-layout-sidebar-inset"></i>
    </button>
    <GlassyDropdownMenu shadow>
        <ColumnList bind:columns onClose={() => getDd().hide()} />
    </GlassyDropdownMenu>
</div>
