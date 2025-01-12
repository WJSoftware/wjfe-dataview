import { CrossSynchronizer, crossVisualSync } from "$lib/cross-sync/CrossSynchronizer.svelte.js";
import type { GeoSale, GeoSaleByCity, GeoSaleByCountry, GeoSaleColumn } from "../../data-models.js";
import type { HeaderColumn } from "../../demolib/HeaderCell.svelte";
import { amountFormatterFactory, currencyFormatter, fractionFormatter } from "../../demolib/numberFormatters.js";

const syncrhonizer = new CrossSynchronizer();

const masterCols = $state(syncrhonizer.createProperty<HeaderColumn<GeoSaleByCountry, GeoSaleColumn>>([
    {
        key: 'country',
        text: 'Country',
        alignment: 'start',
        get: getCountry,
        pinnedFunctions: {},
    },
    {
        key: 'sales_amount',
        text: 'Total Amount',
        alignment: 'end',
        dataType: 'real-amount',
        numberFormatter: amountFormatterFactory(2),
        pinnedFunctions: {},
        width: 11,
    },
    {
        key: 'quantity_sold',
        text: 'Total Quantity',
        alignment: 'end',
        dataType: 'int-amount',
        numberFormatter: amountFormatterFactory(0),
        pinnedFunctions: {},
    },
    {
        key: 'total_sales',
        text: 'Total Sales',
        alignment: 'end',
        dataType: 'currency',
        numberFormatter: currencyFormatter,
        pinnedFunctions: {},
        width: 10,
    },
    {
        key: 'total_costs',
        text: 'Total Costs',
        alignment: 'end',
        dataType: 'currency',
        numberFormatter: currencyFormatter,
        pinnedFunctions: {},
    },
], ...crossVisualSync, 'pinnedFunctions'));

const byCityCols = $state(syncrhonizer.createProperty<HeaderColumn<GeoSaleByCountry, GeoSaleColumn>>([
    {
        key: 'city',
        text: 'City',
        alignment: 'start',
        dataType: 'string',
        pinnedFunctions: {},
    },
    {
        key: 'sales_amount',
        text: 'Total Amount',
        alignment: 'end',
        dataType: 'real-amount',
        numberFormatter: amountFormatterFactory(2),
        pinnedFunctions: {},
    },
    {
        key: 'quantity_sold',
        text: 'Total Quantity',
        alignment: 'end',
        dataType: 'int-amount',
        numberFormatter: amountFormatterFactory(0),
        pinnedFunctions: {},
    },
    {
        key: 'total_sales',
        text: 'Total Sales',
        alignment: 'end',
        dataType: 'currency',
        numberFormatter: currencyFormatter,
        pinnedFunctions: {},
    },
    {
        key: 'total_costs',
        text: 'Total Costs',
        alignment: 'end',
        dataType: 'currency',
        numberFormatter: currencyFormatter,
        pinnedFunctions: {},
    },
], ...crossVisualSync, 'pinnedFunctions'));

const detailedColumns = $state(syncrhonizer.createProperty<HeaderColumn<GeoSale, GeoSaleColumn>>([
    {
        key: 'id',
        text: 'ID',
        alignment: 'start',
        pinnedFunctions: {},
    },
    {
        key: 'country_code',
        text: 'Country Code',
        alignment: 'start',
        pinnedFunctions: {},
    },
    {
        key: 'country_name',
        text: 'Country',
        alignment: 'start',
        pinnedFunctions: {},
    },
    {
        key: 'city',
        text: 'City',
        alignment: 'start',
        pinnedFunctions: {},
    },
    {
        key: 'month',
        text: 'Month',
        alignment: 'start',
        pinnedFunctions: {},
    },
    {
        key: 'year',
        text: 'Year',
        alignment: 'start',
        pinnedFunctions: {},
    },
    {
        key: 'sales_amount',
        text: 'Sales Amount',
        dataType: 'real-amount',
        numberFormatter: amountFormatterFactory(2),
        alignment: 'end',
        pinnedFunctions: {},
    },
    {
        key: 'product_category',
        text: 'Product Category',
        width: 12,
        alignment: 'start',
        pinnedFunctions: {},
    },
    {
        key: 'quantity_sold',
        text: 'Quantity Sold',
        dataType: 'int-amount',
        numberFormatter: amountFormatterFactory(0),
        alignment: 'end',
        pinnedFunctions: {},
    },
    {
        key: 'total_sales',
        text: 'Total Sales',
        dataType: 'currency',
        numberFormatter: currencyFormatter,
        alignment: 'end',
        pinnedFunctions: {},
    },
    {
        key: 'total_costs',
        text: 'Total Costs',
        dataType: 'currency',
        numberFormatter: currencyFormatter,
        alignment: 'end',
        pinnedFunctions: {},
    },
    {
        key: 'top_client',
        text: 'Top Client',
        alignment: 'start',
        pinnedFunctions: {},
    },
    {
        key: 'top_client_fraction',
        text: 'Top Client Fraction',
        width: 13,
        dataType: 'real-amount',
        numberFormatter: fractionFormatter,
        alignment: 'center',
        pinnedFunctions: {},
    },
], ...crossVisualSync, 'pinnedFunctions'));

export const salesColumns = {
    master: masterCols,
    byCity: byCityCols,
    detailed: detailedColumns,
};

syncrhonizer.syncColumns(masterCols[1], byCityCols[1]);
syncrhonizer.syncColumns(masterCols[3], byCityCols[3]);
syncrhonizer.syncColumns(masterCols[1], detailedColumns[6]);
syncrhonizer.syncColumns(masterCols[3], detailedColumns[9]);
syncrhonizer.syncColumns(byCityCols[0], detailedColumns[3]);

function getCountry(record: { country_code: string; country_name: string; }) {
    return `${record['country_name']} (${record['country_code']})`;
}
