<script module lang="ts">
    /**
     * All possible theme options.
     */
    export type ThemeOption = 'system' | 'light' | 'dark';

    /**
     * All possible effective theme options.
     * 
     * The `system` theme option does not really exist, and translates to either `dark` or `light`.
     */
    export type EffectiveThemeOption = Exclude<ThemeOption, 'system'>;
</script>

<script lang="ts">
    import { combineClasses } from "$lib/utils.js";
    import { fly } from "svelte/transition";

    type DetectedThemeOption = EffectiveThemeOption | null;

    type Props = {
        /**
         * Bindable.  Sets the desired theme option.
         */
        theme?: ThemeOption;
        /**
         * Sets the button's tooltip text.
         */
        title?: string;
        /**
         * Disables the theme switch button.
         */
        disabled?: boolean;
        /**
         * Sets the theme to use whenever the `system` theme option is in effect, but the component is unable to detect 
         * the user's preference.  If not specified, defaults to `light`.
         */
        fallbackTheme?: EffectiveThemeOption;
        /**
         * Sets additional CSS classes to the rendered button.
         */
        class?: string;
        /**
         * Triggers whenever the application's theme changes.  This doesn't necessarily happen on each change in the 
         * value of the `theme` prop, and the possible options are always either `dark` or `light`.
         * @param newTheme The new effective theme (`dark` or `light`).
         */
        onthemeChanged?: (newTheme: EffectiveThemeOption) => void;
    };

    let {
        theme = $bindable('system'),
        title,
        disabled = false,
        fallbackTheme = 'light',
        class: cssClass,
        onthemeChanged
    }: Props = $props();

    const options: ThemeOption[] = [
        'system',
        'light',
        'dark'
    ];
    let systemPreferenceHandlerCleaner: Function | undefined;
    let currentOption = options.findIndex(o => o === theme);
    let effectiveTheme = $state<EffectiveThemeOption>(theme === 'system' ? fallbackTheme : theme);

    $effect.pre(() => {
        let detectedTheme: DetectedThemeOption;
        if (theme === 'system') {
            detectedTheme = detectPreference();
            effectiveTheme = detectedTheme === null ? fallbackTheme : detectedTheme;
            if (!systemPreferenceHandlerCleaner) {
                systemPreferenceHandlerCleaner = setSystemPreferenceListener(({matches: darkMode}) => {
                    effectiveTheme = darkMode ? 'dark' : 'light';
                });
            }
        }
        else {
            effectiveTheme = theme;
            systemPreferenceHandlerCleaner?.();
            systemPreferenceHandlerCleaner = undefined;
        }
    });

    $effect.pre(() => {
        if (effectiveTheme === 'dark') {
            globalThis.document?.documentElement.setAttribute('data-bs-theme', 'dark');
        }
        else {
            globalThis.document?.documentElement.removeAttribute('data-bs-theme');
        }
        onthemeChanged?.(effectiveTheme);
    });

    const iconName = $derived({
        'system': 'display',
        'dark': 'moon-stars-fill',
        'light': 'sun-fill'
    }[theme]);

    /**
     * Detects the system's theme preference.
     * @returns Either `light` or `dark` if it can detect the preference, or `null` if detection is impossible.
     */
    function detectPreference(): DetectedThemeOption {
        const wnd = globalThis?.window;
        if (!wnd) {
            // Unable to detect.
            return null;
        }
        return wnd.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    /**
     * Cycles through all possible theme options.
     */
    function nextThemeOption() {
        theme = options[currentOption = (currentOption + 1) % options.length];
    }

    /**
     * Establishes a listener on the color scheme preference to be notified whenever the system preference changes.
     * @param changeHandlerFn Handler function to execute upon the detected change.
     */
    function setSystemPreferenceListener(changeHandlerFn: (ev: MediaQueryListEvent) => void) {
        const query = globalThis?.window?.matchMedia('(prefers-color-scheme: dark)');
        query?.addEventListener('change', changeHandlerFn);
        return () => {
            query?.removeEventListener('change', changeHandlerFn);
        }
    }
</script>

<button
    class={combineClasses("btn", cssClass)}
    type="button"
    {title}
    {disabled}
    aria-disabled={disabled}
    onclick={() => nextThemeOption()}
>
    <div class="animation">
        {#key theme}
            <i
                in:fly={{ duration: 600, y: 20 }}
                out:fly={{ duration: 600, y: -20 }}
                class="bi bi-{iconName}"
            ></i>
        {/key}
    </div>
</button>

<style lang="scss">
    .animation {
        display: grid;
        & i {
            grid-area: 1/1/2/2;
        }
    }
</style>
