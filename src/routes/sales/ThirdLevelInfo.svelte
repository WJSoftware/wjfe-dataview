<div class="offcanvas offcanvas-end bg-info bg-glass" id="thirdLevelCanvas" data-bs-backdrop="false">
    <div class="offcanvas-header">
        <h3 class="offcanvas-title">Worldwide Sales Rollup Demo</h3>
    </div>
    <div class="offcanvas-body">
        <p>
            This is the third and last level of data.  It shows the raw records obtained from the mocking service, 
            <a href="https://www.mockaroo.com" target="_blank">Mockaroo</a>.
        </p>
        <p>
            This demo queries for this raw data in Sveltekit's <span class="code">+page.ts</span> code file, and then 
            calculates the rollups.
        </p>
        <p>
            Would you like to experiment a bit?  Simply for the project, then run <span class="code">npm ci</span>, 
            and then run <span class="code">npm run dev</span>.  The sales demo page is at 
            <span class="code">/routes/sales</span>.  For example, you could try rolling the data up differently, say, 
            by customer or by product category.  You could also create an alternative data feed, either from real data 
            or faked data.
        </p>
        <p class="display-6 text-center mt-5">
            Don't forget to give the project a star on <a href="https://github.com/WJSoftware/wjfe-dataview" target="_blank">
            GitHub&nbsp;<i class="bi bi-github"></i></a>!
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