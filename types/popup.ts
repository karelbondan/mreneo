import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { DataPengeluaran, DataPesanan } from "./common";

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
    idx: number;
    put?: number;
    add?: DataPesanan;
    op: "add" | "put" | "del";
}

export type TambahMakananPopupProps = {
    onPositiveClick?: (value: any) => void;
    onNegativeClick?: () => void;
}

export type TambahBarangPopupProps = {
    onPositiveClick?: (value: DataPengeluaran) => void;
    onNegativeClick?: () => void;
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