export function combineClasses(...classes: (string | Record<string, boolean> | null | undefined)[]) {
    const result: string[] = [];
    for (let c of classes) {
        if (!c) {
            continue;
        }
        if (typeof c === 'string') {
            const finalC = c.trim();
            if (!finalC) {
                continue;
            }
            result.push(finalC);
        }
        else {
            for (let k in c) {
                if (c[k]) {
                    result.push(k);
                }
            }
        }
    }
    return result.join(' ');
}

export function noop() { };
