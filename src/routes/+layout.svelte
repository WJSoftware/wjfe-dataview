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
        <div class="container-fluid overflow-auto h-100">
            {@render children()}
        </div>
    </div>
    <footer class="footer text-center py-2 text-bg-warning">
        <div class="container">
            <div class="row">
                <div class="col-auto">
                    Made with:
                    <a
                        class="ms-1"
                        href="https://getbootstrap.com"
                        target="_blank"
                        title="Bootstrap"
                    >
                        <i class="bi bi-bootstrap"></i>
                    </a>
                    <a
                        class="ms-1"
                        href="https://svelte.dev"
                        target="_blank"
                        title="Svelte v5"
                    >
                        <img src="https://svelte.dev/favicon.png" alt="" class="footer-logo" />
                    </a>
                </div>
                <div class="col">
                    WjDataView only works with Svelte v5 - <span class="fw-bold">EXPERIMENTAL</span>
                </div>
            </div>
        </div>
    </footer>
</div>

<style lang="scss">
    :global(body) {
        margin: 0;
    }

    div.doc-container {
        height: 100vh;
    }

    footer {
        font-size: smaller;
    }

    .footer-logo {
        height: 1em;
    }
</style>