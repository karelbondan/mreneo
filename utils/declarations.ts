import { DaftarPesanan, DataPengeluaran, DataPesanan, MakananData } from "@/types/common";
import { LoginDataInput } from "@/types/input";

export const dataMakananInit: MakananData = {
    _id: "",
    identifier: "",
    nama_makanan: "Pilih makanan",
    harga: 0,
}

export const dataPesananInit: DataPesanan = {
    id: "",
    nama_makanan: "",
    harga: 0,
    jumlah: 0,
}

export const daftarPesananInit: DaftarPesanan = {
    id: "",
    added_by: "",
    added_date: "",
    modified_by: "",
    modified_date: "",
    pesanan: [] as DataPesanan[],
    total_harga: 0,
    metode_pembayaran: "Cash",
}

export const dataBarangInit: DataPengeluaran = {
    nama_barang: "",
    harga: "",
    jumlah: 1,
    keterangan: ""
}

export const dataLoginInit: LoginDataInput = {
    username: "",
    password: ""
}