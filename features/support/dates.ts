/**
 * resolves a "today + N days" value from the feature file to that date in
 * CURA's dd/mm/yyyy format, any other value is returned as is
 */
export function resolveDate (value: string) {
    const match = value.match(/^today \+ (\d+) days?$/);
    if (!match) {
        return value;
    }
    const date = new Date();
    date.setDate(date.getDate() + Number(match[1]));
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}`;
}

/**
 * resolves every value of a data table row with resolveDate
 */
export function resolveDates (row: Record<string, string>) {
    return Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key, resolveDate(value)])
    );
}
