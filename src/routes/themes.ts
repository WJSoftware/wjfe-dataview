import { stockLight, stockDark, type Theme } from "$lib/stockTheme.js";

export const bootstrapTheme: Theme = {
    ...stockLight,
    table: {
        ...stockLight.table,
        backgroundColor: 'var(--bs-body-bg-rgb)'
    },
    stripes: {
        ...stockLight.stripes,
        backgroundColor: 'var(--bs-emphasis-color-rgb)'
    },
    rowHighlight: {
        ...stockLight.rowHighlight,
        backgroundColor: 'var(--bs-primary-rgb)',
        opacity: 0.2
    },
    resizer: {
        ...stockLight.resizer
    }
};

export const dark: Theme = {
    ...stockLight,
    table: {
        ...stockLight.table,
        backgroundColor: 'var(--bs-body-bg-rgb)'
    }
};

export const mineralBlue: Theme = {
    ...dark,
    table: {
        ...dark.table,
        backgroundColor: '25, 25, 90'
    }
};

export const mineralGreen: Theme = {
    ...dark,
    table: {
        ...dark.table,
        backgroundColor: '12, 30, 12'
    },
    pinnedColumnsDivider: {
        ...dark.pinnedColumnsDivider,
        color: '#107710',
        style: 'dashed',
        width: '0.3em'
    }
};
