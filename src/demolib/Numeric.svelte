<script lang="ts">
    import { browser } from "$app/environment";

    type Props = {
        formatter?: Intl.NumberFormat;
        value: number;
    };

    let {
        formatter = new Intl.NumberFormat(browser ? navigator?.language : undefined, { maximumFractionDigits: 4 }),
        value,
    }: Props = $props();
</script>

<span class="numeric">{formatter.format(value)}</span>

<style>
    span.numeric {
        font-family: monospace;
    }
</style>
