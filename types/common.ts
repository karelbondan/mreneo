import DropdownItems from "@/components/dropdown/items"
import { Dispatch, LegacyRef, PropsWithChildren, SetStateAction } from "react"

export type DashboardData = {
    pengeluaran: number;
    pemasukan: number;
    terjual: number;
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

export type PesananCardProps = {
    data: DaftarPesanan;
    pesanan_no: number;
}

export type UbahPesananCardProps = {
    data: DataPesanan;
    makanan_no: number;
    onHapusClick: () => void;
}

export type DropDownHandle = {
    reset: () => void;
}

export type DropDownProps = {
    title: string;
    description?: string;
    pilihan: any[];
    // should be the same size as 'pilihan' with the same
    // item order
    pilihanString: string[];
    defaultValue: string;
    onChange?: (value: any) => void
}

export type DropDownItem = {
    // onSelect: Dispatch<SetStateAction<string>>;
    onSelect: (selectedValue: any, selectedTitle: string) => void;
    setVisible: Dispatch<SetStateAction<boolean>>;
    identifier?: string;
    title: string;
    value: any
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
    visible: boolean;
}

export interface setPesanan {
    index: number,
    data?: DataPesanan,
    action: "update" | "delete"
}

export type TambahMakananPopupProps = {
    setPesanan?: ({ index, data, action }: setPesanan) => void;
    onPositiveClick?: (value: any) => void;
    onNegativeClick?: () => void;
    // onTambahKlik?: ({ value }: { value: DataPesanan }) => void
}

export type GenericPopupProps = {
    onPositiveClick?: () => void;
    onNegativeClick?: () => void;
}

export type MakananSudahAdaProps = {
    onPositiveClick?: () => void;
    onNegativeClick?: () => void;
    namaMakanan: string;
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