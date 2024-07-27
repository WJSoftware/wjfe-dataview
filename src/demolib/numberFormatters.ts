import { browser } from "$app/environment";

export const currencyFormatter = new Intl.NumberFormat(browser ? navigator?.language : undefined, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol'
});

export function amountFormatterFactory(decimalPlaces: number) {
    return new Intl.NumberFormat(browser ? navigator?.language : undefined, {
        style: 'decimal',
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });
}

export const fractionFormatter = new Intl.NumberFormat(browser ? navigator?.language : undefined, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});
