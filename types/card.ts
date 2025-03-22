import { PropsWithChildren } from "react";
import { DaftarPesanan, DataPesanan } from "./common";

export type DashboardData = {
    pengeluaran?: number;
    pemasukan?: number;
    terjual?: number;
    with_button?: boolean;
}

export type PesananCardProps = {
    data: DaftarPesanan;
    pesanan_no: number;
}

export type UbahPesananCardProps = {
    data: DataPesanan;
    makanan_no: number;
    onDeleteClick: () => void;
    onAmountChange?: (amount: number) => void;
}

export type DataHarianInteractiveProps = {
    className: string;
    onDateChanged?: (value: Date) => void;
}

export interface DateCardProps extends PropsWithChildren {
    date: Date;
    disable_auth?: boolean;
}