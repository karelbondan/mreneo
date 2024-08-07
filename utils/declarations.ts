import { DaftarPesanan, DataPesanan, MakananData } from "@/types/common";

export const dataMakananInit: MakananData = {
    _id: "",
    identifier: "",
    nama_makanan: "",
    harga: 0,
}

export const dataPesananInit: DataPesanan = {
    id_makanan: "",
    identifier: "",
    nama_makanan: "",
    harga: 0,
    jumlah: 0,
}

export const daftarPesananInit: DaftarPesanan = {
    date: "",
    pesanan: [] as DataPesanan[],
    total_harga: 0,
    metode_pembayaran: "Cash",
}