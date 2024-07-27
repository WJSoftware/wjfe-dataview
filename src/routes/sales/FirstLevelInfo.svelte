<div class="offcanvas offcanvas-end bg-info bg-glass" id="firstLevelCanvas" data-bs-backdrop="false">
    <div class="offcanvas-header">
        <h3 class="offcanvas-title">Worldwide Sales Rollup Demo</h3>
    </div>
    <div class="offcanvas-body">
        <p>
            This table shows the rolled-up summary of (ficticious) sales data.  The record feed is random and courtesy 
            of <a href="https://www.mockaroo.com" target="_blank">Mockaroo</a>.  The original records can be seen at 
            the third level.
        </p>
        <p>
            The toolbar above the table can be used to turn <span class="code">WjDataView</span>'s features on and 
            off.  As data is drilled down, more toolbars will appear for the additional 
            <span class="code">WjDataView</span> components that show the more detailed data.
        </p>
        <h4>Drilldown Features</h4>
        <p>
            Currently there is one significant feature that effects how users experience data drilldown using 
            <span class="code">WjDataView</span>:  The <span class="code">noViewport</span> property.
        </p>
        <p>
            Instances of <span class="code">WjDataView</span> provide their own viewport.  The viewport is the 
            container in charge of providing horizontal and vertical scrollbars to the component so all data can be 
            examined.  Furthermore, the header row is configured to be sticky.  This means that the header row will 
            "stick" to the viewport when said viewport is scrolled vertically.
        </p>
        <p>
            But what happens when the viewport disappears?  The header row will now stick to the next available 
            viewport, and that's the viewport of the parent <span class="code">WjDataView</span> component.  The net 
            result is that the header row of child <span class="code">WjDataView</span> components are now in the 
            position of overlapping the parent's header row.
        </p>
        <h5>How To Experience the effect of <span class="code">noViewport</span>?</h5>
        <p>
            Simply expand a row or rows until the vertical scrollbar has enough room to make the the header row of a 
            child <span class="code">WjDataView</span> component reach the top of the parent's viewport.
        </p>
        <p>
            In order to experience the difference, the "no viewport" setting can be turned off by using the top 
            toolbar.  The option is the button with the <i class="bi bi-eye-slash"></i> icon.
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