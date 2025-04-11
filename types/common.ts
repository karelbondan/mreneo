import { ComponentProps, PropsWithChildren, ReactElement } from "react";

export interface BorderProps extends ComponentProps<"div"> { }

export interface ProtectedProps extends PropsWithChildren {
    disable_auth?: boolean;
}

export type MenuAttributes = {
    id: string;
    added_by: string;
    added_date: string;
    modified_by: string;
    modified_date: string;
    nama: string;
    deskripsi: string;
    harga: number;
    kategori: string;
    is_compliment: boolean;
    free_compliment: boolean;
}

export interface MenuSelectionAttributes extends MenuAttributes {
    title: string;
    item: ReactElement | string;
}

export type DataPesanan = {
    id: string;
    nama_makanan: string;
    harga: number;
    description: string;
    is_karyawan: boolean;
    is_served: boolean;
    parent: string;
    jumlah: number;
}

export type DaftarPesanan = {
    id: string;
    added_date: string;
    added_by: string;
    modified_by: string;
    modified_date: string;
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