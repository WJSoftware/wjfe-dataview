import { defineData } from "$lib/WjDataView/WjDataView.svelte";
import type { LoadEvent } from "@sveltejs/kit";
import type { Person } from "../data-models.js";
import { demoOptions } from "../demolib/demoOptions.svelte.js";

export async function load(ev: LoadEvent): Promise<{ total: number; data: Person[] }> {
    const numRecords = +(ev.url.searchParams.get('records') ?? '200');
    console.log('Loading page data for records = %d...', numRecords);
    demoOptions.records = numRecords;
    const response = await ev.fetch(`https://my.api.mockaroo.com/people.json?key=a53dac10&records=${numRecords}`);
    const x = await response.json() as Person[];
    return { total: numRecords, data: defineData(x) };
};
