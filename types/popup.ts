import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { DataPesanan } from "./common";

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