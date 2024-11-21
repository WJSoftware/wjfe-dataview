<div class="offcanvas offcanvas-end bg-info bg-glass" id="helpCanvas" data-bs-backdrop="false">
    <div class="offcanvas-header">
        <h3 class="offcanvas-title">WjDataView</h3>
    </div>
    <div class="offcanvas-body">
        <p>
            The data view component shows data in tabular format.
        </p>
        <p>
            The following is the list of features.  Some of these may not be evident if the browser's width is 
            enough to show all data at once, such as the pinnable columns.  To overcome this, either make the 
            browser window smaller, or resize some columns until the data goes off view.
        </p>
        <h4>List of Features</h4>
        <ul>
            <li>Scrollable viewport</li>
            <li>Striped rows</li>
            <li>Row tracking on mouse hover</li>
            <li>Row highlighting on selection</li>
            <li>Expansible rows</li>
            <li>Hideable columns</li>
            <li>Pinnable columns</li>
            <li>Resizable columns</li>
            <li>Column alignment</li>
            <li>Text wrap control</li>
            <li>Grid lines for columns and rows</li>
            <li>Customizable header content</li>
            <li>Customizable data cell content</li>
            <li>Customizable header cell appearance (the one that includes the resizer handle)</li>
            <li>Control column (an always-pinned special column for per-row controls/actions)</li>
            <li>Customizable appearance via CSS variables (theme component available)</li>
        </ul>
        <h4>Can it be used to edit data?</h4>
        <p>
            The short answer is <strong>Yes!</strong>  The cell contents are rendered by providing a custom 
            snippet named <span class="code">dataCell</span>.  However, note that <span class="code">WjDataView</span> 
            will not provide any form of keyboard navigation of any kind.
        </p>
        <p>
            Having said this, use <span class="code">dataCell</span> to provide cell content with controls such as 
            textboxes, checkboxes, radio buttons, selects, etc.
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