import { ComponentProps, Dispatch, PropsWithChildren, SetStateAction } from "react";

export type DropDownHandle = {
    reset: () => void;
}

export interface DropDownProps extends ComponentProps<"div">, PropsWithChildren {
    title: string;
    description?: string;
    pilihan: any[];
    // should be the same size as 'pilihan' with the same
    // item order
    pilihanString: string[];
    value: string;
    onChange?: (value: any) => void
}

export interface DropDownPropsUpdate extends ComponentProps<"div">, PropsWithChildren {
    title: string;
    descr?: string;
    value?: string;
    onValueChange?: (value: any) => void
}

export type DropDownItem = {
    // onSelect: Dispatch<SetStateAction<string>>;
    onSelect: (selectedValue: any, selectedTitle: string) => void;
    setVisible: Dispatch<SetStateAction<boolean>>;
    identifier?: string;
    title: string;
    value: any
}

export type SpinnerInputProps = {
    onChange?: (value: number) => void;
    jumlah: number;
    setJumlah?: Dispatch<SetStateAction<number>>;
    className?: string;
    spinnerClassName?: string;
    min?: number;
    max?: number;
    showTimes?: boolean
}

export type DatePickerProps = {
    onPositiveClick?: (tanggal: Date) => void;
    onNegativeClick?: () => void;
    selectedDate?: Date;
}

export type LoginDataInput = {
    username: string;
    password: string
}