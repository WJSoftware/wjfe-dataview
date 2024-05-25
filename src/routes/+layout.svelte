<script lang="ts">
    import type { Snippet } from "svelte";
    import ThemeSwitch from "./ThemeSwitch.svelte";
    import "../app.scss";

    let { children }: {
        children: Snippet
    } = $props();
</script>

<div class="d-flex flex-column doc-container">
    <nav class="navbar bg-primary-subtle px-3">
        <span class="navbar-brand">WjDataView Demo</span>
        <a
            href="https://github.com/WJSoftware/wjfe-dataview"
            title="Repository"
            class="nav-link ms-auto me-3"
            target="_blank"
        >
            <i class="bi bi-github"></i>
        </a>
        <ThemeSwitch />
    </nav>
    <div class="flex-fill overflow-auto">
        <div class="container overflow-auto h-100">
            {@render children()}
        </div>
    </div>
    <footer class="footer text-center py-2 text-bg-warning">
        WjDataView only works with Svelte v5 - <span class="fw-bold">EXPERIMENTAL</span>
    </footer>
</div>

<style lang="scss">
    :global(body) {
        margin: 0;
    }

    div.doc-container {
        height: 100vh;
    }
</style>