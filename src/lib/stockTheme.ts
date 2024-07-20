/**
 * Defines the properties that make up an element's color.
 */
export type ElementColor = {
    /**
     * Defines the element's background color.
     */
    backgroundColor?: string;
    /**
     * Defines the element's background color's opacity.
     */
    opacity?: number;
    /**
     * Defines the elements foreground color.
     */
    color?: string;
};

/**
 * Defines the color properties for the different sections of the column resizer.
 */
export type ResizerColor = {
    /**
     * Defines the resizer's section's background color.
     */
    backgroundColor?: string;
    /**
     * Defines the resizer's section's border color.
     */
    borderColor?: string;
};

/**
 * Defines the properties that make up an element's border.
 */
export type BorderDefinition = {
    /**
     * Defines the border's width.
     */
    width?: string;
    /**
     * Defines the border's type.
     */
    style?: 'dashed' | 'dotted' | 'double' | 'groove' | 'inset' | 'outset' | 'ridge' | 'solid' | 'unset';
    /**
     * Defines the border's color.
     */
    color?: string;
};

/**
 * Defines the shape of theme objects for the WjDataView component.
 */
export type Theme = {
    /**
     * Defines the table's colors.
     */
    table?: ElementColor;
    /**
     * Defines the color used to stripe the table.
     */
    stripes?: ElementColor;
    /**
     * Defines the color used for the row tracking feature.
     */
    rowTracking?: ElementColor;
    /**
     * Defines the color used for rows that represent selected data.
     */
    rowSelection?: ElementColor;
    /**
     * Defines the special border that is drawn at the end of all pinned columns.
     */
    pinnedColumnsDivider?: BorderDefinition,
    /**
     * Defines the appearance of the column resizer.
     */
    resizer?: {
        /**
         * Defines the witdh of the resizer's handle.
         */
        width?: string;
        /**
         * Defines the appearance of the various overlays that make up the resizer component.
         */
        overlay?: {
            /**
             * Defines the opacity applied to the various overlays that make up the resizer component.
             */
            opacity?: number;
            /**
             * Defines the appearance of the item overlay.
             */
            item?: ResizerColor;
            /**
             * Defines the appearance of the positive overlay.
             * 
             * The positive overlay is the overlay that indicates the growth amount of a column's width.
             */
            positiveDelta?: ResizerColor;
            /**
             * Defines the appearance of the negative overlay.
             * 
             * The negative overlay is the overlay that indicates the reduction of a column's width.
             */
            negativeDelta?: ResizerColor;
        }
    };
    /**
     * Defines the appearance of the grid lines.
     */
    gridLines?: BorderDefinition;
};

/**
 * Stock light theme for the WjDataView component.
 */
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
    rowTracking: {
        backgroundColor: '0, 0, 0',
        opacity: 0.07,
        color: 'inherit'
    },
    rowSelection: {
        backgroundColor: '227, 240, 254',
        opacity: 1,
        color: 'inherit'
    },
    pinnedColumnsDivider: {
        width: '0.2em',
        style: 'solid',
        color: 'darkgray'
    },
    resizer: {
        width: '0.4em',
        overlay: {
            opacity: 0.7,
            item: {
                backgroundColor: 'lightblue',
                borderColor: 'blue'
            },
            positiveDelta: {
                backgroundColor: 'lightgreen',
                borderColor: 'green'
            },
            negativeDelta: {
                backgroundColor: 'pink',
                borderColor: 'red'
            }
        }
    },
    gridLines: {
        width: '0.01em',
        style: 'solid',
        color: 'currentColor'
    }
};

/**
 * Stock dark theme for the WjDataView component.
 */
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
    rowTracking: {
        backgroundColor: '255, 255, 255',
        opacity: 0.15,
        color: 'inherit'
    },
    rowSelection: {
        backgroundColor: '15, 25, 74',
        opacity: 1,
        color: 'inherit'
    },
    pinnedColumnsDivider: {
        width: '0.2em',
        style: 'solid',
        color: 'lightgray'
    },
    resizer: {
        width: '0.4em',
        overlay: {
            opacity: 0.7,
            item: {
                backgroundColor: '#0578ea',
                borderColor: '#13aeff'
            },
            positiveDelta: {
                backgroundColor: 'lightgreen',
                borderColor: 'green'
            },
            negativeDelta: {
                backgroundColor: 'pink',
                borderColor: 'red'
            }
        }
    },
    gridLines: {
        width: '0.01em',
        style: 'solid',
        color: 'currentColor'
    }
};
