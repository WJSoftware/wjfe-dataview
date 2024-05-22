<script lang="ts">
    import { fly } from "svelte/transition";
    import { themeOptions } from "./themeOptions.svelte.js";

    let htmlEl = globalThis?.document?.querySelector("html");

    $effect(() => htmlEl?.setAttribute("data-bs-theme", themeOptions.darkTheme ? "dark" : "light"));
</script>

<div class="form-check form-switch">
    <label>
        <input
            type="checkbox"
            class="form-check-input"
            role="switch"
            bind:checked={themeOptions.darkTheme}
        />
        <div class="animation">
            {#key themeOptions.darkTheme}
                <i
                    in:fly={{ duration: 600, y: 20 }}
                    out:fly={{ duration: 600, y: -20 }}
                    class="bi"
                    class:bi-brightness-high-fill={!themeOptions.darkTheme}
                    class:bi-moon-stars-fill={themeOptions.darkTheme}
                ></i>
            {/key}
        </div>
    </label>
</div>

<style lang="scss">
    .animation {
        display: grid;
        & i {
            grid-area: 1/1/2/2;
        }
    }
</style>
