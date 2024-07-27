let nextId = 0;

export function nextControlId(prefix?: string) {
    return `${prefix ?? 'control'}${++nextId}`;
};
