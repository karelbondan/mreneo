import DropdownItems from "@/components/dropdown/items"
import { Dispatch, PropsWithChildren, SetStateAction } from "react"

export type DashboardData = {
    pengeluaran: number,
    pemasukan: number
    terjual: number
}

export type DataPesanan = {
    _id: string,
    id_makanan: string,
    identifier: string,
    nama_makanan: string,
    harga: number,
    jumlah: number
}

export type DaftarPesanan = {
    _id: string,
    date: string,
    pesanan: DataPesanan[],
    total_harga: number,
    metode_pembayaran: string
}

export type PesananCardProps = {
    data: DaftarPesanan
    pesanan_no: number
}

export type UbahPesananCardProps = {
    data: DataPesanan
    makanan_no: number
}

export type DropDownProps = {
    title: string,
    description?: string
    pilihan: string[]
}

export type DropDownItem = {
    onSelect: Dispatch<SetStateAction<string>>
    setVisible: Dispatch<SetStateAction<boolean>>
    identifier?: string
    value: string
}

export interface PopUpProps extends PropsWithChildren {
    title: string
    description?: string
    positiveButtonTitle: string
    negativeButtonTitle?: string
    onPositiveClick?: () => void
    onNegativeClick?: () => void
    dismissOnOptionClick?: boolean 
}

export type PopupHandle = {
    show: () => void
    hide: () => void
}