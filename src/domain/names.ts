type ValidationResult = 
    | { ok: true; names: string[] }
    | { ok: false; error: string };

export function processNames(inputNames: string): ValidationResult {
    if (inputNames.trim().length === 0) {
        return { ok: false, error: "no empty strings allowed" };
    }
    const rawNames = inputNames.split(",");
    const names: string[] = [];
    for (let name of rawNames) {
        const trimmed = name.trim();
        if (trimmed === "") {
            return { ok: false, error: "blank entries not allowed" };
        }
        const cleaned = trimmed.toLowerCase();
        names.push(cleaned);
    }
    if (new Set(names).size !== names.length) {
        return { ok: false, error: "duplicate names not allowed" };
    }
    if (names.length < 4) {
        return { ok: false, error: "minimum 4 names required" };
    }
    if (names.length > 7) {
        return { ok: false, error: "maximum 7 names allowed" };
    }
    return { ok: true, names };
}