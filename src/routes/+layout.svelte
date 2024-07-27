<script lang="ts">
    import { base } from "$app/paths";
    import type { Snippet } from "svelte";
    import "../app.scss";
    import ThemeSwitch from "./ThemeSwitch.svelte";

    let { children }: {
        children: Snippet
    } = $props();
</script>

<div class="d-flex flex-column doc-container">
    <nav class="navbar navbar-expand-md bg-primary-subtle px-3">
        <span class="navbar-brand">WjDataView Demo</span>
        <div class="navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href={base} class="nav-link">Overview (Home)</a>
                </li>
                <li class="nav-item">
                    <a href="{base}/sales" class="nav-link">Data Drilldown Demo</a>
                </li>
            </ul>
        </div>
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
        <div class="container-fluid overflow-auto h-100 theme-def d-flex flex-column">
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

    .theme-def {
        --wjdv-sky-bg-rgb: 200, 240, 250;
        --wjdv-sky-color: var(--bs-black);
        --bs-row-selection-bg-color-rgb: 221, 235, 255;
        
        :global([data-bs-theme="dark"]) & {
            --wjdv-sky-bg-rgb: 30, 90, 120;
            --wjdv-sky-color: var(--bs-white);
            --bs-row-selection-bg-color-rgb: 21, 35, 55;
        }
    }
</style>