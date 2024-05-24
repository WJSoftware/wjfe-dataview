import type { LoadEvent } from "@sveltejs/kit";
import type { Person } from "../data-models.js";
import type { WjDvRow } from "$lib/WjDataView.svelte";

export async function load(ev: LoadEvent): Promise<{ total: number; data: WjDvRow<Person>[] }> {
    const numRecords = +(ev.url.searchParams.get('records') ?? '200');
    console.log('Loading page data for records = %d...', numRecords);
    const response = await ev.fetch(`https://my.api.mockaroo.com/people.json?key=a53dac10&records=${numRecords}`);
    const x = await response.json() as WjDvRow<Person>[];
    return { total: numRecords, data: x.map(m => ({ ...m, wjdv: {} })) };
};
