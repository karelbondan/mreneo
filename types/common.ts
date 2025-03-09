import { PropsWithChildren } from "react";

export interface ProtectedProps extends PropsWithChildren {
    disable_auth?: boolean;
}

export type MakananData = {
    _id: string;
    identifier: string;
    nama_makanan: string;
    harga: number;
}

export type DataPesanan = {
    id_makanan: string;
    identifier: string;
    nama_makanan: string;
    harga: number;
    jumlah: number;
}

export type DaftarPesanan = {
    _id?: string;
    date: string;
    pesanan: DataPesanan[];
    total_harga: number;
    metode_pembayaran: string;
}

export type IsiPemasukanData = {
    nama_makanan: string;
    harga: number;
    jumlah: number;
}

export interface PemasukanData {
    [key: string]: IsiPemasukanData;
}

export type DataPengeluaran = {
    nama_barang: string;
    harga: number | '';
    jumlah: number;
    keterangan: string;
}