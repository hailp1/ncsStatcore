
/**
 * Data Cleaning Utilities
 * Centralized logic to clean and standardize data upon import.
 */

/**
 * Standardize missing values and convert types
 * @param data Array of row objects
 * @returns Cleaned array of row objects
 */
export function cleanDataset(data: any[]): any[] {
    if (!data || data.length === 0) return [];

    const columns = Object.keys(data[0]);
    const cleanedData = [...data]; // Shallow copy to start

    // 1. Remove completely empty rows first
    const nonEmptyRows = cleanedData.filter(row => {
        return columns.some(col => {
            const val = row[col];
            return val !== null && val !== undefined && val !== '' && String(val).trim() !== '';
        });
    });

    // 2. Process each column
    const processedData = nonEmptyRows.map(row => ({ ...row })); // Deep copy for rows being modified

    columns.forEach(col => {
        const values = processedData.map(row => row[col]);
        const type = detectColumnType(values);

        if (type === 'numeric') {
            processedData.forEach(row => {
                row[col] = cleanNumericValue(row[col]);
            });
        } else {
            // Trim text values
            processedData.forEach(row => {
                const val = row[col];
                if (typeof val === 'string') {
                    row[col] = val.trim();
                }
            });
        }
    });

    return processedData;
}

/**
 * Simple column type detection
 */
function detectColumnType(values: any[]): 'numeric' | 'text' {
    const nonNullValues = values.filter(v => v !== null && v !== undefined && v !== '' && String(v).trim() !== '');
    if (nonNullValues.length === 0) return 'text'; // Default to text if empty

    // Check if majority are numeric
    const numericCount = nonNullValues.filter(v => {
        if (typeof v === 'number') return true;
        if (typeof v !== 'string') return false;

        // Check for clean number string
        const cleanStr = v.trim();
        if (cleanStr === '') return false;
        return !isNaN(Number(cleanStr));
    }).length;

    return (numericCount / nonNullValues.length) > 0.8 ? 'numeric' : 'text';
}

/**
 * Convert value to robust number or null
 */
function cleanNumericValue(val: any): number | null {
    if (val === null || val === undefined) return null;

    if (typeof val === 'number') {
        if (!isFinite(val)) return null; // Handle Inf
        return val;
    }

    if (typeof val === 'string') {
        const trimmed = val.trim().toLowerCase();
        if (trimmed === '' || trimmed === 'na' || trimmed === 'null' || trimmed === 'nan' || trimmed === '#na') {
            return null;
        }
        const num = Number(val);
        if (!isNaN(num) && isFinite(num)) {
            return num;
        }
    }

    return null;
}
