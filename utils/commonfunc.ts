export function formatHarga(stringHarga: number) {
    // split harga per 3 digit dari belakang
    return String(stringHarga).split(/(?=(?:...)*$)/).join(".")
}