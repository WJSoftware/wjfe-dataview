<script lang="ts">
    import { fly } from "svelte/transition";

    let darkTheme = $state(false);
    let htmlEl = document.querySelector("html");

    $effect(() => htmlEl?.setAttribute("data-bs-theme", darkTheme ? "dark" : "light"));
</script>

<div class="form-check form-switch">
    <label>
        <input
            type="checkbox"
            class="form-check-input"
            role="switch"
            bind:checked={darkTheme}
        />
        <div class="animation">
            {#key darkTheme}
                <i
                    in:fly={{ duration: 600, y: 20 }}
                    out:fly={{ duration: 600, y: -20 }}
                    class="bi"
                    class:bi-brightness-high-fill={!darkTheme}
                    class:bi-moon-stars-fill={darkTheme}
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
