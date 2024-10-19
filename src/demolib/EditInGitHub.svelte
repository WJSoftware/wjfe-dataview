<script lang="ts">
    type Props = {
        editUrl: string;
    };

    let {
        editUrl,
    }: Props = $props();
</script>
<a
    class="position-absolute bottom-0 end-0 rounded-circle btn btn-sm btn-secondary mb-3 me-3 semi-transparent"
    title="See an error?  Want to improve the demo?  Curious about the source code?  View/edit this page in GitHub."
    href={editUrl}
    target="_blank"
    aria-label="Edit this page in GitHub"
>
    <i class="bi bi-pencil"></i>
</a>

<style lang="scss">
    .semi-transparent {
        opacity: 0.4;
        &:hover {
            opacity: 1;
        }
    }
</style>
