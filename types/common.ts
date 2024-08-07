import DropdownItems from "@/components/dropdown/items"
import { Dispatch, LegacyRef, PropsWithChildren, SetStateAction } from "react"

export type DashboardData = {
    pengeluaran: number;
    pemasukan: number;
    terjual: number;
}

export type DataPesanan = {
    _id: string;
    id_makanan: string;
    identifier: string;
    nama_makanan: string;
    harga: number;
    jumlah: number;
}

export type DaftarPesanan = {
    _id: string;
    date: string;
    pesanan: DataPesanan[];
    total_harga: number;
    metode_pembayaran: string;
}

export type PesananCardProps = {
    data: DaftarPesanan;
    pesanan_no: number;
}

export type UbahPesananCardProps = {
    data: DataPesanan;
    makanan_no: number;
}

export type DropDownProps = {
    title: string;
    description?: string;
    pilihan: string[];
    onChange?: (value: any) => void
}

export type DropDownItem = {
    onSelect: Dispatch<SetStateAction<string>>;
    setVisible: Dispatch<SetStateAction<boolean>>;
    identifier?: string;
    value: string;
}

export interface PopUpProps extends PropsWithChildren {
    title: string;
    description?: string;
    positiveButtonTitle: string;
    negativeButtonTitle?: string;
    onPositiveClick?: () => void;
    onNegativeClick?: () => void;
    positiveButtonColor?: string;
    negativeButtonColor?: string;
    dismissOnOptionClick?: boolean;
}

export type PopupHandle = {
    show: () => void;
    hide: () => void;
}

export interface setPesanan {
    index: number,
    data?: DataPesanan,
    action: "update" | "delete"
}

export type TambahMakananPopupProps = {
    setPesanan: ({ index, data, action }: setPesanan) => void;
    onPositiveClick?: () => void;
    onNegativeClick?: () => void;
}

export type GenericPopupProps = {
    onPositiveClick?: () => void;
    onNegativeClick?: () => void;
}

export type SpinnerInputProps = {
    onChange?: () => void;
    jumlah: number;
    setJumlah: Dispatch<SetStateAction<number>>;
    className?: string;
    spinnerClassName?: string;
}

// export type SimpanPerubahanPopupProps = {
//     onPositiveClick?: () => void;
//     onNegativeClick?: () => void;
// }

// export type HapusPesananPopupProps = {
//     onPositiveClick?: () => void;
//     onNegativeClick?: () => void;
// }

// export type BatalUbahPopupProps = {
//     onPositiveClick?: () => void;
//     onNegativeClick?: () => void;
// }