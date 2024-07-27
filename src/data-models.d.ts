export type Person = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: 'Male' | 'Female';
    ip_address: string;
    birth_date: Date;
    country_code: string;
    credit_score: number;
    net_worth: number;
};

export type GeoSale = {
    id: number;
    country_code: string;
    country_name: string;
    city: string;
    month: number;
    year: number;
    sales_amount: number;
    product_category: string;
    quantity_sold: number;
    total_sales: number;
    total_costs: number;
    top_client: string;
    top_client_fraction: number;
};

export type GeoSaleQuantities = {
    sales_amount: number;
    quantity_sold: number;
    total_sales: number;
    total_costs: number;
};

export type GeoSaleByCountry = GeoSaleQuantities & {
    country_code: string;
    country_name: string;
}

export type GeoSaleByCity = GeoSaleByCountry & {
    city: string;
};

export type GeoSalesResult = {
    detail: GeoSale[];
    byCountry: GeoSaleByCountry[];
    byCity: GeoSaleByCity[];
};

export type GeoSaleColumn = {
    dataType?: 'string' | 'currency' | 'real-amount' | 'int-amount';
    numberFormatter?: Intl.NumberFormat;
};
