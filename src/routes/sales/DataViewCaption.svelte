<script lang="ts">
    type Props = {
        title: string;
    };

    let {
        title,
    }: Props = $props();
</script>

<div class="title fw-bold px-2 py-1 rounded-start">
    {title}
</div>

<style lang="scss">
    .title {
        background: linear-gradient(to right, rgb(246, 121, 102), var(--bs-body-bg));
        :global([data-bs-theme="dark"]) & {
            background: linear-gradient(to right, rgb(102, 30, 2), var(--bs-body-bg));
        }
    }
</style>
