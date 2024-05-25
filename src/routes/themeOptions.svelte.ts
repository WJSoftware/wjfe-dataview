import { stockLight, stockDark, type Theme } from "$lib/stockTheme.js";

export const bootstrapTheme: Theme = {
    table: {
        backgroundColor: 'var(--bs-body-bg-rgb)'
    },
    stripes: {
        backgroundColor: 'var(--bs-emphasis-color-rgb)'
    },
    rowHighlight: {
        backgroundColor: 'var(--bs-primary-rgb)',
        opacity: 0.2
    },
    rowSelection: {
        backgroundColor: 'var(--bs-row-selection-bg-color-rgb)',
    }
};

export const skyTheme: Theme = {
    table: {
        backgroundColor: 'var(--wjdv-sky-bg-rgb)',
        color: 'var(--wjdv-sky-color)',
    }
};

export const themeOptions = $state({ darkTheme: false, currentTheme: bootstrapTheme });

const stockTheme = $derived(themeOptions.darkTheme ? stockDark : stockLight);

export function getStockTheme() {
    return stockTheme;
}

export const allThemes: Record<string, Theme> = {
    'Bootstrap': bootstrapTheme,
    'Sky': skyTheme,
};
