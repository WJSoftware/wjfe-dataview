<script lang="ts">
    import { base } from "$app/paths";
    import pkgJson from 'packagejson';
    import { onMount, type Snippet } from "svelte";
    import "../app.scss";
    import ThemeSwitch from "./ThemeSwitch.svelte";

    let { children }: {
        children: Snippet
    } = $props();

    onMount(() => {
        (globalThis as any).bootstrap.Dropdown.Default.popperConfig = { strategy: "fixed" };
    });
</script>

<div class="d-flex flex-column doc-container">
    <nav class="navbar navbar-expand-md bg-primary-subtle px-3">
        <span class="navbar-brand">WjDataView Demo</span>
        <button
            type="button"
            class="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#nbCollapsible"
            aria-controls="nbCollapsible"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="nbCollapsible">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href={base} class="nav-link">Overview (Home)</a>
                </li>
                <li class="nav-item">
                    <a href="{base}/sales" class="nav-link">Data Drilldown Demo</a>
                </li>
            </ul>
            <div class="d-flex flex-row flex-nowrap gap-1 ms-auto align-items-baseline">
                <a
                    href="https://github.com/WJSoftware/wjfe-dataview"
                    title="Repository"
                    class="nav-link"
                    target="_blank"
                    >
                    <i class="bi bi-github"></i>
                </a>
                <ThemeSwitch />
            </div>
        </div>
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
                <div class="col d-none d-lg-block">
                    WjDataView only works with Svelte v5 - <span class="fw-bold">EXPERIMENTAL</span>
                </div>
                <div class="col d-lg-none">
                    Svelve v5 <strong>only!</strong>
                </div>
                <div class="col-auto">
                    {pkgJson.name} <strong>v{pkgJson.version}</strong>
                </div>
                <div class="col-auto">
                    svelte <strong>v{(pkgJson.peerDependencies.svelte as string).substring(1)}</strong>
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