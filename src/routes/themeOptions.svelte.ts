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
};

export const skyTheme: Theme = {
    table: {
        backgroundColor: 'var(--wjdv-sky-bg-rgb)',
        color: 'var(--wjdv-sky-color)',
    }
};

export const mineralGreenTheme: Theme = {
    table: {
        backgroundColor: '12, 50, 12',
        color: 'lightyellow'
    },
    pinnedColumnsDivider: {
        color: '#107710',
        style: 'dashed',
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
    'Mineral Green': mineralGreenTheme
};
