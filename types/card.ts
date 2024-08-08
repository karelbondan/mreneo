import { DaftarPesanan, DataPesanan } from "./common";

export type DashboardData = {
    pengeluaran: number;
    pemasukan: number;
    terjual: number;
}

export type PesananCardProps = {
    data: DaftarPesanan;
    pesanan_no: number;
}

export type UbahPesananCardProps = {
    data: DataPesanan;
    makanan_no: number;
    onHapusClick: () => void;
}