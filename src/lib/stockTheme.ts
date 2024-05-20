export type ComponentColor = {
    backgroundColor?: string;
    opacity?: number;
    color?: string;
}

export type Theme = {
    table?: ComponentColor;
    stripes?: ComponentColor;
    rowHighlight?: ComponentColor;
    pinnedColumnsDivider?: {
        width?: string;
        style?: 'dashed' | 'dotted' | 'double' | 'groove' | 'inset' | 'outset' | 'ridge' | 'solid' | 'unset';
        color?: string;
    }
}

export const stockLight: Theme = {
    table: {
        backgroundColor: '255, 255, 255',
        opacity: 1,
        color: 'inherit'
    },
    stripes: {
        backgroundColor: '0, 0, 0',
        opacity: 0.04,
        color: 'inherit'
    },
    rowHighlight: {
        backgroundColor: '0, 0, 0',
        opacity: 0.07,
        color: 'inherit'
    },
    pinnedColumnsDivider: {
        width: '0.1em',
        style: 'solid',
        color: 'darkgray'
    }
};

export const stockDark: Theme = {
    table: {
        backgroundColor: '0, 0, 0',
        opacity: 1,
        color: 'inherit'
    },
    stripes: {
        backgroundColor: '255, 255, 255',
        opacity: 0.07,
        color: 'inherit'
    },
    rowHighlight: {
        backgroundColor: '255, 255, 255',
        opacity: 0.15,
        color: 'inherit'
    },
    pinnedColumnsDivider: {
        width: '0.1em',
        style: 'solid',
        color: 'lightgray'
    }
};
