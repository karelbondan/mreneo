export function formatHarga(stringHarga: number) {
    // split harga per 3 digit dari belakang
    return String(stringHarga).split(/(?=(?:...)*$)/).join(".")
}

export function formatDate(stringDate: string) {
    // Tue Aug 13 2024 13:50:17 GMT+0700 (Western Indonesia Time)
    
}