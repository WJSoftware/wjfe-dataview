<div class="offcanvas offcanvas-end bg-info bg-glass" id="secondLevelCanvas" data-bs-backdrop="false">
    <div class="offcanvas-header">
        <h3 class="offcanvas-title">Worldwide Sales Rollup Demo</h3>
    </div>
    <div class="offcanvas-body">
        <p>
            This is a second-level <span class="code">WjDataView</span> component.  It shows the same information as 
            the first level, but rolled up to city, not country.
        </p>
        <p>
            Feel free to scroll up and down and turn table features on and off.  Do you have an idea or suggestion to 
            make things better?  Stop by the <a href="https://github.com/WJSoftware/wjfe-dataview/issues" target="_blank">
            project's issues page</a> and open a new issue.
        </p>
    </div>
</div>

<style lang="scss">
    .bg-glass {
        --bs-bg-opacity: 0.3;
        backdrop-filter: blur(7px) saturate(110%);
    }

    span.code {
        font-family: monospace;
        background-color: rgba(0, 0, 0, 0.2);
        padding: 0.2em 0.3em;
        border-radius: 0.2em;

        :global([data-bs-theme="dark"]) & {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }

    :global([data-bs-theme="dark"]) .offcanvas.bg-info {
        color: var(--bs-white);
    }
</style>