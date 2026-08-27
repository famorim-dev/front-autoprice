export function isNumeric(value: unknown) {
    if (typeof value === "number") {
        return Number.isFinite(value)
    }

    if (typeof value !== "string" || !value.trim()) {
        return false
    }

    return Number.isFinite(
        Number(value.trim().replace(/\./g, "").replace(",", "."))
    )
}

export function isNumericColumn(rows: any[], column: string) {
    const values = rows
        .map(row => row[column])
        .filter(value => value !== null && value !== undefined && value !== "")

    return values.length > 0 && values.every(isNumeric)
}