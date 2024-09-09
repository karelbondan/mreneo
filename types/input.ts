import { Dispatch, SetStateAction } from "react";

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
    value: string;
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