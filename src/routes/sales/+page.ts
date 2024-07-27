import type { GeoSale, GeoSaleByCity, GeoSaleByCountry, GeoSalesResult } from '../../data-models.js';
import type { PageLoad } from './$types.js';

export const load = (async ({ fetch }) => {
    const url = 'https://my.api.mockaroo.com/geosales.json?key=a53dac10';
    const response = await fetch(url);
    const rawData = await response.json() as GeoSale[];
    return buildGeoSalesResult(rawData);
}) satisfies PageLoad<GeoSalesResult>;

function buildGeoSalesResult(sales: GeoSale[]): GeoSalesResult {
    const countryRecords: Record<string, GeoSaleByCountry> = {};
    const cityRecords: GeoSaleByCity[] = [];
    for (let sale of sales) {
        const countryRecord = countryRecords[sale.country_code] = countryRecords[sale.country_code] ?? ({
            country_name: sale.country_name,
            country_code: sale.country_code,
            quantity_sold: 0,
            sales_amount: 0,
            total_costs: 0,
            total_sales: 0
        });
        countryRecord.quantity_sold += sale.quantity_sold;
        countryRecord.sales_amount += sale.sales_amount;
        countryRecord.total_costs += sale.total_costs;
        countryRecord.total_sales += sale.total_sales;
        // By city.
        let byCityRecord = cityRecords.find(r => r.country_code === sale.country_code && r.city === sale.city);
        if (!byCityRecord) {
            byCityRecord = {
                country_code: sale.country_code,
                country_name: sale.country_name,
                city: sale.city,
                quantity_sold: 0,
                sales_amount: 0,
                total_costs: 0,
                total_sales: 0
            };
            cityRecords.push(byCityRecord);
        }
        byCityRecord.quantity_sold += sale.quantity_sold;
        byCityRecord.sales_amount += sale.sales_amount;
        byCityRecord.total_costs += sale.total_costs;
        byCityRecord.total_sales += sale.total_sales;
    }
    return {
        detail: sales,
        byCity: cityRecords,
        byCountry: Object.keys(countryRecords).map(k => countryRecords[k])
    };
}